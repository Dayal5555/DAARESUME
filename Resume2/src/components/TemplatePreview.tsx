'use client';

import React from 'react';
import ResumeTemplate3 from './resume-templates/ResumeTemplate3';

interface TemplatePreviewProps {
  templateKey: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateKey }) => {
  // For now, we only have ResumeTemplate3, so we'll use that for all previews
  return (
    <div className="w-full h-full">
      <ResumeTemplate3 useSampleData={true} />
    </div>
  );
};

export default TemplatePreview; 