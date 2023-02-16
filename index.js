import * as Cheerio from 'cheerio'
import { createFile, delayTimer, http } from "./tools.js";

const urls = [
  '16664.html',
  '16486.html',
  '15124.html',
  '11678.html',
  '16435.html',
  '16656.html',
  '16901.html',
  '15779.html',
  '16839.html',
  '17706.html',
  '17101.html',
  '8368.html',
  '12189.html',
  '15906.html',
  '8074.html',
]

// 点赞排序 王后的巴掌

const runQuJi = async () => {
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

runQuJi()
