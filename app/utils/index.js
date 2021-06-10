import { v4 } from 'uuid'
import fs from 'fs'

export function createUuid () {
  return v4()
}

// body query path
export function getParamsByV (v, type = 'body') {
  return v && v.get(type)
}

export function randomStr (len) {
  let str = Math.random().toString(36).substr(2)
  if (str.length >= len) return str.substr(0, len)
  str += this.randomStr(0, len)
  return str
}

export function randomInt (maxNum = 100, minNum = 1) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
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

export function getParamsByBody () {

}
