'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ResumeTemplate3 from '@/components/resume-templates/ResumeTemplate3';
import { ResumeProvider } from '@/context/ResumeContext';

export default function ResumeBuilderPage() {
  const [activeSection, setActiveSection] = useState('improve-text');
  const searchParams = useSearchParams();
  
  // Get template information from URL parameters
  const templateId = searchParams.get('templateId');
  const templateName = searchParams.get('templateName');
  const templateKey = searchParams.get('templateKey');

  // For now, we only have ResumeTemplate3, so we'll use it regardless
  // In the future, you can add conditional logic here based on templateKey
  const renderTemplate = () => {
    return <ResumeTemplate3 useSampleData={false} isEditable={true} />;
  };

  return (
    <ResumeProvider>
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-lg sticky top-0 h-screen">
        <div className="flex items-center justify-end mb-2 h-6">
        </div>
          
          {/* Template Indicator */}
          {templateName && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <span className="material-icons text-green-600 mr-2">article</span>
                <div>
                  <p className="text-sm font-medium text-green-800">Selected Template</p>
                  <p className="text-xs text-green-600">{templateName}</p>
                </div>
              </div>
            </div>
          )}
          
        <nav>
          <ul>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">person</span>
                Personal Information
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">add</span>
                Add section
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">reorder</span>
                Rearrange
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">article</span>
                Templates
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">palette</span>
                Design & Font
              </a>
            </li>
            <li className="mb-4">
              <a className={`flex items-center p-2 rounded-lg ${
                activeSection === 'improve-text' 
                  ? 'bg-gray-100 text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`} href="#">
                <span className="material-icons mr-3">text_fields</span>
                Improve text
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">check_circle_outline</span>
                Checker
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">download</span>
                Download
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">share</span>
                Share
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">history</span>
                History
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Branding Toggle */}
        <div className="mt-auto absolute bottom-4 w-56">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <span className="material-icons text-gray-700 mr-3">local_offer</span>
              <span className="text-gray-700">Branding</span>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input 
                defaultChecked 
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                id="toggle" 
                name="toggle" 
                type="checkbox"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-green-400 cursor-pointer" htmlFor="toggle"></label>
            </div>
          </div>
        </div>
      </aside>

        {/* Main Content - Resume Template */}
        <main className="flex-1 flex justify-center items-start p-4">
          <div className="w-[210mm] h-[297mm] bg-white shadow-lg">
            {renderTemplate()}
          </div>
      </main>
    </div>
    </ResumeProvider>
  );
} 