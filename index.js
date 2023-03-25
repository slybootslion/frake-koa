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
    '2023/03/22/%E4%BD%8F%E6%88%91%E9%95%9C%E5%AD%90%E9%87%8C%E7%9A%84%E9%AC%BC%E5%B0%8F%E5%A7%90',
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
    'https://www.zhihu.com/market/paid_column/1465372641737154560/section/1479777849841905664',
    'https://www.zhihu.com/market/paid_column/1465372641737154560/section/1476810743610187776',
    'https://www.zhihu.com/market/paid_column/1537870091269545984/section/1539970276040736768',
    'https://www.zhihu.com/market/paid_column/1583895664110620672/section/1597243127542321152',
    'https://www.zhihu.com/market/paid_column/1611773869718745089/section/1617130738939314176',
    'https://www.zhihu.com/market/paid_column/1611773869718745089/section/1622259427502882816',
    'https://www.zhihu.com/market/paid_column/1573680063303835648/section/1576621399095107584',
    'https://www.zhihu.com/market/paid_column/1614278915110703104/section/1614295814507130881',
    'https://www.zhihu.com/market/paid_column/1614278915110703104/section/1614281718311219200',
    'https://www.zhihu.com/market/paid_column/1614278915110703104/section/1614305185030688768',
    'https://www.zhihu.com/market/paid_column/1614278915110703104/section/1616089697268252672',
    'https://www.zhihu.com/market/paid_column/1573680063303835648/section/1573683464150417409',
    'https://www.zhihu.com/market/paid_column/1573680063303835648/section/1576263141973024768',
    'https://www.zhihu.com/market/paid_column/1573680063303835648/section/1573682789873827840',
    'https://www.zhihu.com/market/paid_column/1573680063303835648/section/1576627786713980928',
    'https://www.zhihu.com/market/paid_column/1492523308218732544/section/1580972282805260288',
    'https://www.zhihu.com/market/paid_column/1486805707345735680/section/1505567867630669824',
    'https://www.zhihu.com/market/paid_column/1486805707345735680/section/1527745634027581440',
  ]

  const baseUrl = ''
  for (const url of urls) {
    await delayTimer(1900)
    const res = await httpCookie(baseUrl + url)
    const $ = Cheerio.load(res.res.text);
    const title = $('.ManuscriptTitle-root-gcmVk').text() + ' - ' + $('.ProductCardNew-title-r3FmE').text()
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
