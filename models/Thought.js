const { Schema, model } = require('mongoose');
const moment = require('moment');

//reactions schema above thought schema to use for the virtual
const ReactionSchema = new Schema
(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: [true, 'reaction body must be required'],
      maxlength: 280
    },
    username: {
      type: String,
      required: [true, 'username is required with a reaction']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
)


const ThoughtSchema = new Schema
(
  {
    thoughtText: {
      type: String,
      required: [true, 'A thought entry is required'],
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

//virtual for reactionCount retrieves length of the thought's
// reactions array field on query
ThoughtSchema.virtual('thoughtCount')
.get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
