const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate')

// const textIn = fs.readFile('./starter/txt/input.txt', 'utf-8', (err, res) => {
//   if (err) return err
//   const textOut = `This is what we know about avocado: ${res}.\nCreate on ${Date.now()}`;
//   fs.writeFile('./starter/txt/output.txt', textOut, () => {})
// })



const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map(el => slugify(el.productName), {lower: true})

console.log(slugs)

const server = http.createServer((req, res) => {
  const {query , pathname} = url.parse(req.url, true)
  // const pathname = req.url


  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output)


  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)


  } else if (pathname === '/api') {
    res.end(data)


  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    })
    res.end('<h1>Page not found!</h1>')
  }
})
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000')
})
