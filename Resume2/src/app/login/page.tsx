'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // TODO: Store JWT token in localStorage or cookies
        console.log('Login successful:', data);
        router.push('/resume-builder'); // Redirect to resume builder
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-teal-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-violet-500 rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-lg">rocket_launch</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Kickstart</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Create a resume you are{' '}
                  <span className="bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text text-transparent">
                    proud of
                  </span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Build professional resumes that stand out and get you hired at top companies.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="material-icons text-white text-xl">schedule</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Save time with hassle-free templates
                    </h3>
                    <p className="text-gray-700">
                      Choose from professionally designed templates that make your resume stand out.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="material-icons text-white text-xl">auto_awesome</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Beat the competition with smart advice
                    </h3>
                    <p className="text-gray-700">
                      Get actionable tips and suggestions to improve your resume content.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <span className="material-icons text-white text-xl">highlight</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Highlight achievements with visuals
                    </h3>
                    <p className="text-gray-700">
                      Use charts, icons, and layouts to showcase your accomplishments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-gray-700">
                  Get inspired by{' '}
                  <a className="text-teal-600 font-semibold hover:text-teal-700 transition-colors" href="#">
                    1800+ Free Resume Examples and Templates
                  </a>
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                <p className="text-gray-700">Sign in to your account to continue</p>
              </div>
              
              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.389 0-1.601 1.086-1.601 2.206v4.249H8.014V8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.71zM4.34 7.41h2.646V16.338H4.34V7.41zM5.66 4.98c-.995 0-1.8-.806-1.8-1.8s.805-1.8 1.8-1.8c.995 0 1.8.806 1.8 1.8s-.805 1.8-1.8 1.8z" fillRule="evenodd"></path>
                  </svg>
                  LinkedIn
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                  <img alt="Google icon" className="w-5 h-5 mr-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuMY6hr5ZCYBwpxfv2AAFaK7yRRINdwsJyc4y2YzAiAXlbOPR0dxkidSNzSKkszSTdnpQIxAlHY2yNJaQdxRjCDTm7TxOvqlt6qnFvSCcYQkLzrDE3sMqr3cDQxdLFACpGkA7hLZiHaZ1GE7pfSmpv582X13hh6byOA5sxb7AS4ZMcnS1WD-utIdiMiqpUSZaeFLV22UpLJj1go4rqJ_YSIkfscwYM5MLTUkMpCZjZE3NVCAebWOACsHJV58S1e47MFDQjG3Dj4iU"/>
                  Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-600">or continue with email</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  <div className="flex items-center">
                    <span className="material-icons text-red-500 mr-2">error</span>
                    {error}
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="email">
                    Email address
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-900 placeholder-gray-900"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-900 placeholder-gray-900"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-400 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in to your account'
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-700">
                  Don't have an account?{' '}
                  <a className="font-semibold text-teal-600 hover:text-teal-700 transition-colors" href="/register">
                    Sign up for free
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 