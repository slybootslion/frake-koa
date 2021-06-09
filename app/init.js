import { config } from './pluto'
import { createApp } from './app'

(() => {
  const app = createApp()
  const port = config.getItem('port')
  const NODE_ENV = config.getItem('NODE_ENV')
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}, NODE_ENV: ${NODE_ENV}`)
  })
})()
