const { User, Thought } = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to get all thoughts", "\x1b[00m");
    console.log(``);
    Thought.find()
    // .populate(
    //   {
    //     path: 'user',
    //     select: ['-__v', '-email']
    //   }
    // )
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
        _id: req.params.id
      }
    )
    .populate(
      {
        path: 'user',
      }
    )
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({message: `no thought found with the id of ${req.params.id}`})
      }
      res.status(200).json(dbThoughtData);
    })
    .catch(e => { console.log(e); res.status(500).json(e); });
  },
  //add a thought
  // addThought(req, res) {
  //   console.log(``);
  //   console.log("\x1b[33m", "client request to add a thought", "\x1b[00m");
  //   console.log(``);
  //   console.log(req.body);
  //   let thoughtDataLocal;
  //   Thought.create(req.body)
  //   .then((thoughtData) => {//place the thought with the user id in the params
  //     thoughtDataLocal = thoughtData;
  //     console.log(thoughtData._id);
  //     console.log(thoughtData);
  //     //update the user with the new thought
  //     return User.findOneAndUpdate
  //     (
  //       { _id: req.body.userId },
  //       { $push: { thoughts: thoughtData._id } },
  //       {
  //         new: true,
  //         runValidators: true
  //       }
  //     )
  //     .populate(
  //       {
  //         path: 'thoughts',
  //         select: '-__v'
  //       }
  //     )
  //     .select('-__v')
  //   })
  //   .then(dbUserData => {
  //     console.log("\x1b[33m", "checking thoughtDataLocal", "\x1b[00m");
  //     console.log(thoughtDataLocal);
  //     console.log("\x1b[33m", "checking dbUserData", "\x1b[00m");
  //     console.log(dbUserData);
  //     console.log(dbUserData.username);
  //     if(!dbUserData) {
  //       return res.status(404).json({message: `no user found with the id of ${req.params.userId}`});
  //     }
  //     return Thought.findOneAndUpdate
  //     (
  //       { _id: thoughtDataLocal._id },
  //       { $push: { user: dbUserData._id } },
  //       { new: true }
  //     )
  //     .populate(
  //       {
  //         path: 'user',
  //         select: '-__v'
  //       }
  //     )
  //     .select('-__v')
  //   })
  //   .then(thoughtData2 => {
  //     console.log("\x1b[33m", "checking thoughtData2", "\x1b[00m");
  //     console.log(thoughtData2);
  //     if(!thoughtData2) {
  //       res.status(404).json({message: `could not find the thought with the id of ${thoughtDataLocal._id}`});
  //     }
  //     res.status(200).json(thoughtData2);
  //   })
  //   .catch(err => console.log(err));
  // },
  addThought(req, res) {
    //find user first to get the username
    Thought.create(req.body)
    .then(thought => {
      return User.findOneAndUpdate
      (
        {
          _id: req.body.userId
        },
        { $push: { thoughts: thought._id } },
        {
          new: true,
        }
      )
      // .populate(
      //   {
      //     path: 'thoughts',
      //     select: '-__v'
      //   }
      // )
      // .select('-__v')
    }).
    then(user => {
      res.json(user);
    })
    .catch(e => { console.log(e); res.status(500).json(thought); });
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
        _id: req.params.id
      }
    )
    .then(() => {
      //update user that had this thought id
      return User.findOneAndUpdate
      (
        { _id: req.params.userId },
        { $pull: { thoughts: req.params.id } },//delete thought from the user
        { new: true }
      )
      .populate(
        {
          path: 'friends',
          path: 'thoughts',
          select: '-__v'
        }
      )
      .select('-__v')
    })
    .then(dbUserData => {
      console.log(dbUserData);
      if (!dbUserData) {
        return res.status(404).json({message: `no user found with the id of ${req.params.userId}`});
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