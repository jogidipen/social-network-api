const { User, Thought } = require('../models');

const thoughtController = {
  //add a thought
  addThought(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to add a thought", "\x1b[00m");
    console.log(``);
    console.log(req.body);
    Thought.create(req.body)
    .then(({ _id }) => {
      console.log(_id);
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
      if(!dbData) {
        return res.status(404).json({message: `no user or thought found with the id of ${req.params.userId}`});
      }
      res.status(200).json(dbUserData);
    })
    .catch(err => console.log(err));
  }
}