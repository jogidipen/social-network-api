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
//POST a thought include userId in the body
// /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(addThought);

//GET a thought by thought id
// /api/thoughts/:id
router.route('/:id')
.get(getThoughtById);

// POST create a thought to a userId
// /api/thoughts/users/<userId>/
// router.route('/users/:userId')
// .post(addThought);

//delete a thought
// /api/thoughts/<id>/users/<userId>
router.route('/:id/users/:userId')
.delete(deleteThought);

//add a reaction
//update a thought
// /api/thoughts/<id>/users/<userId>/reactions/<reactionId>
router.route('/:id/users/:userId/reactions/:reactionId')
.post(addReaction);

//delete a reaction
//update a thought
// /api/thoughts/<id>/users/<userId>/reactions/<reactionId>
router.route('/:id/users/:userId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;