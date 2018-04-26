const router = require('express').Router()
const {
  all, create, update, deletes
} = require('../controllers/player')


router.get('/', all)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', deletes)

module.exports = router;
