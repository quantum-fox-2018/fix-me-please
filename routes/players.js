const router = require('express').Router()
const player = require('../controllers/player')

router
  .get('/', player.all)
  .post('/', player.create)
  .put('/:id', player.update)
  .delete('/:id', player.delete)

module.exports = router;
