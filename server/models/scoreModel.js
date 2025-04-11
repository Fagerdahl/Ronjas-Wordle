import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  time: { type: Number, required: true }, // Tid i sekunder
  guesses: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Score", scoreSchema);

/*Vi definierar ett nytt schema med fälten username, time och guesses.

required: true säkerställer att värden måste skickas in, annars kastar Mongoose ett valideringsfel.

{ timestamps: true } lägger automatiskt till fälten createdAt och updatedAt.*/
