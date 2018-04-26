const router = require('express').Router()
const card = require('../controllers/card')

router.get('/show', card.all)

router.post('/add', card.create)
  
router.put('/update/:id', card.update)
  
router.delete('/delete/:id', card.delete)

module.exports = router;
