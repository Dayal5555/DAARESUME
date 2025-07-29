'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { TemplateKey } from '../../components/resume-templates';
import ResumeTemplate3 from '../../components/resume-templates/ResumeTemplate3';

interface Template {
  id: string;
  name: string;
  templateKey: TemplateKey;
  description: string;
  component: React.FC<{ useSampleData?: boolean }>;
}

const TemplatesPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('template-3');
  const router = useRouter();

  // Updated template data with component references
  const templates: Template[] = [
    {
      id: '1',
      name: 'Sleek Modern',
      templateKey: 'template-3',
      description: 'A clean and modern design, perfect for tech professionals.',
      component: ResumeTemplate3
    },
    {
      id: '2',
      name: 'Contemporary Edge',
      templateKey: 'template-3',
      description: 'A professional and elegant design suitable for corporate roles.',
      component: ResumeTemplate3
    },
    {
      id: '3',
      name: 'Professional Gold',
      templateKey: 'template-3',
      description: 'An elegant design with gold accents, perfect for engineering and technical roles.',
      component: ResumeTemplate3
    }
  ];

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.templateKey);
  };

  const handleUseTemplate = () => {
    router.push(`/resume?template=${selectedTemplate}`);
  };

  const currentTemplate = templates.find(t => t.templateKey === selectedTemplate);
  const CurrentTemplateComponent = currentTemplate?.component;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar showCreateButton={true} />
      <div className="flex flex-col md:flex-row h-screen pt-16">
        {/* Left Sidebar - Template Names */}
        <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Templates</h2>
          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedTemplate === template.templateKey
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <h3 className="font-semibold text-gray-800 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Template Preview */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentTemplate?.name}
                </h1>
                <p className="text-gray-600">{currentTemplate?.description}</p>
              </div>
              <button
                onClick={handleUseTemplate}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Use This Template
              </button>
            </div>

            {/* Template Preview with A4 sizing and sample data */}
            <div className="flex justify-center items-start">
              <div className="a4-container">
                {CurrentTemplateComponent && <CurrentTemplateComponent useSampleData={true} />}
              </div>
            </div>

            {/* Template Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Professional Design</h3>
                <p className="text-gray-600 text-sm">Clean and modern layout that stands out to recruiters.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">ATS Friendly</h3>
                <p className="text-gray-600 text-sm">Optimized for Applicant Tracking Systems.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Customizable</h3>
                <p className="text-gray-600 text-sm">Easy to customize with your personal information.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;