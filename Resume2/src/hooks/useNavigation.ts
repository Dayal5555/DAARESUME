'use client';

import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/');
  };

  const navigateToResume = (section?: string) => {
    const url = section ? `/resume?section=${section}` : '/resume';
    router.push(url);
  };

  const navigateToTemplates = () => {
    router.push('/templates');
  };

  const navigateToExamples = () => {
    router.push('/examples');
  };

  const navigateToPricing = () => {
    router.push('/pricing');
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  return {
    navigateToHome,
    navigateToResume,
    navigateToTemplates,
    navigateToExamples,
    navigateToPricing,
    navigateToSettings,
  };
};
