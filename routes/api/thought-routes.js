const router = require('express').Router();

const {
  addThought,
  deleteThought,
  addReaction,
  deleteReaction,
  getAllThoughts,
  getThoughtById
} = require('../../controllers/thought-controller.js');

//GET all thoughts
// /api/thoughts
router.route('/')
.get(getAllThoughts);

//GET a thought by thought id
router.route('/:id')
.get(getThoughtById);

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
.put(addReaction)
.delete(deleteThought);

//delete a reaction
// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId')
.delete(deleteReaction);

module.exports = router;