'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, getResumeUrl, RESUME_SECTIONS } from '@/constants/routes';

interface Template {
  id: string;
  name: string;
  templateKey: string;
  imagePath: string;
}

const TemplateSelection: React.FC = () => {
  const router = useRouter();

  const templates: Template[] = [
    {
      id: '1',
      name: 'Resume Template 3',
      templateKey: 'template-3',
      imagePath: '/resumetemplate3.jpg',
    },
  ];

  const handleTemplateSelect = (template: Template) => {
    // Pass the selected template information to the resume builder page
    const searchParams = new URLSearchParams({
      templateId: template.id,
      templateName: template.name,
      templateKey: template.templateKey,
    });
    router.push(`/resume-builder?${searchParams.toString()}`);
  };

  return (
    <div className='bg-gray-100 text-center py-10 min-h-screen'>
      <h1 className='text-4xl font-bold text-gray-800'>
        Please select a template for your resume.
      </h1>
      <p className='text-xl text-gray-600 mt-2'>
        You can always change it later.
      </p>

      <div className='flex justify-center mt-10 max-w-8xl mx-auto px-20'>
        {templates.map(template => (
          <div
            key={template.id}
            className='template-card flex flex-col items-center bg-[#e7ecf5] hover:bg-[#EAF5F2] p-6 rounded-lg'
          >
            <div className='shadow-lg overflow-hidden w-[320px] flex justify-center pt-5'>
              <img
                src={template.imagePath}
                alt={`${template.name} resume template preview`}
                className='w-full h-auto cursor-pointer hover:border-2 hover:border-green-600 rounded'
                style={{ objectFit: 'cover' }}
                onClick={() => handleTemplateSelect(template)}
              />
            </div>
            <h2 className='text-xl font-semibold text-gray-800 text-black mt-4 pb-3'>
              {template.name}
            </h2>
            <button
              className='bg-green-500 text-white font-bold py-3 px-8 rounded-lg mt-4 hover:bg-green-600 transition duration-300'
              onClick={() => handleTemplateSelect(template)}
            >
              Use This Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
