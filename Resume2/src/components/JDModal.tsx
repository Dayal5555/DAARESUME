'use client';

import React, { useEffect, useRef, useState } from 'react';

interface JDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JDModal: React.FC<JDModalProps> = ({ isOpen, onClose }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [jdText, setJdText] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    summary: false,
    experience: false,
    skills: false
  });

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur only */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Input Job Description
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* JD Input Section */}
          <div className="mb-6">
            <label htmlFor="jd-textarea" className="block text-sm font-medium text-gray-700 mb-2">
              Paste or type the job description here:
            </label>
            <textarea
              ref={textareaRef}
              id="jd-textarea"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#22C8A9] focus:border-transparent placeholder:text-gray-400"
              placeholder="Paste the job description here to help tailor your resume..."
              autoFocus
            />
          </div>

          {/* AI Generated Content Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select AI Generated Content</h3>
            
            {/* Summary Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="summary-checkbox"
                checked={selectedOptions.summary}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, summary: e.target.checked }))}
                className="w-4 h-4 text-[#22C8A9] bg-gray-100 border-gray-300 rounded focus:ring-[#22C8A9] focus:ring-2"
              />
              <label htmlFor="summary-checkbox" className="ml-3 text-sm font-medium text-gray-700">
                Generate Professional Summary
              </label>
            </div>

            {/* Experience Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="experience-checkbox"
                checked={selectedOptions.experience}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, experience: e.target.checked }))}
                className="w-4 h-4 text-[#22C8A9] bg-gray-100 border-gray-300 rounded focus:ring-[#22C8A9] focus:ring-2"
              />
              <label htmlFor="experience-checkbox" className="ml-3 text-sm font-medium text-gray-700">
                Generate Experience Details
              </label>
            </div>

            {/* Skills Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="skills-checkbox"
                checked={selectedOptions.skills}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, skills: e.target.checked }))}
                className="w-4 h-4 text-[#22C8A9] bg-gray-100 border-gray-300 rounded focus:ring-[#22C8A9] focus:ring-2"
              />
              <label htmlFor="skills-checkbox" className="ml-3 text-sm font-medium text-gray-700">
                Extract and Suggest Skills
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // TODO: Handle JD processing and AI generation
                console.log('JD submitted:', jdText);
                console.log('Selected options:', selectedOptions);
                onClose();
              }}
              className="px-4 py-2 bg-[#22C8A9] text-white rounded-md hover:bg-[#19ac97] transition-colors"
            >
              Generate & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JDModal; 