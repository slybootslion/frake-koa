import { readFile } from '../utils'
import { join } from 'path'
import dayjs from 'dayjs'
import { AuthFailed } from '../pluto'

export async function luCodeRequired (ctx, next) {
  if (ctx.request.method !== 'OPTIONS') {
    check(ctx)
    await next()
  } else {
    next()
  }
}

function check (ctx) {
  const code = getCodeHeader(ctx)
  if (!code) throw new AuthFailed({ message: '需携带正确的LuCode' })
  const codeData = readFile(join(__dirname, '../db/code'))
  const day = dayjs(new Date()).diff(dayjs(codeData.exp), 'day')
  if (day > 5) throw new AuthFailed({ message: 'LuCode过期' })
  if (codeData.code !== code) throw new AuthFailed({ message: '需携带正确的LuCode' })
}

function getCodeHeader (ctx) {
  return ctx.header.lucode
}
