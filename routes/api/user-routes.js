const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller.js');

//user getAll and post routes
// /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

//user get one, update one, and delete one
// /api/users/<userId>
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;