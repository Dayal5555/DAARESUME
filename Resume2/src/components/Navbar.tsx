'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { generatePDF, extractResumeHTML } from '@/utils/pdfUtils';
import { ROUTES, getResumeUrl, RESUME_SECTIONS } from '@/constants/routes';

interface NavbarProps {
  showCreateButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showCreateButton = false }) => {
  const pathname = usePathname();

  const handleDownload = async () => {
    try {
      const htmlContent = extractResumeHTML();
      await generatePDF(htmlContent);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleClearStorage = () => {
    // Clear all localStorage data
    localStorage.clear();
    // Reload the page to reset the app state
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
          <span className="text-2xl font-bold text-gray-800 cursor-pointer">Kickstart</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/template-selection"
            className={`text-gray-600 hover:text-green-500 transition-colors ${
              pathname === '/template-selection' ? 'text-green-500' : ''
            }`}
          >
            Resume
          </Link>
          <Link 
            href="#"
            className="text-gray-600 hover:text-green-500 transition-colors"
          >
            Cover Letter
          </Link>
          <Link 
            href="#"
            className="text-gray-600 hover:text-green-500 transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="#"
            className="text-gray-600 hover:text-green-500 transition-colors"
          >
            Pricing
          </Link>
          <Link 
            href="#"
            className="text-gray-600 hover:text-green-500 transition-colors"
          >
            For Organizations
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Temporary Clear Storage Button - only show in development */}
          {process.env.NODE_ENV === 'development' && (
            <button
              className="bg-red-500 text-white font-semibold px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              onClick={handleClearStorage}
              title="Clear all stored data (temporary for testing)"
            >
              Clear Data
            </button>
          )}
          
          {/* Download button for resume builder */}
          {!showCreateButton && (
            <button
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
          
          {/* My Documents button */}
          <Link
            href="#"
            className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            My Documents
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 