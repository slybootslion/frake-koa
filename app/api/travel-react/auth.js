import KoaRouter from 'koa-router'
import { NoParamsValidator } from '../../validator'
import { getParamsByV } from "../../utils";
import TravelAuthDao from "../../dao/travel-react/AuthDao";

const travelAuthApi = new KoaRouter({
  prefix: '/travel/auth',
})

travelAuthApi.post('/login', async ctx => {
  const v = await new NoParamsValidator().validate(ctx)
  const data = getParamsByV(v)
  ctx.json(data)
})

travelAuthApi.post('/register', async ctx => {
  const v = await new NoParamsValidator().validate(ctx)
  const { email, password, confirmPassword } = getParamsByV(v)
  const tad = new TravelAuthDao()
  const data = await tad.register({email, password, confirmPassword})
  ctx.json({ email, password, confirmPassword })
})

export default travelAuthApi
