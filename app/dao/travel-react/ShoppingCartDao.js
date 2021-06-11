import { NotFound } from '../../pluto'
import { randomInt, randomStr, readFile, writeFile } from '../../utils'
import { join } from 'path'
import { touristRoutes } from '../../db/travel-react/tourist'

class ShoppingCartDao {
  constructor () {
    this.filePath = join(__dirname, '../../db/travel-react/cart')
  }

  async getCartList ({ username }) {
    const { u } = _findUsersAndUserByEmail(username)
    const userId = u.id
    let { cartList, list } = findCartListByUserId(this.filePath, userId)
    list = this._checkCartListAndList(cartList, list, userId)
    return list
  }

  async add (username, touristRouteId) {
    const { u } = _findUsersAndUserByEmail(username)
    const userId = u.id
    let { cartList, list } = findCartListByUserId(this.filePath, userId)
    list = await this._checkCartListAndList(cartList, list, userId)
    const t = touristRoutes.find(t => t.id === touristRouteId)
    if (t) {
      const isIn = list.shoppingCartItems.find(lt => {
        return lt.id === +touristRouteId
      })
      if (!isIn) {
        list.shoppingCartItems.push({
          id: randomInt(5),
          touristRouteId: t.id,
          touristRoute: t,
          shoppingCartId: list.id,
          originalPrice: t.originalPrice,
          discountPresent: t.discountPresent,
        })
      }
    }
    await this._updateCartList(cartList, list)
    return list
  }

  async del (username, listId) {
    const { u } = _findUsersAndUserByEmail(username)
    const userId = u.id
    const { cartList, list } = findCartListByUserId(this.filePath, userId)
    const index = list.findIndex(t => t.id === listId)
    list.splice(index, 1)
    await this._updateCartList(cartList, list)
    return true
  }

  async delAll (username) {
    const { u } = _findUsersAndUserByEmail(username)
    const userId = u.id
    const { cartList, list } = findCartListByUserId(this.filePath, userId)
    list.shoppingCartItems = []
    await this._updateCartList(cartList, list)
    return true
  }

  async checkout (username) {
    const { u } = _findUsersAndUserByEmail(username)
    const userId = u.id
    const { cartList, list } = findCartListByUserId(this.filePath, userId)
    const data = {
      id: randomStr(10),
      userId,
      orderItems: list.shoppingCartItems,
      state: 'Pending',
      createDateUTC: new Date().getTime(),
      transactionMetadata: null,
    }
    list.shoppingCartItems = []
    await this._updateCartList(cartList, list)
    const orderPath = join(__dirname, '../../db/travel-react/order')
    let order = readFile(orderPath)
    if (!order) order = []
    order.push(data)
    writeFile(orderPath, order)
    return data
  }

  async _updateCartList (cartList, list) {
    const index = cartList.findIndex(c => c.id === list.id)
    cartList.splice(index, 1, list)
    await writeFile(this.filePath, cartList)
  }

  async _checkCartListAndList (cartList, list, userId) {
    if (!cartList || !list) {
      if (!cartList) cartList = []
      list = {
        id: randomStr(10),
        userId,
        shoppingCartItems: [],
      }
      cartList.push(list)
      await writeFile(this.filePath, cartList)
    }
    return list
  }
}

function findCartListByUserId (filePath, userId) {
  const cartList = readFile(filePath)
  let list = null
  if (!cartList) return false
  else list = cartList.find(c => c.userId === userId)
  return { cartList, list }
}

function _findUsersAndUserByEmail (email) {
  const user = readFile(join(__dirname, '../../db/travel-react/auth'))
  const index = user.findIndex(u => u.email === email)
  const u = user[index]
  if (!u) throw new NotFound({ message: '用户名不存在' })
  return { user, u, index }
}

export default ShoppingCartDao
