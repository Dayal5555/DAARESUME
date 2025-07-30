import dotenv from 'dotenv';
import express from 'express';
import { corsMiddleware } from './middleware/cors';
import { registerUser, loginUser } from './endpoints/auth';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 8000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Basic route
app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Authentication routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  console.log('POSTGRES_URL:', process.env['POSTGRES_URL']);
}); 