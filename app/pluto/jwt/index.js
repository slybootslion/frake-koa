import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken'
import md5 from 'md5'
import { TokenModelRedis } from './token-model'
import { ExpiredTokenException, InvalidTokenException } from '../error/http-exception'
import { config } from '../index'

/**
 * 令牌类，提供令牌的生成和解析功能
 *
 * ```js
 * const jwt = new Token(
 * config.getItem("secret"),
 * config.getItem("accessExp"),
 * config.getItem("refreshExp")
 * );
 * ```
 */
export class Token {
  /**
   * 构造函数
   * @param secret 牌的secret值
   * @param accessExp access token 过期时间
   * @param refreshExp refresh token 过期时间
   */
  constructor (secret, accessExp, refreshExp) {
    /**
     * access token 默认的过期时间
     */
    this.accessExp = 60 * 60 * 2 // 2h;
    /**
     * refresh token 默认的过期时间
     */
    this.refreshExp = 60 * 60 * 24 * 30 * 7 // 7day
    secret && (this.secret = secret)
    refreshExp && (this.refreshExp = refreshExp)
    accessExp && (this.accessExp = accessExp)
  }

  /**
   * 挂载到 ctx 上
   */
  initApp (app, secret, accessExp, refreshExp) {
    // 将 jwt 实例挂到 app 的 context 上
    app.context.jwt = this
    secret && (this.secret = secret)
    refreshExp && (this.refreshExp = refreshExp)
    accessExp && (this.accessExp = accessExp)
  }

  /**
   * 生成access_token
   * @param userInfo 用户信息
   */
  async createAccessToken (userInfo) {
    if (!this.secret) throw new Error('secret can not be empty')
    const token = await jsonwebtoken.sign({ userInfo }, this.secret, { expiresIn: this.accessExp })
    this._createRefreshToken(userInfo, token)
    return token
  }

  /**
   * verifyToken 验证token
   * 若过期，抛出ExpiredTokenException
   * 若失效，抛出InvalidTokenException
   *
   * @param token 令牌
   */
  async verifyToken (token) {
    if (!this.secret) {
      throw new Error('secret can not be empty')
    }
    // NotBeforeError
    // TokenExpiredError
    let userInfo
    try {
      userInfo = jsonwebtoken.verify(token, this.secret).userInfo
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        // token不合法
        if (error.name === 'JsonWebTokenError') throw new InvalidTokenException(10040)
        // token过期 进一步判断是否可以刷新令牌
        if (error.name === 'TokenExpiredError') {
          const res = await this._refreshTokenAllow(token)
          if (!res) throw new ExpiredTokenException(10050)
          else throw new ExpiredTokenException({ message: res })
        }

        throw new InvalidTokenException(10040)
      }
    }
    return userInfo
  }

  async _refreshTokenAllow (token) {
    const refreshToken = await this.getRefreshToken(token)
    if (refreshToken) {
      const userInfoStr = await TokenModelRedis.getExpTokenUserInfo(refreshToken)
      const userInfo = JSON.parse(userInfoStr)
      if (refreshToken && userInfo) {
        setTimeout(async () => {
          await this.delOldRefreshToken(token, refreshToken)
        }, 1000)
        return this.createAccessToken(userInfo)
      }
    }
  }

  async delOldRefreshToken (token, refreshToken) {
    if (refreshToken === md5(token)) {
      await TokenModelRedis.delOldRefreshToken({ token, refreshToken })
    }
  }

  async getRefreshToken (token) {
    const refreshToken = await TokenModelRedis.getRefreshToken(token)
    if (refreshToken) return refreshToken
    return false
  }

  _createRefreshToken (userInfo, token) {
    const refreshToken = md5(token)
    TokenModelRedis.setRefreshToken({
      token,
      data: { refreshToken, userInfo: JSON.stringify(userInfo) },
    }, this.refreshExp)
  }
}

/**
 * jwt实例
 * @type {Token}
 */
export const jwt = new Token(config.getItem('secret'), config.getItem('accessExp'), config.getItem('refreshExp'))

/*

/!**
 * 生成refresh token
 * @param payload 负载，支持 string 和 object
 * @param options 参数
 *!/
function createRefreshToken (payload, options) {
  let exp = Math.floor(Date.now() / 1000) + jwt.refreshExp
  // type: TokenType.REFRESH
  if (typeof payload === 'string') {
    return jsonwebtoken.sign({
      indentify: payload,
      type: utils_1.TokenType.REFRESH,
      exp: jwt.refreshExp,
    }, jwt.secret, options)
  } else {
    return jsonwebtoken.sign(Object.assign(Object.assign({}, payload), {
      type: utils_1.TokenType.REFRESH,
      exp: exp,
    }), jwt.secret, options)
  }
}

exports.createRefreshToken = createRefreshToken

/!**
 * 验证 access token
 * @param token 令牌
 * @param options 选项
 *!/
function verifyAccessToken (token, options) {
  let decode
  try {
    decode = jsonwebtoken.verify(token, jwt.secret, options)
  } catch (error) {
    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
      throw new exception_1.ExpiredTokenException({
        code: 10051,
      })
    } else {
      throw new exception_1.InvalidTokenException({
        code: 10041,
      })
    }
  }
  if (!decode['type'] || decode['type'] !== utils_1.TokenType.ACCESS) {
    throw new exception_1.InvalidTokenException()
  }
  return decode
}

exports.verifyAccessToken = verifyAccessToken

/!**
 * 验证 refresh token
 * @param token 令牌
 * @param options 选项
 *!/
function verifyRefreshToken (token, options) {
  let decode
  try {
    decode = jsonwebtoken.verify(token, jwt.secret, options)
  } catch (error) {
    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
      throw new exception_1.ExpiredTokenException({
        code: 10052,
      })
    } else {
      throw new exception_1.InvalidTokenException({
        code: 10042,
      })
    }
  }
  if (!decode['type'] || decode['type'] !== utils_1.TokenType.REFRESH) {
    throw new exception_1.InvalidTokenException()
  }
  return decode
}

exports.verifyRefreshToken = verifyRefreshToken

/!**
 * 颁发令牌
 * @param user 用户
 *!/
function getTokens (user) {
  const accessToken = jwt.createAccessToken(user.id)
  const refreshToken = jwt.createRefreshToken(user.id)
  return { accessToken, refreshToken }
}

exports.getTokens = getTokens

/!**
 * 解析请求头
 * @param ctx koa 的context
 * @param type 令牌的类型
 *!/
function parseHeader (ctx, type = utils_1.TokenType.ACCESS) {
  // 此处借鉴了koa-jwt
  if (!ctx.header || !ctx.header.authorization) {
    ctx.throw(new exception_1.AuthFailed({ code: 10013 }))
  }
  const parts = ctx.header.authorization.split(' ')
  if (parts.length === 2) {
    // Bearer 字段
    const scheme = parts[0]
    // token 字段
    const token = parts[1]
    if (/^Bearer$/i.test(scheme)) {
      // @ts-ignore
      const obj = ctx.jwt.verifyToken(token, type)
      if (!lodash.get(obj, 'type') || lodash.get(obj, 'type') !== type) {
        ctx.throw(new exception_1.AuthFailed({ code: 10250 }))
      }
      if (!lodash.get(obj, 'scope') || lodash.get(obj, 'scope') !== 'lin') {
        ctx.throw(new exception_1.AuthFailed({ code: 10251 }))
      }
      return obj
    }
  } else {
    ctx.throw(new exception_1.AuthFailed())
  }
}

exports.parseHeader = parseHeader */
