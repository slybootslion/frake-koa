import { join } from 'path'
import { readFile, writeFile } from '../../utils'

class TravelAuthDao {
  constructor () {
    this.dbPath = join(__dirname, '../../db/travel-react/auth')
  }

  register ({ email, password }) {
    let user = this.getData()
    if (!user) user = []
    const u = user.find(u => u.email === email)
    if (!u) {
      user.push({ email, password })
      this.setData(user)
    }
    return u
  }

  getData () {
    return readFile(this.dbPath)
  }

  setData (data) {
    writeFile(this.dbPath, data)
  }
}

export default TravelAuthDao
