//Model to structure score when it is being saved, this is connected to my POST route that saves the data
import mongoose from "mongoose";

//Gameresults
const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true }, //Username as string
  score: { type: Number, required: true }, //Score as number
  guesses: { type: [String], required: true }, //List of guesses as s list of strings
  createdAt: { type: Date, default: Date.now }, //When scored
});

//Create a model for scoreSchema
const Score = mongoose.model("Score", scoreSchema);

export default Score;
