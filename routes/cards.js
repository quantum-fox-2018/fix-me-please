const router = require('express').Route()
const {
  all, create, update, deletes
} = require('../controllers/card')

router
  .get('/', all)
  .post('/', create)
  .put('/:id', update)
  .delete('/:id', deletes)

module.exports = router;
