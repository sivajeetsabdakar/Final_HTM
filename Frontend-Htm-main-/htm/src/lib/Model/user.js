// user.js (Model definition)
import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  totalQuestion: {
    type: Number,
  },
  about: {
    type: String,
  },
  right: {
    type: Number,
  },
  wrong: {
    type: Number,
  },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
