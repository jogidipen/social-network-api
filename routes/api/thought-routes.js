const router = require('express').Router();

const {
  addThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller.js');

module.exports = router;