const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
  nickname: String,
  memberid: String,
  role: String,
  datejoin: { type: Date, default: Date.now() },
  mmr: Number,
  cardlist: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
},
{
  timestamps: true
});

const Player = mongoose.model('Player', playerSchema)

module.exports = Player
