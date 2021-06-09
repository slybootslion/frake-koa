import KoaRouter from 'koa-router'
import { NotFound } from '../../pluto'
import { luCodeRequired } from "../../middleware/check-code";

const testApi = new KoaRouter({
  prefix: '/test',
})

testApi.get('/', async ctx => {
  ctx.json({
    code: 0,
    message: 'test api',
  })
})

testApi.get('/json', async ctx => {
  ctx.json({
    code: 0,
    message: 'test json message',
  })
})

testApi.get('/success', async ctx => {
  ctx.success()
})

testApi.get('/error', async ctx => {
  throw new NotFound(10021)
})

testApi.post('/', async ctx => {
  ctx.success({ message: 'post requrest success' })
})

testApi.post('/check-code', luCodeRequired, async ctx => {
  ctx.success({ message: 'code check ok' })
})

export default testApi
