import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database configuration
console.log('🔍 Database config check:');
console.log('MongoDB URI:', process.env['MONGODB_URI']);

// MongoDB connection options
const mongoOptions = {
  maxPoolSize: 10, // Maximum number of connections in the pool
  serverSelectionTimeoutMS: 5000, // Timeout for server selection
  socketTimeoutMS: 45000, // Timeout for socket operations
  bufferCommands: false, // Disable mongoose buffering
};

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password_hash: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// User model
export const User = mongoose.model('User', userSchema);

// User interface
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password_hash: string;
  createdAt: Date;
  updatedAt: Date;
}

// Database connection function
export async function connectDatabase(): Promise<void> {
  try {
    const mongoUri = process.env['MONGODB_URI'];
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(mongoUri, mongoOptions);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().ping();
    }
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown function
export async function closeDatabase(): Promise<void> {
  try {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
}); 