const Player = require('../models/Player')

module.exports = {
  all: function (req, res) {
    Player
      .find(function (err, players) {
        // res.send(players)
        console.log(players)
        if (err) {
          res.status(500).send({
            msg: 'error get data players',
            err
          })
        } else {
          res.status(200).send({
            msg: 'success get data players',
            players
          })
        }
    })
  },
  create: function (req, res) {
    let newPlayer = new Player({
      nickname: req.body.nickname,
      memberid: req.body.memberid,
      role: req.body.role,
      datejoin: Date.now(),
      mmr: req.body.mmr, // number
      cardlist: req.body.cardlist // id Card
    })
    newPlayer.save(function (err, player) {
      if (err) {
        res.status(500).send({
          msg: 'error add data player',
          err
        })
      } else {
        res.send({
          msg: 'success add data player',
          player
        })
      }
    })
  },
  update: function (req, res) {
    console.log('masuk fungsi update')
    Player.findOneAndUpdate({
      _id: req.params.id ,
    }, {
      nickname: req.body.nickname,
      memberid: req.body.memberid,
      role: req.body.role,
      datejoin: Date.now(),
      mmr: req.body.mmr, // number
      cardlist: req.body.cardlist // id Card
    },
    function (err, result) {
        console.log(result)
        if (err) {
          res.status(500).send({
            msg: 'error data player not found',
            err
          })
        } else {
          res.status(201).send({
            msg: 'success updating data player',
            result
          })
        }
    })
  },
  deletes: function (req, res) {
    Player.remove({ _id: req.params.id }, function (err, result) {
      if (err) {
        res.status(500).send({
          msg: 'error deleting data player',
          err
        })
      } else {
        res.status(201).send({
          msg: 'success deleting data player',
          result
        })
      }
    })
  }
}
