import * as Cheerio from 'cheerio'
import { createFile, delayTimer, http } from "./tools.js";

const urls = [
  // '15835.html',
  '15734.html',
  '16842.html',
  '15709.html',
  '12192.html',
  '18706.html',
  '16228.html',
  '17183.html',
  '15852.html',
  '8079.html',
  '16787.html',
  '16841.html',
  '11816.html',
  '14059.html',
]

// 点赞排序 小圆同学

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
