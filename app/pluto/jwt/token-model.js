import { setRedisValue, getRedisValue, delRedisValue } from '../db/Redis'
import { config } from '../index'

class Token {
  static getRefreshToken (token) {
    return getRedisValue(token)
  }

  static getExpTokenUserInfo (refreshToken) {
    return getRedisValue(refreshToken)
  }

  static setRefreshToken ({ token, data }, refreshExp = config.getItem('refreshExp')) {
    const { userInfo, refreshToken } = data
    const refreshTokenExp = refreshExp
    const strUserInfo = userInfo
    setRedisValue(token, refreshToken, refreshTokenExp)
    setRedisValue(refreshToken, strUserInfo, refreshTokenExp)
  }

  static delOldRefreshToken ({ token, refreshToken }) {
    delRedisValue(token)
    delRedisValue(refreshToken)
  }
}

export {
  Token as TokenModelRedis,
}
