import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },

  length: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Word", wordSchema);
