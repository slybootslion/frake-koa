import * as Cheerio from 'cheerio'
import { createFile, delayTimer, http, httpCookie } from "./tools.js";

const runQuJi = async () => {
  const urls = [
    '20199.html',
  ]

  const baseUrl = 'https://ifun.cool/'

  for (const url of urls) {
    await delayTimer(1200)
    const res = await http(baseUrl + url)
    const $ = Cheerio.load(res);
    const title = $('.article-title a').text()
    const contentEls = $('.article-content p')
    let content = ''
    for (let i = 0; i < contentEls.length; i++) {
      const txt = $(contentEls[i]).text()
      !!txt.trim() && (content += txt + '\n')
    }
    createFile({ title, content })
  }
}

const runYanShen = async () => {
  const urls = [
    '',
  ]

  const baseUrl = 'https://onehu.xyz/'

  for (const url of urls) {
    await delayTimer(1200)
    const res = await http(baseUrl + url)
    const $ = Cheerio.load(res);
    const arr = url.split('/')
    const title = arr[arr.length - 1]
    const contentEls = $('.markdown-body p')
    let content = ''
    for (let i = 0; i < contentEls.length; i++) {
      const txt = $(contentEls[i]).text()
      !!txt.trim() && (content += txt + '\n')
    }
    createFile({ title, content })
  }
}

// 集趣
// runQuJi()

// 盐神
// runYanShen()

// 盐选
const runYanxuan = async () => {
  const urls = [
    '1465372641737154560/section/1481962063962062848',
  ]

  const baseUrl = 'https://www.zhihu.com/market/paid_column/'
  for (const url of urls) {
    await delayTimer(1200)
    const res = await httpCookie(baseUrl + url)
    const $ = Cheerio.load(res.res.text);
    const title = $('.ManuscriptTitle-root-gcmVk').text()
    const contentEls = $('#manuscript p')
    let content = ''
    for (let i = 0; i < contentEls.length; i++) {
      const txt = $(contentEls[i]).text()
      !!txt.trim() && (content += txt + '\n')
    }
    createFile({ title, content })
  }
}
runYanxuan()
