import axios from 'axios'
import fs from 'fs'
import superagent from "superagent";

export const http = url => {
  return new Promise(resolve => axios.get(url).then(res => resolve(res.data)))
}

// 知乎cookie
export const httpCookie = (url, cookie, query=[]) => {
  return new Promise(resolve => superagent.get(url)
    .set('Cookie', cookie)
    .end((_, res) => resolve(res)))
}

export const createFile = data => {
  const title = data.title
  const content = data.content

  fs.writeFile(`${title}.txt`, content, { flag: 'w' }, () => console.log(title))
}

export const delayTimer = (sec = 1000) => new Promise(resolve => setTimeout(() => resolve(), sec))
