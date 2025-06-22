require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // allow front-end to talk to this backend

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
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Spoonacular' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
