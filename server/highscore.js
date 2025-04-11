// pages/api/scores.js
import dbConnect from '../../lib/dbConnect';
import Score from '../../models/Score';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const scores = await Score.find({}).sort({ score: -1 });
      return res.status(200).json(scores);
    } catch (error) {
      console.error('Error fetching scores:', error);
      return res.status(500).json({ error: 'Kunde inte hämta highscore' });
    }
  } else if (req.method === 'POST') {
    try {
      const { username, score, guesses } = req.body;
      // Skapa ett nytt highscore-objekt i MongoDB
      const newScore = await Score.create({ username, score, guesses });
      return res.status(201).json(newScore);
    } catch (error) {
      console.error('Error saving score:', error);
      return res.status(500).json({ error: 'Kunde inte spara highscore' });
    }
  } else {
    res.status(405).json({ error: 'Metod ej tillåten' });
  }
}

