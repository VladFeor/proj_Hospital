require('dotenv').config()
const express = require('express')
const { listen } = require('express/lib/application')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')

const hbss = require('hbs');

const hbs  = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})





app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))



  

app.use('/',homeRoutes)
app.use(require('./routes/patient'))
app.use(require('./routes/doctor'))
app.use(require('./routes/pill'))
app.use(require('./routes/authorization'))
app.use(require('./routes/visit'))
app.use(require('./routes/illnes'))
app.use(require('./routes/dispensina'))


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})