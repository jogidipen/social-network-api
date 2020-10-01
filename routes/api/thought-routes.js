const router = require('express').Router();

const {
  addThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller.js');

// POST create a thought by userId
// /api/thoughts/<userId>/
router.route('/:userId')
.post(addThought);

//add a reaction
//update a thought
// /api/thoughts/<userId>/<thoughtId>/<reactionId>
//delete a thought
// /api/thoughts/<userId/<thoughtId>
router.route('/:userId/:thoughtId')
.put(addThought)
.delete(deleteThought);

//delete a reaction
// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId')
.delete(deleteReaction);

module.exports = router;