const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 5000;

app.use(cors()); // Allows React to fetch data from the backend

const scrapeData = async () => {
  const url = 'https://mastersunion.org/'; // Update with correct URL
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const $ = cheerio.load(data);
    const courses = [];

    $('.course-title').each((index, element) => {
      courses.push($(element).text().trim());
    });

    return courses;
  } catch (error) {
    console.error('Error scraping data:', error);
    return [];
  }
};

// API endpoint to get courses
app.get('/api/courses', async (req, res) => {
  const courses = await scrapeData();
  res.json(courses);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
