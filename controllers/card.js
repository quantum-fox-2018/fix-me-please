const Card = require('../models/Card')

module.exports = {
  all: function (req, res) {
    Card.find(function(err, cards) {
      if (err) {
        res.status(500).send({
          msg: 'error get data cards',
          err
        })
      } else {
        res.status(200).send({
          msg: 'success get data cards',
          cards
        })
      }
    })
  },
  create: function (req, res) {
    let {name, superskill, type, role} = req.body
    let newCard = new Card({name, superskill, type, role})

    newCard.save(function (err) {
      if (err) {
        res.status(500).send({
          msg: 'error add data card',
          err
        })
      } else {
        res.status(201).send({
          msg: 'success add data card',
          newCard
        })
      }
    })
  },
  update: function (req, res) {
    Card.findOne({ _id: req.params.id }, function (err, card) {
      if (err) {
        res.status(500).send({
          msg: 'error data card not found',
          err
        })
      } else {
        Card.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
          if (err) {
            res.status(500).send({
              msg: 'error updating data card',
              err
            })
          } else {
            res.status(201).send({
              msg: 'success updating data card'
            })
          }
        })
      }
    })
  },
  deletes: function (req, res) {
    Card.remove({ _id: req.id }, function (err, result) {
      if (err) {
        res.status(500).send({
          msg: 'error deleting data card',
          err
        })
      } else {
        res.status(201).send({
          msg: 'success deleting data card',
          result
        })
      }
    })
  }
}
