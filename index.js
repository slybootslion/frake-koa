import * as Cheerio from 'cheerio'
import { createFile, delayTimer, http, httpCookie } from "./tools.js";
import superagent from "superagent";

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
// https://www.zhihu.com/xen/market/remix/paid_column/1467897508667637760
const runYanxuan = async () => {
  const urls = [
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1495366025092317184',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1492181514897489920',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1522192704401903616',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1492183719913549824',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1503388322046742528',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1495769557386506240',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1540335486656180224',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1522907598894854144',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1530921117011574784',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1542509934352199680',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1496074005299363840',
    'https://www.zhihu.com/market/paid_column/1492096247107969024/section/1496852655729668096',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1581244493675872257',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1583464920422793216',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1586330481532010496',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1589305179437998080',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1593735303554068480',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1598395069169713152',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1606283533600976897',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1611772318690349056',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1619005947715678208',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1568671513020112896',
    'https://www.zhihu.com/market/paid_column/1563207467873615872/section/1575894001387065344',
    'https://www.zhihu.com/market/paid_column/1555633769729708034/section/1555878380784037888',
    'https://www.zhihu.com/market/paid_column/1555633769729708034/section/1575163143369457664',
    'https://www.zhihu.com/market/paid_column/1555633769729708034/section/1589631775260856320',
    'https://www.zhihu.com/market/paid_column/1555633769729708034/section/1598331618011389953',
    'https://www.zhihu.com/market/paid_column/1555633769729708034/section/1619421558757322752',
    'https://www.zhihu.com/market/paid_column/1549042090713190401/section/1549042467034533888',
    'https://www.zhihu.com/market/paid_column/1549042090713190401/section/1574090322745008128',
    'https://www.zhihu.com/market/paid_column/1549042090713190401/section/1612112351699918848',
    'https://www.zhihu.com/market/paid_column/1549042090713190401/section/1597596337125650432',
  ]
  const cookie = '_xsrf=2jPE1V2R7OI7qyGeAO0yDyrov9371ngR; _zap=8655bd6e-e380-48aa-94fd-cb2203310782; d_c0=AEAXnFIEhhaPTquJ5dvpx60Ptmzw9O1H3pU=|1679730842; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1679574727,1679651008,1679726099,1679730749; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1679730844; KLBRSID=031b5396d5ab406499e2ac6fe1bb1a43|1679730844|1679730830; z_c0=2|1:0|10:1679730845|4:z_c0|80:MS4xcVRTM0F3QUFBQUFtQUFBQVlBSlZUWnIyQzJVUnBpWHNvNmE0VHBCOUcyMTFCRjEwLWFCQmpRPT0=|79f19aaac7da30d7bbb684f3e0d31e66f4fa023dee5cb0cf7ca42f95c9217bbb'
  for (const url of urls) {
    await delayTimer(1900)
    const res = await httpCookie(url, cookie)
    const $ = Cheerio.load(res.res.text);
    const title = $('.ProductCardNew-title-r3FmE').text() + ' - ' + $('.ManuscriptTitle-root-gcmVk').text()
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
