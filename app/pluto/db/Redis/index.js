import redis from 'redis'
import bluebird from 'bluebird'
import { config } from '../../index'

const host = config.getItem('redisConfig.host')
const port = config.getItem('redisConfig.port')

const options = {
  host,
  port,
  detect_buffers: true,
  retry_strategy: options => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('服务器拒绝连接')
    }
    if (options.total_retry_time > 1000 * 60) {
      return new Error('超过最大重试时间')
    }
    if (options.attempt > 10) {
      return undefined
    }
    return Math.min(options.attempt * 100, 3000)
  },
}

const client = bluebird.promisifyAll(redis.createClient(options))

client.on('error', err => console.log(`redis连接错误: ${err}`))

const setRedisValue = (key, value, time = '') => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return false
  }
  if (typeof value === 'string') {
    if (!time) {
      client.set(key, value)
    } else {
      client.set(key, value, 'EX', time)
    }
  } else if (typeof value === 'object') {
    // 如果是二维数组，或者多层的对象就得优化
    Object.keys(value).forEach(item => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}

const getRedisValue = key => {
  return client.getAsync(key)
}

const getHRedisValue = key => {
  return client.hgetallAsync(key)
}

const delRedisValue = key => {
  client.del(key, err => {
    if (err) {
      console.log(err)
      return false
    }
  })
}

export {
  client,
  setRedisValue,
  getRedisValue,
  getHRedisValue,
  delRedisValue,
}
