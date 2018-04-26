const router = require('express').Router()
const { all, create, update, deletes } = require('../controllers/player')

router
  .get('/', all)
  .post('/', create)
  .put('/:id', update)
  .delete('/:id', deletes)

module.exports = router;
