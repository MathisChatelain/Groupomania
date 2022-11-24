const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  postId: { type: mongoose.Types.ObjectId, required: true},
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: Array, required: false, default: []},
  usersDisliked: { type: Array, required: false, default: []},
});

module.exports = mongoose.model('post', postSchema);
