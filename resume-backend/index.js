require('dotenv').config();
const express = require('express');

const app = express();
const PORT = 8000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log('Server is running');
  console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
}); 