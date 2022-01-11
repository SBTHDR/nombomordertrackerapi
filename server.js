const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')

// DB Config
const url = 'mongodb://localhost/nombomordertrackerapi';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB Connected!');
}).on('error', (err) => {
    console.log(err);
});

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