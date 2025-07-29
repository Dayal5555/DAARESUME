
import ResumeTemplate3 from './ResumeTemplate3';

// Template registry - add new templates here
export const resumeTemplates = {
  
  'template-3': ResumeTemplate3,
  // Add more templates here:
  // 'template-4': ResumeTemplate4,
};

export type TemplateKey = keyof typeof resumeTemplates;

// Default template
export const defaultTemplate: TemplateKey = 'template-3';

export default resumeTemplates; 