import { NotFound } from '../pluto'

export async function loginRequired (ctx, next) {
  if (ctx.request.method !== 'OPTIONS') {
    await mountUser(ctx)
    await next()
  } else {
    await next()
  }
}

export async function checkUserInfo (ctx, next) {
  if (ctx.request.method !== 'OPTIONS') {
    const token = getTokenHeader(ctx)
    if (!token) {
      ctx.userInfo = null
    } else {
      ctx.userInfo = await ctx.jwt.verifyToken(token)
    }
    await next()
  } else {
    await next()
  }
}

async function mountUser (ctx) {
  const token = getTokenHeader(ctx)
  const userInfo = await ctx.jwt.verifyToken(token)
  if (!userInfo) throw new NotFound({ code: 30002 })
  ctx.userInfo = userInfo
}

export function getTokenHeader (ctx) {
  return ctx.header.authorization && ctx.header.authorization.split(' ')[1]
}
