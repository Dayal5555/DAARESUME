'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import ResumePreview from './ResumePreview';
import PersonalInfo from './PersonalInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import { useResume } from '../context/ResumeContext';
import { RESUME_SECTIONS } from '@/constants/routes';

import resumeTemplates, {
  defaultTemplate,
  TemplateKey,
} from './resume-templates';

type TemplateId = keyof typeof resumeTemplates;

interface ResumeCraftProps {
  initialTemplate?: string;
}

const ResumeCraft: React.FC<ResumeCraftProps> = ({ initialTemplate }) => {
  const [activeSection, setActiveSection] = useState<string>(
    RESUME_SECTIONS.PERSONAL_INFO
  );
  const [currentTemplate, setCurrentTemplate] =
    useState<TemplateId>(defaultTemplate);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state } = useResume();

  useEffect(() => {
    // Check URL parameters first, then prop, then default
    const templateFromUrl = searchParams.get('template');
    const sectionFromUrl = searchParams.get('section');
    const templateToUse = templateFromUrl || initialTemplate;

    if (templateToUse && templateToUse in resumeTemplates) {
      setCurrentTemplate(templateToUse as TemplateId);
    }

    // Set active section from URL parameter, default to Personal Info
    if (sectionFromUrl) {
      setActiveSection(sectionFromUrl);
    } else {
      setActiveSection(RESUME_SECTIONS.PERSONAL_INFO);
    }
  }, [searchParams, initialTemplate]);

  const handleSectionClick = (section: string) => {
    console.log('Section clicked:', section);
    setActiveSection(section);
  };

  const handleSectionNavigation = (section: string) => {
    setActiveSection(section);
  };

  const handleBackNavigation = (currentSection: string) => {
    switch (currentSection) {
      case RESUME_SECTIONS.EXPERIENCE:
        setActiveSection(RESUME_SECTIONS.PERSONAL_INFO);
        break;
      case RESUME_SECTIONS.EDUCATION:
        setActiveSection(RESUME_SECTIONS.EXPERIENCE);
        break;
      case RESUME_SECTIONS.SKILLS:
        setActiveSection(RESUME_SECTIONS.EDUCATION);
        break;
      case RESUME_SECTIONS.PREVIEW:
        setActiveSection(RESUME_SECTIONS.SKILLS);
        break;
      default:
        break;
    }
  };

  const getCurrentStep = () => {
    switch (activeSection) {
      case RESUME_SECTIONS.PERSONAL_INFO:
        return 1;
      case RESUME_SECTIONS.EXPERIENCE:
        return 2;
      case RESUME_SECTIONS.EDUCATION:
        return 3;
      case RESUME_SECTIONS.SKILLS:
        return 4;
      case RESUME_SECTIONS.PREVIEW:
        return 5;
      default:
        return 1;
    }
  };

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return 'Personal Info';
      case 2:
        return 'Experience';
      case 3:
        return 'Education';
      case 4:
        return 'Skills';
      case 5:
        return 'Preview';
      default:
        return '';
    }
  };

  const calculateProgress = () => {
    // Check if personal info is completed
    const { personalInfo } = state;
    const requiredPersonalFields = [
      'firstName',
      'lastName',
      'email',
      'city',
      'roleApplyingFor',
      'summary',
    ];
    const personalInfoComplete = requiredPersonalFields.every(
      field => personalInfo[field as keyof typeof personalInfo]?.trim() !== ''
    );

    // Check if experience is completed
    const experienceComplete = state.experience.length > 0 || state.isFresher;

    // Check if education is completed
    const educationComplete = state.education.length > 0;

    // Check if skills are completed
    const skillsComplete = state.skills.length > 0;

    let completedSteps = 0;
    if (personalInfoComplete) completedSteps++;
    if (experienceComplete) completedSteps++;
    if (educationComplete) completedSteps++;
    if (skillsComplete) completedSteps++;

    return Math.round((completedSteps / 4) * 100);
  };

  const renderContent = () => {
    switch (activeSection) {
      case RESUME_SECTIONS.PERSONAL_INFO:
        return (
          <PersonalInfo
            onComplete={() =>
              handleSectionNavigation(RESUME_SECTIONS.EXPERIENCE)
            }
          />
        );
      case RESUME_SECTIONS.EXPERIENCE:
        return (
          <Experience
            onComplete={() =>
              handleSectionNavigation(RESUME_SECTIONS.EDUCATION)
            }
            onBack={() => handleBackNavigation(RESUME_SECTIONS.EXPERIENCE)}
          />
        );
      case RESUME_SECTIONS.EDUCATION:
        return (
          <Education
            onComplete={() => handleSectionNavigation(RESUME_SECTIONS.SKILLS)}
            onBack={() => handleBackNavigation(RESUME_SECTIONS.EDUCATION)}
          />
        );
      case RESUME_SECTIONS.SKILLS:
        return (
          <Skills
            onComplete={() => setActiveSection(RESUME_SECTIONS.PREVIEW)}
            onBack={() => handleBackNavigation(RESUME_SECTIONS.SKILLS)}
          />
        );
      default:
        return (
          <ResumePreview
            templateId={currentTemplate}
            onBack={() => handleBackNavigation(RESUME_SECTIONS.PREVIEW)}
          />
        );
    }
  };

  return (
    <div
      className='relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden'
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className='layout-container flex h-full grow flex-col'>
        {/* Progress Indicator */}
        <div className='px-6 py-4 bg-white border-b border-gray-200'>
          <div className='max-w-[960px] mx-auto'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-gray-600'>
                Step {getCurrentStep()} of 5: {getStepLabel(getCurrentStep())}
              </span>
              <span className='text-sm text-gray-500'>
                {calculateProgress()}% Complete
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className='gap-1 px-6 flex flex-1 justify-center'>
          <Sidebar
            onSectionClick={handleSectionClick}
            activeSection={activeSection}
            canNavigateToSection={() => true}
            currentTemplate={currentTemplate}
            onTemplateChange={template =>
              setCurrentTemplate(template as TemplateId)
            }
          />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ResumeCraft;
