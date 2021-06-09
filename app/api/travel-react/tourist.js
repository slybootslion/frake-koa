import KoaRouter from 'koa-router'
import { luCodeRequired } from '../../middleware/check-code'
import TravelTouristDao from '../../dao/travel-react/TouristDao'
import { NoParamsValidator } from '../../validator'
import { getParamsByV } from '../../utils'

const travelTouristApi = new KoaRouter({
  prefix: '/travel',
})

travelTouristApi.get('/productCollections', luCodeRequired, async ctx => {
  const ttd = new TravelTouristDao()
  const data = await ttd.productCollections()
  ctx.json(data)
})

travelTouristApi.get('/touristRoutes/:id', luCodeRequired, async ctx => {
  const v = await new NoParamsValidator().validate(ctx)
  const { id } = getParamsByV(v, 'path')
  const ttd = new TravelTouristDao()
  const data = await ttd.touristRoutesById(id)
  ctx.json(data)
})

export default travelTouristApi
