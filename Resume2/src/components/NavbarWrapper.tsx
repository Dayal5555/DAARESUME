'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const NavbarWrapper: React.FC = () => {
  const pathname = usePathname();

  // Determine if we should show the create button based on the current page
  // Show create button on homepage, templates page, and template selection page, hide on resume builder pages
  const showCreateButton =
    pathname === '/' ||
    pathname === '/templates' ||
    pathname === '/template-selection';

  return <Navbar showCreateButton={showCreateButton} />;
};

export default NavbarWrapper;
