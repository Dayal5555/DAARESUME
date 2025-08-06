import dotenv from 'dotenv';
import express from 'express';
import { corsMiddleware } from './middleware/cors';
import { registerUser, loginUser } from './endpoints/auth';
import { connectDatabase, testConnection } from './db';

// Load environment variables
dotenv.config();

// Debug: Check if environment variables are loaded
console.log('🔍 Environment check:');
console.log(
  'MONGODB_URI:',
  process.env['MONGODB_URI'] ? '✅ Set' : '❌ Not set'
);
console.log('NODE_ENV:', process.env['NODE_ENV']);

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

// Initialize database and start server
async function startServer(): Promise<void> {
  try {
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('❌ Cannot start server: Database connection failed');
      process.exit(1);
    }

    // Connect to MongoDB
    await connectDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
      console.log('MONGODB_URI:', process.env['MONGODB_URI']);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
