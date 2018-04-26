const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/fix-me-please'

mongoose.connect(uri)

const cards = require('./routes/cards')
const players = require('./routes/players')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cards', cards)
app.use('/api/players', players)

app.listen(3000, () => console.log('listening on port 3000'))

// module.exports = app
