import mongoose, { model } from "mongoose";

const commentSchema = new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    desc: {
      type: String,
      required: true
    }
  });
  
  export default mongoose.model('Comments', commentSchema);