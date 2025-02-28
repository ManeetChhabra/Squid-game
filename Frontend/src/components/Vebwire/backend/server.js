// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (if you are building a bundled frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Replace with your actual Vebwire API base URL and API key
const VEBWIRE_API_BASE = 'https://api.vebwire.com';
const API_KEY = 'AIzaSyAtV8nuqqKXDNbJ3yahxqGfzWxMBB-RmvU';

// Endpoint: Generate Educational Content
app.post('/api/vebwire/generate-content', async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }
  try {
    const response = await axios.post(
      `${VEBWIRE_API_BASE}/generate-content`,
      { topic },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error generating content:', error.message);
    res.status(500).json({ error: 'Error generating content' });
  }
});

// Endpoint: Ask AI Tutor (Q&A)
app.post('/api/vebwire/qa', async (req, res) => {
  const { question, context } = req.body; // "context" is optional
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }
  try {
    const response = await axios.post(
      `${VEBWIRE_API_BASE}/qa`,
      { question, context },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error getting QA response:', error.message);
    res.status(500).json({ error: 'Error getting QA response' });
  }
});

// (Optional) Endpoint: Analyze Content
app.post('/api/vebwire/analytics', async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required for analysis' });
  }
  try {
    const response = await axios.post(
      `${VEBWIRE_API_BASE}/analytics`,
      { content },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error analyzing content:', error.message);
    res.status(500).json({ error: 'Error analyzing content' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
