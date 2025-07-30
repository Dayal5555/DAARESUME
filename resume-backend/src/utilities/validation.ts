import { RegisterRequest, LoginRequest } from '../types/auth';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // Minimum 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export function validateUsername(username: string): boolean {
  // 3-20 characters, alphanumeric and underscores only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function validateRegisterRequest(data: unknown): data is RegisterRequest {
  if (!data || typeof data !== 'object') return false;
  
  const { username, email, password } = data as RegisterRequest;
  
  return (
    typeof username === 'string' &&
    typeof email === 'string' &&
    typeof password === 'string' &&
    validateUsername(username) &&
    validateEmail(email) &&
    validatePassword(password)
  );
}

export function validateLoginRequest(data: unknown): data is LoginRequest {
  if (!data || typeof data !== 'object') return false;
  
  const { email, password } = data as LoginRequest;
  
  return (
    typeof email === 'string' &&
    typeof password === 'string' &&
    validateEmail(email) &&
    password.length > 0
  );
} 