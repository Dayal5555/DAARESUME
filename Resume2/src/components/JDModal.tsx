'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useResume } from '@/context/ResumeContext';

interface JDModalProps {
  isOpen: boolean;
  onClose: () => void;
  validateRequiredFields?: () => { isValid: boolean; missingFields: string[] };
}

const JDModal: React.FC<JDModalProps> = ({ isOpen, onClose, validateRequiredFields }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { updatePersonalInfo, addExperience, addSkill, state } = useResume();
  
  // Get the current position and skills from the resume state
  const currentPosition = state.personalInfo.roleApplyingFor;
  const currentSkills = state.skills;
  
  // Debug: Log current position and skills
  console.log('JDModal - Current position from state:', currentPosition);
  console.log('JDModal - Current skills from state:', currentSkills);
  const [jdText, setJdText] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    summary: false,
    experience: false,
    skills: false
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'summary' | 'experience' | 'skills'>('idle');
  const [validationRefresh, setValidationRefresh] = useState(0);

  // API call function
  const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': 'AIzaSyCgADu-v2HwwxjCh9HS-Hw89SmKG_OiknM'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  // Generate content based on selected options
  const generateContent = async () => {
    // Validate required fields first
    const missingFields = [];
    if (!currentPosition?.trim()) {
      missingFields.push('Position you are applying for');
    }
    if (currentSkills.length === 0) {
      missingFields.push('Skills section');
    }
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields in your resume before generating AI content:\n\n• ${missingFields.join('\n• ')}\n\nPlease go back and fill in these fields, then try again.`);
      return;
    }

    if (!jdText.trim()) {
      alert('Please enter a job description first.');
      return;
    }

    if (!selectedOptions.summary && !selectedOptions.experience && !selectedOptions.skills) {
      alert('Please select at least one option to generate.');
      return;
    }

    setIsGenerating(true);

    try {
      // Generate Summary
      if (selectedOptions.summary) {
        setCurrentStep('summary');
        const summaryPrompt = `Based on this job description: "${jdText}",
        write a professional summary for a resume that will feel like it is writtten by human. Make it concise, professional, and tailored to the job requirements. Keep it under 120 words. `;
        const summary = await callGeminiAPI(summaryPrompt);
        
        // Update resume summary
        console.log('Before updating summary - Current state:', state);
        updatePersonalInfo({ summary });
        console.log('Generated Summary:', summary);
        console.log('After updating summary - New state:', state);
        
        // Add a small delay to ensure state updates properly
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Force localStorage save
        localStorage.setItem('resumeData', JSON.stringify(state));
      }

      // Generate Experience
      if (selectedOptions.experience) {
        setCurrentStep('experience');
        const experiencePrompt = `Based on this job description: "${jdText}", write a detailed work experience entry that would be suitable for this position. Include company name, position, dates, and detailed responsibilities with achievements. Format as: Company: [name], Position: [title], Dates: [start-end], Description: [detailed responsibilities and achievements]`;
        const experience = await callGeminiAPI(experiencePrompt);
        
        // Parse and add experience
        const experienceData = {
          company: 'AI Generated Company',
          position: 'Relevant Position',
          location: 'Remote/On-site',
          startDate: '2023',
          endDate: 'Present',
          current: true,
          description: experience
        };
        
        console.log('Before adding experience - Current state:', state);
        addExperience(experienceData);
        console.log('Generated Experience:', experience);
        console.log('After adding experience - New state:', state);
        
        // Add a small delay to ensure state updates properly
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Force localStorage save
        localStorage.setItem('resumeData', JSON.stringify(state));
      }

      // Generate Skills
      if (selectedOptions.skills) {
        setCurrentStep('skills');
        const skillsPrompt = `Based on this job description: "${jdText}", extract and list 5-8 key skills that would be relevant for this position. Return only the skill names, one per line, without numbers or bullets.`;
        const skillsText = await callGeminiAPI(skillsPrompt);
        
        // Parse skills and add them
        const skillsList = skillsText.split('\n').filter(skill => skill.trim()).slice(0, 8);
        
        console.log('Before adding skills - Current state:', state);
        skillsList.forEach(skill => {
          addSkill({
            name: skill.trim(),
            level: 'Advanced'
          });
        });
        
        console.log('Generated Skills:', skillsList);
        console.log('After adding skills - New state:', state);
        
        // Add a small delay to ensure state updates properly
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Force localStorage save
        localStorage.setItem('resumeData', JSON.stringify(state));
      }

      const generatedItems = [];
      if (selectedOptions.summary) generatedItems.push('Summary');
      if (selectedOptions.experience) generatedItems.push('Experience');
      if (selectedOptions.skills) generatedItems.push('Skills');
      
      // Final localStorage save
      localStorage.setItem('resumeData', JSON.stringify(state));
      
      alert(`Successfully generated: ${generatedItems.join(', ')}! The content has been added to your resume.`);
      onClose();
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
      setCurrentStep('idle');
    }
  };

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
      
      // Debug: Check validation when modal opens
      if (validateRequiredFields) {
        // Add a small delay to ensure state is updated
        setTimeout(() => {
          const validation = validateRequiredFields();
          console.log('JD Modal opened - Validation result:', validation);
        }, 100);
      }
    }
  }, [isOpen, validateRequiredFields]);

  // Listen for changes in resume state and refresh validation
  useEffect(() => {
    if (isOpen && validateRequiredFields) {
      const interval = setInterval(() => {
        setValidationRefresh(prev => prev + 1);
      }, 1000); // Check every second
      
      return () => clearInterval(interval);
    }
  }, [isOpen, validateRequiredFields]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur only */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Input Job Description
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Validation Notice */}
          {(() => {
            // Check both the validation function and direct state
            const validation = validateRequiredFields ? validateRequiredFields() : { isValid: true, missingFields: [] };
            const directValidation = !currentPosition?.trim();
            
            console.log('Rendering validation notice:', {
              validation,
              directValidation,
              currentPosition,
              currentSkills: currentSkills.length,
              refresh: validationRefresh
            });
            
            if (!validation.isValid || directValidation || currentSkills.length === 0) {
              return (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                                         <div>
                       <p className="text-sm font-medium text-red-800">Required Fields Missing</p>
                       <p className="text-xs text-red-600">
                         Please fill in the following fields in your resume before generating AI content:
                         {!currentPosition?.trim() && <br />}• Position you are applying for
                         {currentSkills.length === 0 && <br />}• Skills section
                       </p>
                       <button 
                         onClick={() => setValidationRefresh(prev => prev + 1)}
                         className="mt-2 text-xs text-red-600 underline hover:text-red-800"
                       >
                         Refresh validation
                       </button>
                     </div>
                  </div>
                </div>
              );
            }
            return null;
          })()}
          
          {/* JD Input Section */}
          <div className="mb-6">
            <label htmlFor="jd-textarea" className="block text-sm font-medium text-gray-700 mb-2">
              Paste or type the job description here:
            </label>
            <p className="text-xs text-gray-500 mb-2">
              💡 Tip: Make sure you've filled in the "Position you are applying for" field and added at least one skill in your resume first.
            </p>
            <textarea
              ref={textareaRef}
              id="jd-textarea"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#22C8A9] focus:border-transparent placeholder:text-gray-400"
              placeholder="Paste the job description here to help tailor your resume..."
              autoFocus
            />
          </div>

          {/* AI Generated Content Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select AI Generated Content</h3>
            
            {/* Summary Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="summary-checkbox"
                checked={selectedOptions.summary}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, summary: e.target.checked }))}
                className="w-4 h-4 text-[#22C8A9] bg-gray-100 border-gray-300 rounded focus:ring-[#22C8A9] focus:ring-2"
              />
              <label htmlFor="summary-checkbox" className="ml-3 text-sm font-medium text-gray-700">
                Generate Professional Summary
              </label>
            </div>

            {/* Experience Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="experience-checkbox"
                checked={selectedOptions.experience}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, experience: e.target.checked }))}
                className="w-4 h-4 text-[#22C8A9] bg-gray-100 border-gray-300 rounded focus:ring-[#22C8A9] focus:ring-2"
              />
              <label htmlFor="experience-checkbox" className="ml-3 text-sm font-medium text-gray-700">
                Generate Experience Details
              </label>
            </div>

            {/* Skills Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="skills-checkbox"
                checked={selectedOptions.skills}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, skills: e.target.checked }))}
                className="w-4 h-4 text-[#22C8A9] bg-gray-100 border-gray-300 rounded focus:ring-[#22C8A9] focus:ring-2"
              />
              <label htmlFor="skills-checkbox" className="ml-3 text-sm font-medium text-gray-700">
                Extract and Suggest Skills
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={generateContent}
              disabled={isGenerating || !currentPosition?.trim() || currentSkills.length === 0}
              className="px-4 py-2 bg-[#22C8A9] text-white rounded-md hover:bg-[#19ac97] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {currentStep === 'summary' && 'Generating Summary...'}
                  {currentStep === 'experience' && 'Generating Experience...'}
                  {currentStep === 'skills' && 'Generating Skills...'}
                </>
              ) : !currentPosition?.trim() || currentSkills.length === 0 ? (
                'Fill Required Fields First'
              ) : (
                'Generate & Apply'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JDModal; 