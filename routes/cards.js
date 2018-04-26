const router = require('express').Router()
const ctCard = require('../controllers/card')

router
  .get('/', ctCard.all)
  .post('/', ctCard.create)
  .put('/:id', ctCard.update)
  .delete('/:id', ctCard.delete)

module.exports = router;
