const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars');
const Route = require('./routes')
const db = require('./config/db')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
require('dotenv').config()


const app = express()

db.connect()


app.set('views', path.join(__dirname, 'resources/views'));

app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}))
app.set('view engine', 'hbs')




app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(cookieParser('secret'))

Route(app)


app.listen(process.env.PORT || 3000)