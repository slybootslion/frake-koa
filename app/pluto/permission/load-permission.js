import { config } from '../index'
import Utils from '../utils'
// import { SysPermissionModel } from '../../model/MySQL'

class LoadPermission {
  constructor () {
    this.queue = []
    this.list = []
  }

  loadPermissionList () {
    const permissionPath = config.getItem('permissionDir')
    const files = Utils.getFiles(permissionPath)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const extension = file.substring(file.lastIndexOf('.'), file.length)
      if (extension === '.js') {
        const model = require(file)
        if (model instanceof LoadPermission) {
          const list = model.getList()
          this.queue.concat(list)
        } else {
          for (const key of Object.keys(model)) {
            if (model[key] instanceof LoadPermission) {
              const list = model[key].getList()
              this.queue = this.queue.concat(list)
            }
          }
        }
      }
    }
  }

  addList (list) {
    this.list = list
  }

  getList () {
    return this.list
  }

  async setRouterPermission (model) {
    const queue = this.queue
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const item = queue[i]
      const pm = await model.findOne({
        where: {
          name: item.name,
          url: item.url,
          method: item.method,
          module: item.module,
        },
      })
      if (pm) continue
      await model.create(item)
    }
  }

  // async upload (list) {
  //   for (let i = 0; i < list.length; i++) {
  //     const item = list[i]
  //     const pm = await SysPermissionModel.findOne({
  //       where: {
  //         name: item.name,
  //         url: item.url,
  //         method: item.method,
  //         module: item.module,
  //       },
  //     })
  //     if (pm) continue
  //     console.log(pm)
  //     await SysPermissionModel.create(item)
  //   }
  // }
}

export default LoadPermission
