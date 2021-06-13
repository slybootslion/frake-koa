import createApp from './app'
import { port } from './config'

(() => {
  const app = createApp()
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
})()
