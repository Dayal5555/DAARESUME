export const ROUTES = {
  HOME: '/',
  RESUME: '/resume',
  TEMPLATES: '/templates',
  EXAMPLES: '/examples',
  PRICING: '/pricing',
  SETTINGS: '/settings',
} as const;

export const RESUME_SECTIONS = {
  PERSONAL_INFO: 'personal-info',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PREVIEW: 'preview',
} as const;

export const getResumeUrl = (section?: string) => {
  return section ? `${ROUTES.RESUME}?section=${section}` : ROUTES.RESUME;
}; 