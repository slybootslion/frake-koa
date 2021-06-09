import Koa from 'koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import { config, error, json, Loader, success } from './pluto'

// 跨域
function applyCors (app) {
  app.use(cors())
}

// body
function applyBody (app) {
  // 参数解析 文件上传
  app.use(koaBody())
}

// 返回json扩展
function applyDefaultExtends (app) {
  json(app)
  success(app)
}

// loader 加载路由
function applyLoader (app) {
  const loader = new Loader(app)
  loader.initLoader()
}

// 静态服务器
function staticServe (app) {
  app.use(koaStatic(config.getItem('staticPath')))
}

const createApp = () => {
  const app = new Koa()
  app.use(error)
  applyBody(app)
  applyCors(app)
  applyDefaultExtends(app)
  applyLoader(app)
  staticServe(app)
  return app
}

module.exports = {
  createApp,
}
