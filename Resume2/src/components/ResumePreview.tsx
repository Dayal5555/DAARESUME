'use client';

import React from 'react';
import { generatePDF, extractResumeHTML } from '@/utils/pdfUtils';
import resumeTemplates, { defaultTemplate } from './resume-templates';
import { useResume } from '../context/ResumeContext';

type TemplateId = keyof typeof resumeTemplates;

interface ResumePreviewProps {
  templateId?: TemplateId;
  onBack?: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  templateId = defaultTemplate,
  onBack,
}) => {
  const { state } = useResume();

  const handleDownload = async () => {
    try {
      const htmlContent = extractResumeHTML();
      await generatePDF(htmlContent);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Check if user has entered any data
  const hasUserData =
    state.personalInfo.firstName ||
    state.personalInfo.lastName ||
    state.experience.length > 0 ||
    state.education.length > 0 ||
    state.skills.length > 0;

  // Get the current template
  const CurrentTemplate = resumeTemplates[templateId];

  return (
    <div id='resume-preview' className='flex flex-col max-w-[960px] flex-1'>
      <div className='flex flex-wrap justify-between gap-3 p-4'>
        <div className='flex min-w-72 flex-col gap-3'>
          <p className='text-[#101418] tracking-light text-[32px] font-bold leading-tight'>
            Resume Preview
          </p>
          <p className='text-[#5c728a] text-sm font-normal leading-normal'>
            {hasUserData
              ? 'Click on any section to edit'
              : 'This is how your resume will look. Start by adding your information in the sections below.'}
          </p>
        </div>
      </div>

      {/* Resume Template Content with A4 sizing */}
      <div className='flex justify-center items-start p-4'>
        <div className='a4-container'>
          <CurrentTemplate />
        </div>
      </div>

      <div className='flex justify-stretch'>
        <div className='flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between'>
          <button
            className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-gray-300 text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'
            onClick={onBack}
          >
            <span className='truncate'>Back to Skills</span>
          </button>
          <div className='flex gap-3'>
            <button
              className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#eaedf1] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'
              onClick={handleDownload}
            >
              <span className='truncate'>Download</span>
            </button>
            <button className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#b2cbe5] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'>
              <span className='truncate'>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
