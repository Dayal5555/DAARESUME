import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types/auth';
import { 
  validateRegisterRequest, 
  validateLoginRequest, 
  sanitizeInput 
} from '../utilities/validation';
import { User } from '../db';

const JWT_SECRET = process.env['JWT_SECRET'] || 'your-secret-key';
const SALT_ROUNDS = 12;

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    if (!validateRegisterRequest(req.body)) {
      res.status(400).json({
        success: false,
        message: 'Invalid registration data. Please check your input.'
      } as AuthResponse);
      return;
    }

    const { username, email, password } = req.body as RegisterRequest;
    
    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedEmail = sanitizeInput(email);
    
    console.log('Registration attempt:', { 
      username: sanitizedUsername, 
      email: sanitizedEmail 
    });
    
    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: sanitizedEmail }, { username: sanitizedUsername }]
    });
    
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      } as AuthResponse);
      return;
    }
    
    // Create new user
    const newUser = new User({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password_hash: hashedPassword
    });
    
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: sanitizedEmail },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { 
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt
        },
        token
      }
    } as AuthResponse);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    } as AuthResponse);
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    if (!validateLoginRequest(req.body)) {
      res.status(400).json({
        success: false,
        message: 'Invalid login data. Please check your input.'
      } as AuthResponse);
      return;
    }

    const { email, password } = req.body as LoginRequest;
    
    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    
    console.log('Login attempt:', { email: sanitizedEmail });
    
    // Find user in database
    const user = await User.findOne({ email: sanitizedEmail });
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as AuthResponse);
      return;
    }
    
    // Compare password with bcrypt.compare()
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as AuthResponse);
      return;
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { 
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        token
      }
    } as AuthResponse);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    } as AuthResponse);
  }
} 