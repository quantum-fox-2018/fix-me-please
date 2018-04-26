const router = require('express').Router()
const card = require('../controllers/card')

router
  .get('/', card.all)
  .post('/', card.create)
  .put('/:id', card.update)
  .delete('/:id', card.delete)

module.exports = router;
