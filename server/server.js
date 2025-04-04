import express from 'express'; 
import cors from 'cors'; //For frontend an dbackend communication
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config(); //Load .env-file
console.log('🧪 MONGO_URI:', process.env.MONGO_URI);

connectDB(); //Connecting to mongoDB

const app = express();
const PORT = process.env.PORT || 5080;

app.use(cors());
app.use(express.json());

//testroute for '/'
app.get('/', (req, res) => {
    res.send('Hello from express!');
})

app.listen(PORT, () => {
    console.log(`Served at http://localhost:${PORT}`);
})

