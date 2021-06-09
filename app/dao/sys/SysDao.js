import { password as p, username as u } from '../../db'
import bcryptjs from 'bcryptjs'
import { AuthFailed } from '../../pluto'
import { createUuid, readFile, writeFile } from '../../utils'
import dayjs from 'dayjs'
import path from 'path'

class SysDao {
  constructor () {
    this.codePath = path.join(__dirname, '../../db/code')
  }

  async login ({ username, password }) {
    if (username !== u) throw new AuthFailed({ message: '用户名错误' })
    if (!(await bcryptjs.compare(password, p))) throw new AuthFailed({ message: '密码错误' })
    return this.createCode()
  }

  createCode () {
    let codeData = readFile(this.codePath)
    if (!codeData || !codeData.code) {
      codeData = this._create()
      this._writeCode(codeData)
    } else {
      const day = dayjs(new Date()).diff(dayjs(codeData.exp), 'day')
      if (day > 5) {
        codeData = this._create()
        this._writeCode(codeData)
      }
    }
    return codeData.code
  }

  _writeCode (data) {
    writeFile(this.codePath, data)
  }

  _create () {
    const code = createUuid()
    const exp = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    return { code, exp }
  }
}

export default SysDao
