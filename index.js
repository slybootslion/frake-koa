import * as Cheerio from 'cheerio'
import { createFile, delayTimer, http } from "./tools.js";

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
    '2023/03/01/如何以「我将来是要做皇后的」为开头，写一篇故事',
    '2023/03/01/等烟雨',
    '2023/03/01/有哪些女主把男主当替身的小说？',
    '2023/03/01/你知道哪些齁甜的古言小说',
    '2023/03/01/有什么甜到嘴角疯狂上扬的小说-',
    '2023/03/01/可以推荐一些高甜文笔好的小说吗-江枫',
    '2023/02/28/那些被辜负的深情后来都怎么样了',
    '2023/02/28/求男主占有欲强偏执心狠手辣的小说！！！',
    '2023/02/28/有没有听完脊背发凉的鬼故事',
    '2023/02/28/什么样的女人才是聪明女人小尘',
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
runYanShen()
