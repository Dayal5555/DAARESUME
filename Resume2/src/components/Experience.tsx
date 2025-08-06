'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';

interface ExperienceForm {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceProps {
  onComplete?: () => void;
  onBack?: () => void;
}

const Experience: React.FC<ExperienceProps> = ({ onComplete, onBack }) => {
  const {
    state,
    addExperience,
    deleteExperience,
    updateExperience,
    setFresher,
  } = useResume();
  const { experience } = state;

  const [currentExperience, setCurrentExperience] = useState<ExperienceForm>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const [isFresher, setIsFresher] = useState<boolean>(state.isFresher);
  const [pendingExperiences, setPendingExperiences] = useState<
    Array<ExperienceForm & { id: string }>
  >([]);
  const [dateErrors, setDateErrors] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  // Enhanced date format validation function
  const validateDateFormat = (date: string): boolean => {
    if (!date) return true; // Allow empty dates
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(date)) return false;

    // Extract month and year
    const [month, year] = date.split('/');
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Check if month is valid (1-12)
    if (monthNum < 1 || monthNum > 12) {
      return false;
    }

    // Check if year is reasonable (1900-2100)
    if (yearNum < 1900 || yearNum > 2100) {
      return false;
    }

    return true;
  };

  const handleInputChange = (
    field: keyof ExperienceForm,
    value: string | boolean
  ) => {
    setCurrentExperience(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear date errors when user starts typing
    if (field === 'startDate' || field === 'endDate') {
      setDateErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    // Only allow numbers and forward slash
    const sanitizedValue = value.replace(/[^0-9/]/g, '');

    // Auto-format as MM/YYYY
    let formattedValue = sanitizedValue;

    // Add slash after 2 digits if not already present
    if (sanitizedValue.length === 2 && !sanitizedValue.includes('/')) {
      formattedValue = sanitizedValue + '/';
    }

    // Limit to MM/YYYY format (7 characters max)
    if (formattedValue.length > 7) {
      formattedValue = formattedValue.substring(0, 7);
    }

    setCurrentExperience(prev => ({
      ...prev,
      [field]: formattedValue,
    }));

    // Validate date format only if user has entered something
    if (formattedValue && formattedValue.length >= 7) {
      if (!validateDateFormat(formattedValue)) {
        setDateErrors(prev => ({
          ...prev,
          [field]:
            'Please use MM/YYYY format (e.g., 01/2024). Month must be 01-12.',
        }));
      } else {
        setDateErrors(prev => ({
          ...prev,
          [field]: undefined,
        }));
      }
    } else {
      // Clear error if user is still typing
      setDateErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFresherChange = (checked: boolean) => {
    setIsFresher(checked);
    setFresher(checked);
    if (checked) {
      // Clear all experiences when user is a fresher
      setPendingExperiences([]);
      setCurrentExperience({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      });
    }
  };

  const handleAddExperience = () => {
    // Validate required fields
    if (!currentExperience.company || !currentExperience.position) {
      alert('Please fill in Company Name and Position');
      return;
    }

    // Validate date formats
    if (
      currentExperience.startDate &&
      !validateDateFormat(currentExperience.startDate)
    ) {
      setDateErrors(prev => ({
        ...prev,
        startDate:
          'Please use MM/YYYY format (e.g., 01/2024). Month must be 01-12.',
      }));
      return;
    }

    if (
      currentExperience.endDate &&
      !validateDateFormat(currentExperience.endDate)
    ) {
      setDateErrors(prev => ({
        ...prev,
        endDate:
          'Please use MM/YYYY format (e.g., 01/2024). Month must be 01-12.',
      }));
      return;
    }

    const newExperience = {
      ...currentExperience,
      id: Date.now().toString(),
    };

    setPendingExperiences(prev => [...prev, newExperience]);
    setCurrentExperience({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setDateErrors({});
  };

  const handleDeletePendingExperience = (id: string) => {
    setPendingExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const handleSave = () => {
    if (isFresher) {
      // Save fresher status to context
      alert('Fresher status saved successfully!');

      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Check if user has added at least one experience
    if (pendingExperiences.length === 0 && experience.length === 0) {
      alert('Please add at least one work experience before continuing.');
      return;
    }

    // Save all pending experiences to context
    pendingExperiences.forEach(exp => {
      addExperience({
        company: exp.company,
        position: exp.position,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current,
        description: exp.description,
      });
    });

    setPendingExperiences([]);
    alert('Experience saved successfully!');

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
      <div className='flex flex-wrap justify-between gap-3 p-4'>
        <div className='flex min-w-72 flex-col gap-3'>
          <p className='text-[#101418] tracking-light text-[32px] font-bold leading-tight'>
            Work Experience
          </p>
          <p className='text-[#5c728a] text-sm font-normal leading-normal'>
            Add your work experience
          </p>
        </div>
      </div>

      {/* Display saved experiences at the top */}
      {experience.length > 0 && !isFresher && (
        <div className='px-4 py-3'>
          <h3 className='text-[#101418] text-lg font-bold mb-4'>
            Saved Experiences
          </h3>
          <div className='space-y-4'>
            {experience.map(exp => (
              <div
                key={exp.id}
                className='border border-[#d4dbe2] rounded-xl p-4 bg-white'
              >
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <h4 className='font-bold text-[#101418]'>{exp.position}</h4>
                    <p className='text-[#5c728a]'>{exp.company}</p>
                    <p className='text-sm text-[#5c728a]'>{exp.location}</p>
                    <p className='text-sm text-[#5c728a]'>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className='text-[#101418] mt-2'>{exp.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className='text-red-500 hover:text-red-700 ml-2'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fresher Checkbox */}
      <div className='px-4 py-3'>
        <label className='flex gap-x-3 py-3 flex-row items-center'>
          <input
            type='checkbox'
            className='h-5 w-5 rounded border-[#d4dbe2] border-2 bg-transparent text-[#b2cbe5] checked:bg-[#b2cbe5] checked:border-[#b2cbe5] focus:ring-0 focus:ring-offset-0 focus:border-[#d4dbe2] focus:outline-none'
            checked={isFresher}
            onChange={e => handleFresherChange(e.target.checked)}
          />
          <p className='text-[#101418] text-base font-normal leading-normal'>
            I am a fresher
          </p>
        </label>
      </div>

      {/* Experience Form - Hidden if fresher */}
      {!isFresher && (
        <>
          <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
            <label className='flex flex-col min-w-40 flex-1'>
              <p className='text-[#101418] text-base font-medium leading-normal pb-2'>
                Company Name *
              </p>
              <input
                placeholder='Enter company name'
                className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] h-14 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal'
                value={currentExperience.company}
                onChange={e => handleInputChange('company', e.target.value)}
              />
            </label>
          </div>

          <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
            <label className='flex flex-col min-w-40 flex-1'>
              <p className='text-[#101418] text-base font-medium leading-normal pb-2'>
                Position *
              </p>
              <input
                placeholder='Enter your position'
                className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] h-14 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal'
                value={currentExperience.position}
                onChange={e => handleInputChange('position', e.target.value)}
              />
            </label>
          </div>

          <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
            <label className='flex flex-col min-w-40 flex-1'>
              <p className='text-[#101418] text-base font-medium leading-normal pb-2'>
                Location
              </p>
              <input
                placeholder='Enter location'
                className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] h-14 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal'
                value={currentExperience.location}
                onChange={e => handleInputChange('location', e.target.value)}
              />
            </label>
          </div>

          <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
            <label className='flex flex-col min-w-40 flex-1'>
              <p className='text-[#101418] text-base font-medium leading-normal pb-2'>
                Start Date
              </p>
              <input
                placeholder='MM/YYYY'
                className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border bg-gray-50 focus:border-[#d4dbe2] h-14 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal ${
                  dateErrors.startDate ? 'border-red-500' : 'border-[#d4dbe2]'
                }`}
                value={currentExperience.startDate}
                onChange={e => handleDateChange('startDate', e.target.value)}
                maxLength={7}
              />
              {dateErrors.startDate && (
                <p className='text-red-500 text-sm mt-1'>
                  {dateErrors.startDate}
                </p>
              )}
            </label>
            <label className='flex flex-col min-w-40 flex-1'>
              <p className='text-[#101418] text-base font-medium leading-normal pb-2'>
                End Date
              </p>
              <input
                placeholder='MM/YYYY'
                className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border bg-gray-50 focus:border-[#d4dbe2] h-14 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal ${
                  dateErrors.endDate ? 'border-red-500' : 'border-[#d4dbe2]'
                }`}
                value={currentExperience.endDate}
                onChange={e => handleDateChange('endDate', e.target.value)}
                disabled={currentExperience.current}
                maxLength={7}
              />
              {dateErrors.endDate && (
                <p className='text-red-500 text-sm mt-1'>
                  {dateErrors.endDate}
                </p>
              )}
            </label>
          </div>

          <div className='px-4'>
            <label className='flex gap-x-3 py-3 flex-row'>
              <input
                type='checkbox'
                className='h-5 w-5 rounded border-[#d4dbe2] border-2 bg-transparent text-[#b2cbe5] checked:bg-[#b2cbe5] checked:border-[#b2cbe5] focus:ring-0 focus:ring-offset-0 focus:border-[#d4dbe2] focus:outline-none'
                checked={currentExperience.current}
                onChange={e => handleInputChange('current', e.target.checked)}
              />
              <p className='text-[#101418] text-base font-normal leading-normal'>
                Currently Working Here
              </p>
            </label>
          </div>

          <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
            <label className='flex flex-col min-w-40 flex-1'>
              <p className='text-[#101418] text-base font-medium leading-normal pb-2'>
                Job Description
              </p>
              <textarea
                placeholder='Describe your responsibilities and achievements'
                className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] min-h-36 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal'
                value={currentExperience.description}
                onChange={e => handleInputChange('description', e.target.value)}
              />
            </label>
          </div>

          <div className='flex px-4 py-3 justify-start'>
            <button
              className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#eaedf1] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'
              onClick={handleAddExperience}
            >
              <span className='truncate'>Add One More Employment</span>
            </button>
          </div>

          {/* Display pending experiences */}
          {pendingExperiences.length > 0 && (
            <div className='px-4 py-3'>
              <h3 className='text-[#101418] text-lg font-bold mb-4'>
                Pending Experiences
              </h3>
              <div className='space-y-4'>
                {pendingExperiences.map(exp => (
                  <div
                    key={exp.id}
                    className='border border-[#d4dbe2] rounded-xl p-4 bg-white'
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <h4 className='font-bold text-[#101418]'>
                          {exp.position}
                        </h4>
                        <p className='text-[#5c728a]'>{exp.company}</p>
                        <p className='text-sm text-[#5c728a]'>{exp.location}</p>
                        <p className='text-sm text-[#5c728a]'>
                          {exp.startDate} -{' '}
                          {exp.current ? 'Present' : exp.endDate}
                        </p>
                        {exp.description && (
                          <p className='text-[#101418] mt-2'>
                            {exp.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeletePendingExperience(exp.id)}
                        className='text-red-500 hover:text-red-700 ml-2'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className='flex px-4 py-3 justify-between'>
        <button
          className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-gray-300 text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'
          onClick={onBack}
        >
          <span className='truncate'>Back to Personal Info</span>
        </button>
        <button
          className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#b2cbe5] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'
          onClick={handleSave}
        >
          <span className='truncate'>Continue to Education</span>
        </button>
      </div>
    </div>
  );
};

export default Experience;
