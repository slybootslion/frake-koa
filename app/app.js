import jsonServer from 'json-server'
import { join } from 'path'

const initMiddlewares = app => {
  const middlewares = jsonServer.defaults()
  app.use(middlewares)
}

const initBodyParser = app => {
  app.use(jsonServer.bodyParser)
}

const initRouter = app => {
  const router = jsonServer.router(join(__dirname, './db/index.json'))
  router.render = (req, res) => {
    res.jsonp({
      message: 'ok',
      code: 0,
      data: res.locals.data,
    })
  }
  app.use(router)
}

const createApp = () => {
  const app = jsonServer.create()
  initMiddlewares(app)
  initBodyParser(app)
  initRouter(app)
  return app
}

export default createApp
