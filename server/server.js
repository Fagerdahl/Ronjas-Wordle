import express from 'express'; 
import cors from 'cors'; //For frontend and backend communication
import dotenv from 'dotenv';
import connectDB from './db.js';
import Score from './models/scoreModel.js';

dotenv.config({ path: './server/.env' }); //Load .env-file to use global variables
console.log('MONGO_URI:', process.env.MONGO_URI);

connectDB(); //Connecting to mongoDB

const app = express();
const PORT = process.env.PORT || 5080;

app.use(express.json()); //To handle JSON resources in body from frontend, middleware
app.use(cors()); //For frontend to be able to communicate with backend

//POST-Route to add a new score into my database
app.post('/api/scores', async (req, res) => {
    const { username, score, guesses } = req.body;

    try {
        //Create a new score doc
        const newScore = new Score({ username, score, guesses });
        await newScore.save();  //Save the score doc in database

        res.status(201).json(newScore);  //Return the score doc
    } catch (err) {
        console.error('Error when saving score:', err.message);
        res.status(500).json({ message: 'Could not save your score' });
    }
});

//GET-route to get all scores from database
app.get('/api/scores', async (req, res) => {
    try {
        const scores = await Score.find(); //Get all score documents 
        res.status(200).json(scores); //Return as JSON
    } catch (err) {
        console.error('error getting scores:', err.message);
        res.status(500).json({ message: 'Could not get scores' });
    }
});

//testroute for '/'
app.get('/', (req, res) => {
    res.send('Hello from express!');
})

app.listen(PORT, () => {
    console.log(`Served at http://localhost:${PORT}`);
})

