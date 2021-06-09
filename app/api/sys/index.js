import KoaRouter from 'koa-router'
import { LoginValidator } from '../../validator'
import { getParamsByV } from '../../utils'
import SysDao from '../../dao/sys/SysDao'

const userApi = new KoaRouter({
  prefix: '/sys',
})

userApi.post('/login', async ctx => {
  const v = await new LoginValidator().validate(ctx)
  const { username, password } = getParamsByV(v)
  const sd = new SysDao()
  const res = await sd.login({ username, password })
  ctx.success({ code: res })
})

export default userApi
