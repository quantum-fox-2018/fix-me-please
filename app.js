const express = require('express')
const app = express()
const mongoose = require('mongoose')

const uri = 'mongodb://localhost/fix-me-please'

mongoose.Promise = global.Promise
mongoose.connect(uri, function(err) {
  if(err) {
    console.log('Error connecting to the database. ' + err)
  } else {
    console.log('Connected to Database')
  }
})

const cards = require('./routes/cards')
const players = require('./routes/players')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/cards', cards)
app.use('/api/players', players)

app.listen(3000, () => console.log('listening on port 3000'))

module.exports = app
