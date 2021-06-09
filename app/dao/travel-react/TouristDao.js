import { d1, d2 } from '../../db/travel-react/tourist'

class TravelTouristDao {
  async productCollections () {
    return d1
  }

  async touristRoutesById (id) {
    return d2.map(c => {
      c.id = `id: ${id}`
      return c
    })
  }
}

export default TravelTouristDao
