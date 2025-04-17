const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());

const apiKey = process.env.GOOGLE_API_KEY; // ใช้ API Key จาก Environment Variable
const placeId = 'ChIJqzxOyr6X4jARLcJJZXkZjnk'; // Place ID ของ KEPT

app.get('/get-reviews', async (req, res) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`
    );
    res.json(response.data.result.reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
