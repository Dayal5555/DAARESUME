'use client';

import React from 'react';

// --- SVG Icons as React Components ---

const UserIcon = () => (
  <div className="text-[#0e141b]" data-icon="User" data-size="24px" data-weight="fill">
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
    </svg>
  </div>
);

const BriefcaseIcon = () => (
  <div className="text-[#0e141b]" data-icon="Briefcase" data-size="24px" data-weight="regular">
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path>
    </svg>
  </div>
);

const GraduationCapIcon = () => (
    <div className="text-[#0e141b]" data-icon="GraduationCap" data-size="24px" data-weight="regular">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z"></path>
        </svg>
    </div>
);

const ListBulletsIcon = () => (
    <div className="text-[#0e141b]" data-icon="ListBullets" data-size="24px" data-weight="regular">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
        </svg>
    </div>
);

const TextBIcon = () => (
    <div className="text-[#0e141b]" data-icon="TextB" data-size="24px" data-weight="regular">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M170.48,115.7A44,44,0,0,0,140,40H72a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM80,56h60a28,28,0,0,1,0,56H80Zm72,136H80V128h72a32,32,0,0,1,0,64Z"></path>
        </svg>
    </div>
);

const TemplatesIcon = () => (
  <div className="text-[#0e141b]" data-icon="Templates" data-size="24px" data-weight="regular">
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M200,32H56A24,24,0,0,0,32,56V200a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24V56A24,24,0,0,0,200,32Zm8,168a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200a8,8,0,0,0,8,8ZM184,72H72A8,8,0,0,0,64,80v48h56v56h48a8,8,0,0,0,8-8V80A8,8,0,0,0,184,72ZM80,112V88h88v24Z"></path>
    </svg>
  </div>
);


// --- Data for Sidebar Sections ---
const sidebarSections = [
  { id: 'experience', label: 'Experience', icon: <BriefcaseIcon /> },
  { id: 'education', label: 'Education', icon: <GraduationCapIcon /> },
  { id: 'skills', label: 'Skills', icon: <ListBulletsIcon /> },
];

// --- Component Definition ---
interface SidebarProps {
  onSectionClick: (section: string) => void;
  activeSection: string;
  canNavigateToSection: (section: string) => boolean;
  currentTemplate?: string;
  onTemplateChange?: (template: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onSectionClick, 
  activeSection, 
  canNavigateToSection,
  currentTemplate = 'template-3',
  onTemplateChange
}) => {
  const templateNames = {
    'template-3': 'Sleek Modern'
  };

  return (
    <div className="layout-content-container flex flex-col w-80">
      <div className="flex flex-col bg-slate-50 p-4">
        <div className="flex flex-col gap-4">
          {/* Template Selection */}
          <div className="mb-4">
            <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-blue-50 border border-blue-200">
              <TemplatesIcon />
              <div className="flex-1">
                <p className="text-[#0e141b] text-sm font-medium leading-normal">Template</p>
                <p className="text-[#5c728a] text-xs">{templateNames[currentTemplate as keyof typeof templateNames] || 'Sleek Modern'}</p>
              </div>
            </div>
            {onTemplateChange && (
              <button
                onClick={() => onTemplateChange('template-3')}
                className="mt-2 w-full text-xs text-blue-600 hover:text-blue-700 underline"
              >
                Change Template
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {sidebarSections.map((section) => {
              const isActive = activeSection === section.id;
              const isEnabled = canNavigateToSection(section.id);
              
              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-all ${
                    isActive ? 'bg-[#e7edf3]' : ''
                  } ${
                    !isEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (isEnabled) {
                      console.log('Sidebar item clicked:', section.id);
                      onSectionClick(section.id);
                    }
                  }}
                >
                  {section.icon}
                  <p className={`text-[#0e141b] text-sm font-medium leading-normal ${
                    !isEnabled ? 'text-gray-400' : ''
                  }`}>
                    {section.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;