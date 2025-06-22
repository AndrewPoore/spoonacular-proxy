import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();

// 🔐 Enable CORS BEFORE any routes
app.use(cors({
  origin: 'https://andrewpoore.github.io'
}));

const PORT = process.env.PORT || 3000;

app.get('/recipes', async (req, res) => {
  const query = req.query.query || 'pasta';

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: process.env.SPOON_KEY,
        query
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch from Spoonacular' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
