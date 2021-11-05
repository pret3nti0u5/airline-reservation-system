const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [mongoose.Schema.Types.ObjectId],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Since res.send converts an object to JSON this method can be used to delete property off of objects which we send for security.
// The deleted properties will be retained in the DB and will only be deleted off of the response object.

postSchema.methods.toJSON = function () {
  const post = this;
  const postObject = post.toObject();
  delete postObject.someProperty;
  return postObject;
};

const post = mongoose.model('post', postSchema);

module.exports = post;
