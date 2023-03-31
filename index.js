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
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1497580687758295040',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1499403551185444864',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1503414023609221120',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1512468450589442048',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1515751152121057280',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1525933058327277568',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1532691500823011329',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1534941259327660032',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1541470460352438272',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1546558881421221888',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1555236834510053376',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1556702082102706176',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1569029466545954816',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1580620421388480512',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1580996651619151872',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1589339443466297344',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1598389183688650752',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1611418930307870720',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1615061419770290177',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1618959543345569792',
    'https://www.zhihu.com/market/paid_column/1497517862251704320/section/1622689950796816384',
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
