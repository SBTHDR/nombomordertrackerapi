require('dotenv').config()
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)

// DB Config
const url = 'mongodb://localhost/nombomordertrackerapi';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB Connected!');
}).on('error', (err) => {
    console.log(err);
});

// Session Store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

// Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))
app.use(flash())

// Assets Config
app.use(express.static('public'))
app.use(express.json())

// Global Session Middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

// Setup Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname, './resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
})