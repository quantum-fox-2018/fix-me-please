const Player = require('../models/Player')

module.exports = {
  all: function (req, res) {
    Player.find(function (err, players) {
        if (err) {
          res.status(500).json({
            msg: 'error get data players',
            err
          })
        } else {
          res.status(200).json({
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
      mmr: req.body.mmr
    })
    newPlayer.save(function (err, player) {
      if (err) {
        res.status(500).json({
          msg: 'error add data player',
          err
        })
      } else {
        res.status(201).json({
          msg: 'success add data player',
          player
        })
      }
    })
  },
  update: function (req, res) {
    Player.update({ _id: req.params.id }, { $set: req.body }, function (err, result) {
      if (err) {
        res.status(500).json({
          msg: 'error updating data player',
          err
        })
      } else {
        Player.findOne({ _id: req.params.id }, function (err, player) {
          if (err) {
            res.status(500).json({
              msg: 'error data player not found',
              err
            })
          } else {
            res.status(201).json({
              msg: 'success updating data player',
              player
            })
          }
        })
      }
    })
  },
  delete: function (req, res) {
    Player.remove({ _id: req.params.id }, function (err, result) {
      if (err) {
        res.status(500).json({
          msg: 'error deleting data player',
          err
        })
      } else {
        res.status(201).json({
          msg: 'success deleting data player',
          result
        })
      }
    })
  }
}
