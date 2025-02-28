const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

const filesDir = path.join(__dirname, 'files');

if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

app.get('/api/v1/user/auth/check', (req, res) => {
  res.json({ user: null });
});

// Endpoint to save file
app.post('/api/file', (req, res) => {
  const { filename, code } = req.body;
  const filePath = path.join(filesDir, filename);

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error('Error saving file:', err); // Log the error
      return res.json({ success: false, message: 'Error saving file.' });
    }
    res.json({ success: true, message: 'File saved successfully.' });
  });
});

// Endpoint to run code
app.post('/api/run-code', (req, res) => {
  const { filename, code } = req.body;
  const tempFilePath = path.join(__dirname, 'temp', filename);

  // Ensure the temp directory exists
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  fs.writeFile(tempFilePath, code, (err) => {
    if (err) {
      console.error('Error writing temp file:', err); // Log the error
      return res.json({
        success: false,
        output: 'Error saving temporary file.',
      });
    }

    exec(`node "${tempFilePath}"`, (error, stdout, stderr) => {
      let output = stdout;
      if (error) {
        output += stderr; // Append stderr to stdout
      }
      res.json({
        success: !error,
        output: output.trim(), // Trim any extra whitespace
      });
      fs.unlink(tempFilePath, (err) => {
        if (err) {
          console.error('Error deleting temporary file:', err);
        }
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
