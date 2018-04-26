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
    // console.log(req.body)
    let newCard = new Card({
      name: req.body.name,
      superskill: req.body.superskill,
      type: req.body.type,
      role: req.body.role
    })

    newCard.save(function (err, card) {
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
      // res.send(card)
    })
  },
  update: function (req, res) {
    Card.findOneAndUpdate({
      _id: req.params.id ,
    }, {
      name: req.body.name,
      superskill: req.body.superskill,
      type: req.body.type,
      role: req.body.role
    },
    function (err, result) {
        console.log(result)
      if (err) {
        res.status(500).send({
          msg: 'error updating data card',
          err
        })
      } else {
          res.status(201).send({
            msg: 'success updating data card',
            result
          })
      }
    })
  },
  deletes: function (req, res) {
    Card.remove({ _id: req.params.id }, function (err, result) {
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
