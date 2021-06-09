import KoaRouter from 'koa-router'
import { luCodeRequired } from '../../middleware/check-code'
import TravelTouristDao from '../../dao/travel-react/TouristDao'

const travelTouristApi = new KoaRouter({
  prefix: '/travel',
})

travelTouristApi.get('/productCollections', luCodeRequired, async ctx => {
  const ttd = new TravelTouristDao()
  const data = await ttd.productCollections()
  ctx.json(data)
})

export default travelTouristApi
