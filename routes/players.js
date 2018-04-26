const router = require('express').Router()
const ctPlayer = require('../controllers/player')

router
  .get('/', ctPlayer.all)
  .post('/', ctPlayer.create)
  .put('/:id', ctPlayer.update)
  .delete('/:id', ctPlayer.delete)

module.exports = router;
