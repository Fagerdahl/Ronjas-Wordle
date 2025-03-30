import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 5080;

app.get('/', (req, res) => {
    res.send('Hello from express!');
})

app.listen(PORT, () => {
    console.log(`Served at http://localhost:${PORT}`);
})

