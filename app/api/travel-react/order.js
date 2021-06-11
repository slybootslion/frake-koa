import KoaRouter from 'koa-router'
import { loginRequired } from '../../middleware/check-anth'
import { NoParamsValidator } from '../../validator'
import { getParamsByV } from '../../utils'
import OrderDao from "../../dao/travel-react/OrderDao";

const orderApi = new KoaRouter({
  prefix: '/travel/orders',
})

orderApi.post('/:id/placeOrder', loginRequired, async ctx => {
  const v = await new NoParamsValidator().validate(ctx)
  const { id } = getParamsByV(v, 'path')
  const userInfo = ctx.userInfo
  const od = new OrderDao()
  const data = od.placeOrder(userInfo.username, id)
  ctx.json(data)
})

export default orderApi
