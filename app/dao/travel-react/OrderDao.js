import { join } from 'path'
import { readFile, writeFile } from '../../utils'

class OrderDao {
  constructor () {
    this.path = join(__dirname, '../../db/travel-react/order')
  }

  placeOrder (username, id) {
    const orders = readFile(this.path)
    const index = orders.findIndex(o => o.id === id)
    const resOrder = {...orders[index]}
    resOrder.state = 'Completed'
    resOrder.transactionMetadata = 'ok'
    orders.splice(index, 1)
    writeFile(this.path, orders)
    return resOrder
  }
}

export default OrderDao
