const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
app.use(express.static('public'))
app.engine('html', require('express-art-template'));
app.set('view options', {
    root: path.join(__dirname, 'views'),
    debug: process.env.NODE_ENV !== 'production'
});



app.get('/', async(req, res) => {
  let data = await fs.readFileSync('json/blog2.json', 'utf8')
  let json = JSON.parse(data)
  res.render('index.html', {
    data: json['list']
  })
})


app.listen(3000, () => console.log('app listening on port 3000!'))
