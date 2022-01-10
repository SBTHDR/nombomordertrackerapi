const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 5000

// Assets Config
app.use(express.static('public'))

// Setup Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname, './resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
})