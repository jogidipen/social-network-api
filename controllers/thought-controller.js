const { User, Thought } = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to get all thoughts", "\x1b[00m");
    console.log(``);
    Thought.find({})
    .populate(
      {
        path: 'users',
        select: '-__v'
      }
    )
    .select('-__v')
    .then(dbThoughtData => res.status(200).json(dbThoughtData))
    .catch(e => { console.log(e); res.status(500).json(e); });
  },
  getThoughtById(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to get a thought by its id", "\x1b[00m");
    console.log(``);
    console.log(req.params);
    Thought.findOne
    (
      {
        _id: params.id
      }
    )
    .populate(
      {
        path: 'users',
        select: '-__v'
      }
    )
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({message: `no thought found with the id of ${req.params.id}`})
      }
    })
  },
  //add a thought
  addThought(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to add a thought", "\x1b[00m");
    console.log(``);
    console.log(req.body);
    Thought.create(req.body)
    .then(({ _id }) => {
      console.log(_id);
      //update the user with the new thought
      return User.findOneAndUpdate
      (
        { _id: req.params.userId },
        { $push: { thoughts: _id } },
        {
          new: true,
          runValidators: true
        }
      )
      .populate(
        {
          path: 'thoughts',
          select: '-__v'
        }
      )
      .select('-__v')
    })
    .then(dbUserData => {
      console.log(dbUserData);
      if(!dbUserData) {
        return res.status(404).json({message: `no user or thought found with the id of ${req.params.userId}`});
      }
      res.status(200).json(dbUserData);
    })
    .catch(err => console.log(err));
  },
  //delete a thought
  deleteThought(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to delete a thought", "\x1b[00m");
    console.log(``);
    console.log(req.params);
    Thought.findOneAndDelete
    (
      {
        _id: params.thoughtId
      }
    )
    then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({message: `no thought found with the id of ${req.params.thoughtId}`})
      }
      //update the user without the deleted thought
      return User.findOneAndUpdate
      (
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      )
      .populate(
        {
          path: 'thoughts',
          select: '-__v'
        }
      )
      .select('-__v')
    })
    .then(dbUserData => {
      console.log(dbUserData);
      if (!dbUserData) {
        return res.status(404).json({message: `no user found with the id of ${params.userId}`});
      }
      res.status(200).json(dbUserData);
    })
    .catch(e => { console.log(e); res.json(e); });
  },
  //add reaction to a thought
  addReaction(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to add a react to a thought", "\x1b[00m");
    console.log(``);
    console.log(req.params);
    console.log(req.body);
    Thought.findOneAndUpdate
    (
      { _id: params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
    .then(dbThoughtData => {
      console.log(dbThoughtData);
      if (!dbThoughtData) {
        return res.status(404).json({message: `no thought found with the id of ${req.params.thoughtId}`});
      }
      res.status(200).json(dbThoughtData);
    })
    .catch(e => { console.log(e); res.json(500).json(e); });
  },
  //delete a reaction to a thought
  deleteReaction(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to delete a reaction to a thought", "\x1b[00m");
    console.log(``);
    console.log(req.params);
    Thought.findOneAndUpdate
    (
      { _id: params.thoughtId },
      { $pull: { thoughts: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => {
      console.log(dbThoughtData);
      if (!dbThoughtData) {
        return res.status(404).json({message: `no thought found with the id of ${req.params.thoughtId} or reaction id of ${req.params.reactionId} `})
      }
      res.status(200).json(dbThoughtData);
    })
    .catch(e => { console.log(e); res.status(500).json(e); });
  }
};

module.exports = thoughtController;