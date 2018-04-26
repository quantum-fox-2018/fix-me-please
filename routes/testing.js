const router = require('express').Router()
const ctPlayer = require('../controllers/player')

router.get('/testing', function (req, res) {
  res.send('masuk')
})

module.exports = router;
