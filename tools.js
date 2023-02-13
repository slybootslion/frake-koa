import axios from 'axios'
import fs from 'fs'

export const http = url => {
  return new Promise(resolve => axios.get(url).then(res => resolve(res.data)))
}

export const createFile = data => {
  const title = data.title
  const content = data.content

  fs.writeFile(`${title}.txt`, content, { flag: 'w' }, () => console.log(title))
}

export const delayTimer = (sec = 1000) => new Promise(resolve => setTimeout(() => resolve(), sec))
