import mongoose, { model } from "mongoose";

const storySchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

export default mongoose.model('Story', storySchema);