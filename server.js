const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.render('home')
})

// Setup Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname, './resources/views'))
app.set('view engine', 'ejs')

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
})