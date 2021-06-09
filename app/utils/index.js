import { v4 } from 'uuid'
import fs from 'fs'

export function createUuid () {
  return v4()
}

export function getParamsByV (v, type = 'body') {
  return v && v.get(type)
}

export function readFile (filePath) {
  const data = fs.readFileSync(filePath, 'utf-8')
  if (!data) return false
  return JSON.parse(data)
}

export function writeFile (filePath, data) {
  if (typeof data === 'object' && data != null) {
    return fs.writeFileSync(filePath, JSON.stringify(data))
  }
  return false
}
