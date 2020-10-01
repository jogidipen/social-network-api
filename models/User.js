const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought.js');
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
      validate: {
        validator: (email) => {
          return /.+@.+\..+/i.test(email);
        },
        message: props => `${props.value} is not a valid email address format.`
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    //friends: [FriendSchema]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

//friend count virtual
// UserSchema.virtual('friendCount')
// .get(function() {
//   console.log()
// })

const User = model('User', UserSchema);

module.exports = User;

