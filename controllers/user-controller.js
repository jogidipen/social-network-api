const { User } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to get all users", "\x1b[00m");
    console.log(``);
    console.log("\x1b[33m", "request path", "\x1b[00m");
    console.log(req.path);
    User.find({})
    .populate(
      {
        path: 'thoughts',
        select: '-__v',
      }
    )
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(e => { console.log(e); res.status(500).json(e) });
  },
  //get a user by id
  getUserById(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to get a user by id", "\x1b[00m");
    console.log(``);
    console.log(req.params);
    User.findOne
    (
      {
        _id: req.params.id
      }
    )
    .populate(
      {
        path: 'thoughts',
        select: '-__v'
      }
    )
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        return res.status(404).json({message: `no user found with the id of ${req.params.id}`})
      }
      res.status(200).json(dbUserData);
    })
    .catch(e => { console.log(e); res.status(500).json(e) });
  },
  //create a user
  createUser(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to create a user", "\x1b[00m");
    console.log(``);
    console.log(req.body);
    User.create(req.body)
    .then(dbUserData => res.json(dbUserData))
    .catch(e => { console.log(e); res.status(500).json(e) });
  },
  //update a user: find by id and update
  updateUser(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to update a user", "\x1b[00m");
    console.log(``);
    console.log(req.params);
    console.log(req.body);
    User.findOneAndUpdate
    (
      { _id: req.params.id },
      body,
      {
        new: true,
        runValidators: true
      }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        return res.status(404).json({message: `no user found with the id of ${req.params.id}`});
      }
      res.status(200).json(dbUserData);
    })
    .catch(e => { console.log(e); res.status(500).json(e) });
  },
  //delete a user
  deleteUser(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to delete a user", "\x1b[00m");
    console.log(``);
    console.log(req.params);
    User.findOneAndDelete
    (
      {
        _id: req.params.id
      }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({message: `no user found with the id of ${req.params.id}`});
      }
      res.status(200).json(dbUserData);
    })
    .catch(e => { console.log(e); res.status(500).json(e) });
  },
  //add friend method

  //delete friend method
};

module.exports = userController;