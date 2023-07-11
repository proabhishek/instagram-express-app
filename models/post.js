
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  image: String,
  likes: { type: Number, default: 0 }
}, { timestamps: true });

mongoose.model('Post', postSchema);
