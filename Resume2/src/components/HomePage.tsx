'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, getResumeUrl, RESUME_SECTIONS } from '@/constants/routes';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleBuildResume = () => {
    router.push('/template-selection');
  };

  const handleGetResumeScore = () => {
    // TODO: Implement resume scoring feature
    console.log('Get Resume Score clicked');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main>
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 opacity-50 blur-3xl"></div>
          
          <div className="container mx-auto px-6 py-20 lg:py-32 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Left side - Content */}
              <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                  Kickstart's <span className="text-green-500">Resume Builder</span> helps you get hired at top companies
                </h1>
                
                {/* Action buttons */}
                <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                  <button
                    onClick={handleBuildResume}
                    className="bg-green-500 text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-600 transition-colors text-lg"
                  >
                    Build Your Resume
                  </button>
                  <button
                    onClick={handleGetResumeScore}
                    className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-lg"
                  >
                    Get Your Resume Score
                  </button>
            </div>

                {/* Reviews */}
                <div className="mt-8 flex items-center justify-center lg:justify-start">
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600 font-medium">4,862 Reviews</p>
              </div>
            </div>

              {/* Right side - Image */}
              <div className="lg:w-2/5">
                <img 
                  alt="A professional resume template showing a candidate's experience, skills, and education." 
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRF-m0rWj44ualXJn-sSgcm6yuDMr7aHZh2Yk1EnQg2erA__KuWgyNnvYIHCMErdOvpnvrp4kG-77RAFaWaj9YLk9uiFbW89gIAxut3T4FDJ0SsdQFfIJqePSYCa0_jb1KpoHyfxW2bDODG4hFZ1xqAaH5PmxRgIAPCyiFLdkAYEWoqd3DRNXBp8D5n278xTVz4RsyQ8TyRH_4Adh1cskNLwOOD04sFIgDQuebohWQaYE6iJmTUCgTiHOKnhpXx1WHcJlJaQuQfrQ"
                />
              </div>
            </div>

            {/* Bottom section */}
            <div className="mt-20 lg:mt-32 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Pick a resume template and build your resume in minutes!
            </h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 