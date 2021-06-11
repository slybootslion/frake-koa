import KoaRouter from 'koa-router'
import { loginRequired } from '../../middleware/check-anth'
import ShoppingCartDao from '../../dao/travel-react/ShoppingCartDao'
import { NoParamsValidator } from '../../validator'
import { getParamsByV } from '../../utils'

const shoppingCart = new KoaRouter({
  prefix: '/travel/shoppingCart',
})

shoppingCart.get('/', loginRequired, async ctx => {
  const userInfo = ctx.userInfo
  const scd = new ShoppingCartDao()
  const cartList = await scd.getCartList(userInfo)
  ctx.json(cartList)
})

shoppingCart.post('/items', loginRequired, async ctx => {
  const v = await new NoParamsValidator().validate(ctx)
  const { touristRouteId } = getParamsByV(v)
  const userInfo = ctx.userInfo
  const scd = new ShoppingCartDao()
  const cartList = await scd.add(userInfo.username, touristRouteId)
  ctx.json(cartList)
})

shoppingCart.delete('/all', loginRequired, async ctx => {
  const userInfo = ctx.userInfo
  const scd = new ShoppingCartDao()
  await scd.delAll(userInfo.username)
  ctx.success()
})

shoppingCart.delete('/items/:id', loginRequired, async ctx => {
  const v = await new NoParamsValidator().validate(ctx)
  const { id } = getParamsByV(v, 'path')
  const userInfo = ctx.userInfo
  const scd = new ShoppingCartDao()
  await scd.del(userInfo.username, id)
  ctx.success()
})

shoppingCart.post('/checkout', loginRequired, async ctx => {
  const userInfo = ctx.userInfo
  const scd = new ShoppingCartDao()
  const data = await scd.checkout(userInfo.username)
  ctx.json(data)
})

export default shoppingCart
