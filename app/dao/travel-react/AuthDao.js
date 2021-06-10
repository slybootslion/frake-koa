import { join } from 'path'
import { randomStr, readFile, writeFile } from '../../utils'
import { AuthFailed, config, NotFound } from '../../pluto'
import jsonwebtoken from 'jsonwebtoken'

class TravelAuthDao {
  constructor () {
    this.dbPath = join(__dirname, '../../db/travel-react/auth')
  }

  async _findUsersAndUserByEmail (email) {
    const user = this.getData()
    const index = user.findIndex(u => u.email === email)
    const u = user[index]
    if (!u) throw new NotFound({ message: '用户名不存在' })
    return { user, u, index }
  }

  async _updateUserAndUByEmail (user, u) {
    const index = user.findIndex(item => item.email === u.email)
    user.splice(index, 1, u)
    this.setData(user)
  }

  async login ({ email, password }) {
    const { u, user } = await this._findUsersAndUserByEmail(email)
    if (u.password !== password) throw new AuthFailed({ message: '密码错误' })
    const secret = config.getItem('secret')
    u.token = await jsonwebtoken.sign({ username: u.email }, secret, { expiresIn: 60 * 60 })
    await this._updateUserAndUByEmail(user, u)
    return u
  }

  async logout (username) {
    const { u, user } = await this._findUsersAndUserByEmail(username)
    delete u.token
    await this._updateUserAndUByEmail(user, u)
    return true
  }

  register ({ email, password }) {
    let user = this.getData()
    if (!user) user = []
    const u = user.find(u => u.email === email)
    const id = randomStr(10)
    if (!u) {
      user.push({ id, email, password })
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
