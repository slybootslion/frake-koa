import KoaRouter from 'koa-router'
import { NoParamsValidator } from '../../validator'
import { getParamsByV } from '../../utils'
import TravelAuthDao from '../../dao/travel-react/AuthDao'
import { luCodeRequired } from '../../middleware/check-code'
import { loginRequired } from '../../middleware/check-anth'

const travelAuthApi = new KoaRouter({
  prefix: '/travel/auth',
})

travelAuthApi.post('/login', luCodeRequired, async ctx => {
  const v = await new NoParamsValidator().validate(ctx)
  const data = getParamsByV(v)
  const tad = new TravelAuthDao()
  const res = await tad.login(data)
  ctx.json({ token: res.token })
})

travelAuthApi.post('/logout', loginRequired, async ctx => {
  const username = ctx.userInfo.username
  const tad = new TravelAuthDao()
  await tad.logout(username)
  ctx.success()
})

travelAuthApi.post('/register', luCodeRequired, async ctx => {
  const v = await new NoParamsValidator().validate(ctx)
  const { email, password, confirmPassword } = getParamsByV(v)
  const tad = new TravelAuthDao()
  await tad.register({ email, password, confirmPassword })
  ctx.success()
})

export default travelAuthApi
