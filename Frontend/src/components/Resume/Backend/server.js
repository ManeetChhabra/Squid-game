const express = require('express');
const fetch = require('node-fetch'); // Use node-fetch v2 or built-in fetch in Node 18+
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so your client can access this proxy
app.use(cors());
app.use(express.json());

// Proxy route for generating text
app.post('/api/generateText', async (req, res) => {
  try {
    // Replace these with your actual values
    const PROJECT_ID = '1034587532949';
    const API_KEY = 'AIzaSyDXIP5NzPgmXU3Fg4ribuINbFmePf1b92k'; // Use your valid API key
    const MODEL_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta2/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/text-bison-001:generateText`;

    const response = await fetch(MODEL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify(req.body)
    });

    // Forward the response from the PaLM API
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching data from API' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
