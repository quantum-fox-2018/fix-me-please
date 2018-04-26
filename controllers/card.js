const Card = require('../models/Card')

module.exports = {
  all: function (req, res) {
    Card.find({})
    .then(function(cards) {
      res.status(200).send({
        msg: 'success get data cards',
        cards: cards
      })
    })
    .catch(function(err){
      res.status(500).send({
        msg: 'error get data cards',
        err
      })
    })
  },
  create: function (req, res) {
    let newCard = new Card(req.body)
    Card.save({newCard}, function (err, card) {
      if (err) {
        res.status(500).send({
          msg: 'error add data card',
          err
        })
      } else {
        res.status(201).send({
          msg: 'success add data card',
          card
        })
      }
      res.send(card)
    })
  },
  update: function (req, res) {
    Card.update({ _id: req.params.id }, { $set: req.body }, function (err, result) {
      if (err) {
        res.status(500).send({
          msg: 'error updating data card',
          err
        })
      } else {
        Card.findOne({ _id: req.id }, function (err, card) {
          if (err) {
            res.status(500).send({
              msg: 'error data card not found',
              err
            })
          } else {
            res.status(201).send({
              msg: 'success updating data card',
            })
          }
        })
      }
    })
  },
  delete: function (req, res) {
    let cardId = req.params.id
    Card.remove({ _id: cardId })
    .then(function(result) {
      res.status(201).send({
        msg: 'success deleting data card',
        result
      })
    })
    .catch(function(err){
      res.status(500).send({
        msg: 'error deleting data card',
        err
      })
    })
  }
}
