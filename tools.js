import axios from 'axios'
import fs from 'fs'
import superagent from "superagent";

export const http = url => {
  return new Promise(resolve => axios.get(url).then(res => resolve(res.data)))
}

// 知乎cookie
export const cookie = '_xsrf=2jPE1V2R7OI7qyGeAO0yDyrov9371ngR; _zap=8655bd6e-e380-48aa-94fd-cb2203310782; d_c0=AEAXnFIEhhaPTquJ5dvpx60Ptmzw9O1H3pU=|1679730842; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1679574727,1679651008,1679726099,1679730749; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1679730844; KLBRSID=031b5396d5ab406499e2ac6fe1bb1a43|1679730844|1679730830; z_c0=2|1:0|10:1679730845|4:z_c0|80:MS4xcVRTM0F3QUFBQUFtQUFBQVlBSlZUWnIyQzJVUnBpWHNvNmE0VHBCOUcyMTFCRjEwLWFCQmpRPT0=|79f19aaac7da30d7bbb684f3e0d31e66f4fa023dee5cb0cf7ca42f95c9217bbb'
export const httpCookie = url => {
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
