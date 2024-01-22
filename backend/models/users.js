import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  profilePic: {
    type: String,
    default: null
  },
  coverPic: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    default: null
  },
  website: {
    type: String,
    default: null
  }
},{
  toJSON: {
      transform: function (doc, ret) {
          delete ret.password; // exclude password field from the response
      }
  }
}
);

export default mongoose.model('User', UserSchema);
