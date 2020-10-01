const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema
(
  {
    username: {
      type: String,
      unique: [true, 'username must not match one already created'],
      required: [true, 'username is required'],
      trim: true
    },
    email: {
      type: String,
      unique: [true, 'email must not match one already created'], 
      required: [ true, 'email is required' ],
      // validate: {
      //   validator: (email) => {
      //     return /.+@.+\..+/i.test(email);
      //   },
      //   message: props => `${props.value} is not a valid email address format.`
      // }
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

//friend count virtual

const User = model('User', UserSchema);

module.exports = User;

