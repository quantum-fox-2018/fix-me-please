const Player = require('../models/Player')

module.exports = {
  all: function (req, res) {
    Player
      .find(function (err, players) {
        if (err) {
          res.status(500).send({
            msg: 'error get data players',
            err
          })
        } else {
          res.send(200).status({
            msg: 'success get data players',
            players
          })
        }
    })
  },
  create: function (req, res) {
    let newPlayer = new Player(req.body)
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
    Player.update({ _id: req.id }, { $set: req.body }, function (err, result) {
      if (err) {
        res.status(500).send({
          msg: 'error updating data player',
          err
        })
      } else {
        Player.findOne({ _id: req.id }, function (err, player) {
          if (err) {
            res.status(500).send({
              msg: 'error data player not found',
              err
            })
          } else {
            res.status(201).send({
              msg: 'success updating data player',
              player
            })
          }
        })
      }
    })
  },
  deletes: function (req, res) {
    Player.remove({ _id: req.id }, function (err, result) {
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
