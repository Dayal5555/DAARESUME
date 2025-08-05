'use client';

import React, { useState } from 'react';
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

  return (
    <header className="w-full border-b border-gray-200 bg-white h-16 flex items-center px-5 shadow-sm">
      <div className="flex items-center gap-8 flex-1 min-w-0">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            HumanCv.<span className="text-[#22C8A9]">AI</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium text-gray-700">
          <Link 
            href="/template-selection"
            className={`hover:text-[#22C8A9] transition-colors flex items-center ${
              pathname === '/template-selection' ? 'text-[#22C8A9]' : ''
            }`}
          >
            Resume Templates
          </Link>
          <Link 
            href="#"
            className="hover:text-[#22C8A9] transition-colors"
          >
            Resume Examples
          </Link>
          <Link 
            href="#"
            className="hover:text-[#22C8A9] transition-colors"
          >
            Cover Letter
          </Link>
          <Link 
            href="#"
            className="hover:text-[#22C8A9] transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Sign up to save work notice */}
        <div className="hidden lg:flex items-center gap-3 ml-5">
          <span className="flex items-center gap-1 bg-transparent px-2 py-1 text-[14px] text-[#F5364E] font-medium">
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18" className="text-[#F5364E]">
              <circle cx="9" cy="9" r="8.25" stroke="#F5364E" strokeWidth="1.5"/>
              <path d="M9 5V10" stroke="#F5364E" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="12.5" r="0.75" fill="#F5364E"/>
            </svg>
            Sign up to save your work
          </span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3 min-w-fit">
        {/* Authentication buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="border border-[#22C8A9] rounded-md text-[#22C8A9] px-4 py-1 font-semibold text-sm bg-white hover:bg-[#e6faf7] transition-all"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-[#22C8A9] px-4 py-1 text-white font-semibold text-sm hover:bg-[#19ac97] transition-all"
          >
            Sign Up
          </Link>
          
          {/* Download button for resume builder */}
          {!showCreateButton && (
            <button
              className="hidden sm:block border border-gray-300 rounded-md text-gray-700 px-3 py-1 font-semibold text-sm bg-white hover:bg-gray-50 transition-all ml-2"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
        </div>
      </div>


    </header>
  );
};

export default Navbar; 