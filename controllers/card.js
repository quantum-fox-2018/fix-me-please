const Card = require('../models/Card')

module.exports = {
  all: function (req, res) {
    Card.find(function(err, cards) {
      if (err) {
        res.status(500).json({
          msg: 'error get data cards',
          err
        })
      } else {
        res.status(200).json({
          msg: 'success get data cards',
          cards
        })
      }
    })
  },
  create: function (req, res) {
    let newCard = new Card({
      name: req.body.name,
      superskill: req.body.superskill,
      type: req.body.type,
      role: req.body.role
    })
    newCard.save(function (err, card) {
      if (err) {
        res.status(500).json({
          msg: 'error add data card',
          err
        })
      } else {
        res.status(201).json({
          msg: 'success add data card',
          card
        })
      }
    })
  },
  update: function (req, res) {
    // question.findByIdAndUpdate(req.params.id, {
    //   $set: req.body
    //   })
    Card.findByIdAndUpdate(req.params.id, {
      $set: req.body 
      }, function (err, result) {
      if (err) {
        res.status(500).json({
          msg: 'error updating data card',
          err
        })
      } else {
        Card.findOne({ _id: req.params.id }, function (err, card) {
          if (err) {
            res.status(500).json({
              msg: 'error data card not found',
              err
            })
          } else {
            res.status(201).json({
              msg: 'success updating data card',
              card
            })
          }
        })
      }
    })
  },
  delete: function (req, res) {
    Card.remove({ _id: req.params.id }, function (err, result) {
      if (err) {
        res.status(500).json({
          msg: 'error deleting data card',
          err
        })
      } else {
        res.status(201).json({
          msg: 'success deleting data card',
          result
        })
      }
    })
  }
}
