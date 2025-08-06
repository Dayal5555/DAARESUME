'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ResumeTemplate3 from '@/components/resume-templates/ResumeTemplate3';
import { ResumeProvider, useResume } from '@/context/ResumeContext';
import JDModal from '@/components/JDModal';

function ResumeBuilderContent() {
  const [activeSection, setActiveSection] = useState('improve-text');
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const { state } = useResume();
  const { personalInfo } = state;
  
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
      <aside className="bg-white shadow-lg mt-10 ml-5 px-3 py-3 text-xs rounded-xl">
        <div className="flex items-center justify-end mb-2">
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
              <a className="flex text-xs items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">add</span>
                Add section
              </a>
            </li>
            <li className="mb-4">
              <button 
                onClick={() => setIsJDModalOpen(true)}
                className="flex text-xs items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg w-full text-left"
              >
                <span className="material-icons mr-3">add</span>
                Input JD
              </button>
            </li>
            <li className="mb-4">
              <a className="flex text-xs items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">reorder</span>
                Rearrange
              </a>
            </li>
            <li className="mb-4">
              <a className="flex text-xs items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">article</span>
                Templates
              </a>
            </li>
            
           
            <li className="">
              <a className="flex text-xs items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg" href="#">
                <span className="material-icons mr-3">download</span>
                Download
              </a>
            </li>
           
          </ul>
        </nav>
      </aside>

        {/* Main Content - Resume Template */}
        <main className="flex-1 flex justify-center items-start p-4">
          <div className="w-[210mm] h-[297mm] bg-white shadow-lg">
            {renderTemplate()}
          </div>
      </main>
      
      {/* JD Modal */}
      <JDModal 
        isOpen={isJDModalOpen} 
        onClose={() => setIsJDModalOpen(false)}
        validateRequiredFields={() => {
          const missingFields = [];
          
          // Get the latest state from localStorage to ensure we have the most recent data
          let currentPersonalInfo = personalInfo;
          try {
            const savedData = localStorage.getItem('resumeData');
            if (savedData) {
              const parsedData = JSON.parse(savedData);
              currentPersonalInfo = parsedData.personalInfo;
            }
          } catch (error) {
            console.error('Error reading from localStorage:', error);
          }
          
          console.log('Validating position field:', {
            roleApplyingFor: currentPersonalInfo.roleApplyingFor,
            trimmed: currentPersonalInfo.roleApplyingFor?.trim(),
            isEmpty: !currentPersonalInfo.roleApplyingFor?.trim(),
            fromState: personalInfo.roleApplyingFor,
            fromLocalStorage: currentPersonalInfo.roleApplyingFor
          });
          
          if (!currentPersonalInfo.roleApplyingFor?.trim()) {
            missingFields.push('• Position you are applying for');
          }
          
          return {
            isValid: missingFields.length === 0,
            missingFields
          };
        }}
      />
    </div>
    </ResumeProvider>
  );
}

export default function ResumeBuilderPage() {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
} 