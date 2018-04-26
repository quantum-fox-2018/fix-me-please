const router = require('express').Router()
const {
  all, create, update, deletes
} = require('../controllers/card')

router.get('/', all)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', deletes)

module.exports = router;

// const express = require('express');
// const router = express.Router();
// var booksController = require('../controllers/books');

// router.get('/', booksController.all)
// router.post('/', booksController.create)
// router.put('/:id', booksController.update)
// router.delete('/:id', booksController.delete)

// module.exports = router