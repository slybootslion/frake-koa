import KoaRouter from 'koa-router'
import Config from './config'
import Utils from './utils'

const config = new Config()

class Loader {
  constructor (app) {
    this.app = app
    this.loadMainApi(app)
  }

  /**
   * 初始化
   * 挂载 loader 和 插件
   */
  initLoader () {
    this.app.context.loader = this
  }

  /**
   * 加载主应用中的所有路由
   */
  loadMainApi (app) {
    const mainRouter = new KoaRouter()
    this.mainRouter = mainRouter
    // 默认api的文件夹
    let apiDir = config.getItem('apiDir', 'app/api')
    // apiDir = `${baseDir}/${apiDir}`
    const files = Utils.getFiles(apiDir)
    for (const file of files) {
      const extension = file.substring(file.lastIndexOf('.'), file.length)
      if (extension === '.js') {
        const mod = require(file)
        // 如果mod 为 koa-router实例
        // 如果disableLoading为true，则不加载这个文件路由
        if (mod instanceof KoaRouter) {
          mainRouter.use(mod.routes()).use(mod.allowedMethods())
        } else {
          Object.keys(mod).forEach(key => {
            if (mod[key] instanceof KoaRouter) {
              const r = mod[key]
              mainRouter.use(r.routes()).use(r.allowedMethods())
            }
          })
        }
      }
    }
    app.use(mainRouter.routes()).use(mainRouter.allowedMethods())
  }
}

export default Loader
