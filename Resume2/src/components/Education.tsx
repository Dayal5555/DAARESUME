'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';

interface EducationForm {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  description: string;
}

interface EducationProps {
  onComplete?: () => void;
  onBack?: () => void;
}

const Education: React.FC<EducationProps> = ({ onComplete, onBack }) => {
  const { state, addEducation, deleteEducation } = useResume();
  const { education } = state;
  
  const [currentEducation, setCurrentEducation] = useState<EducationForm>({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: ''
  });

  const [pendingEducation, setPendingEducation] = useState<Array<EducationForm & { id: string }>>([]);
  const [dateErrors, setDateErrors] = useState<{ startDate?: string; endDate?: string }>({});

  // Date format validation function
  const validateDateFormat = (date: string): boolean => {
    if (!date) return true; // Allow empty dates
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    return dateRegex.test(date);
  };

  const handleInputChange = (field: keyof EducationForm, value: string | boolean) => {
    setCurrentEducation(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear date errors when user starts typing
    if (field === 'startDate' || field === 'endDate') {
      setDateErrors(prev => ({
        ...prev,
        [field]: undefined
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

    setCurrentEducation(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Validate date format only if user has entered something
    if (formattedValue && formattedValue.length >= 7) {
      const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(formattedValue)) {
        setDateErrors(prev => ({
          ...prev,
          [field]: 'Please use MM/YYYY format (e.g., 01/2024)'
        }));
      } else {
        setDateErrors(prev => ({
          ...prev,
          [field]: undefined
        }));
      }
    } else {
      // Clear error if user is still typing
      setDateErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleAddEducation = () => {
    // Validate required fields
    if (!currentEducation.institution || !currentEducation.degree) {
      alert('Please fill in Institution Name and Degree');
      return;
    }

    // Validate date formats
    if (currentEducation.startDate && !validateDateFormat(currentEducation.startDate)) {
      setDateErrors(prev => ({
        ...prev,
        startDate: 'Please use MM/YYYY format (e.g., 01/2024)'
      }));
      return;
    }

    if (currentEducation.endDate && !validateDateFormat(currentEducation.endDate)) {
      setDateErrors(prev => ({
        ...prev,
        endDate: 'Please use MM/YYYY format (e.g., 01/2024)'
      }));
      return;
    }

    const newEducation = {
      ...currentEducation,
      id: Date.now().toString()
    };

    setPendingEducation(prev => [...prev, newEducation]);
    setCurrentEducation({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: ''
    });
    setDateErrors({});
  };

  const handleDeletePendingEducation = (id: string) => {
    setPendingEducation(prev => prev.filter(edu => edu.id !== id));
  };

  const handleSave = () => {
    // Check if user has added at least one education entry
    if (pendingEducation.length === 0 && education.length === 0) {
      alert('Please add at least one education entry before continuing.');
      return;
    }

    // Save all pending education to context
    pendingEducation.forEach(edu => {
      addEducation({
        institution: edu.institution,
        degree: edu.degree,
        field: edu.field,
        location: edu.location,
        startDate: edu.startDate,
        endDate: edu.endDate,
        current: edu.current,
        gpa: edu.gpa,
        description: edu.description
      });
    });

    setPendingEducation([]);
    alert('Education saved successfully!');

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#101418] tracking-light text-[32px] font-bold leading-tight">Education</p>
          <p className="text-[#5c728a] text-sm font-normal leading-normal">Add your educational background</p>
        </div>
      </div>
      
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#101418] text-base font-medium leading-normal pb-2">Institution Name *</p>
          <input
            placeholder="Enter institution name"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7297] p-[15px] text-base font-normal leading-normal"
            value={currentEducation.institution}
            onChange={(e) => handleInputChange('institution', e.target.value)}
          />
        </label>
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#101418] text-base font-medium leading-normal pb-2">Degree *</p>
          <input
            placeholder="Enter your degree"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7297] p-[15px] text-base font-normal leading-normal"
            value={currentEducation.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
          />
        </label>
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#101418] text-base font-medium leading-normal pb-2">Field of Study</p>
          <input
            placeholder="Enter field of study"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7297] p-[15px] text-base font-normal leading-normal"
            value={currentEducation.field}
            onChange={(e) => handleInputChange('field', e.target.value)}
          />
        </label>
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#101418] text-base font-medium leading-normal pb-2">Location</p>
          <input
            placeholder="Enter location"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7297] p-[15px] text-base font-normal leading-normal"
            value={currentEducation.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </label>
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#101418] text-base font-medium leading-normal pb-2">Start Date</p>
          <input
            placeholder="MM/YYYY"
            className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7297] p-[15px] text-base font-normal leading-normal ${
              dateErrors.startDate ? 'border-red-500' : 'border-[#d0dbe7]'
            }`}
            value={currentEducation.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            maxLength={7}
          />
          {dateErrors.startDate && (
            <p className="text-red-500 text-sm mt-1">{dateErrors.startDate}</p>
          )}
        </label>
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#101418] text-base font-medium leading-normal pb-2">End Date</p>
          <input
            placeholder="MM/YYYY"
            className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7297] p-[15px] text-base font-normal leading-normal ${
              dateErrors.endDate ? 'border-red-500' : 'border-[#d0dbe7]'
            }`}
            value={currentEducation.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            disabled={currentEducation.current}
            maxLength={7}
          />
          {dateErrors.endDate && (
            <p className="text-red-500 text-sm mt-1">{dateErrors.endDate}</p>
          )}
        </label>
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#101418] text-base font-medium leading-normal pb-2">GPA</p>
          <input
            placeholder="Enter GPA (optional)"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7297] p-[15px] text-base font-normal leading-normal"
            value={currentEducation.gpa}
            onChange={(e) => handleInputChange('gpa', e.target.value)}
          />
        </label>
      </div>

      <div className="px-4">
        <label className="flex gap-x-3 py-3 flex-row">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-[#d0dbe7] border-2 bg-transparent text-[#197ce5] checked:bg-[#197ce5] checked:border-[#197ce5] focus:ring-0 focus:ring-offset-0 focus:border-[#d0dbe7] focus:outline-none"
            checked={currentEducation.current}
            onChange={(e) => handleInputChange('current', e.target.checked)}
          />
          <p className="text-[#101418] text-base font-normal leading-normal">Currently Studying Here</p>
        </label>
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#101418] text-base font-medium leading-normal pb-2">Description</p>
          <textarea
            placeholder="Describe your education, achievements, or relevant coursework"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] min-h-32 placeholder:text-[#4e7297] p-[15px] text-base font-normal leading-normal"
            value={currentEducation.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </label>
      </div>

      <div className="flex px-4 py-3 justify-start">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7edf3] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={handleAddEducation}
        >
          <span className="truncate">Add Education</span>
        </button>
      </div>

      {/* Display pending education items */}
      {pendingEducation.length > 0 && (
        <div className="px-4 py-3">
          <h3 className="text-[#101418] text-lg font-bold mb-4">Pending Education</h3>
          <div className="space-y-4">
            {pendingEducation.map((edu) => (
              <div key={edu.id} className="border border-[#d0dbe7] rounded-xl p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#101418]">{edu.degree}</h4>
                    <p className="text-[#4e7297]">{edu.institution}</p>
                    <p className="text-sm text-[#4e7297]">{edu.field}</p>
                    <p className="text-sm text-[#4e7297]">{edu.location}</p>
                    <p className="text-sm text-[#4e7297]">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-[#4e7297]">GPA: {edu.gpa}</p>
                    )}
                    {edu.description && (
                      <p className="text-[#101418] mt-2">{edu.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeletePendingEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display saved education items */}
      {education.length > 0 && (
        <div className="px-4 py-3">
          <h3 className="text-[#101418] text-lg font-bold mb-4">Saved Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border border-[#d0dbe7] rounded-xl p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#101418]">{edu.degree}</h4>
                    <p className="text-[#4e7297]">{edu.institution}</p>
                    <p className="text-sm text-[#4e7297]">{edu.field}</p>
                    <p className="text-sm text-[#4e7297]">{edu.location}</p>
                    <p className="text-sm text-[#4e7297]">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-[#4e7297]">GPA: {edu.gpa}</p>
                    )}
                    {edu.description && (
                      <p className="text-[#101418] mt-2">{edu.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex px-4 py-3 justify-between">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-gray-300 text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={onBack}
        >
          <span className="truncate">Back to Experience</span>
        </button>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#b2cbe5] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={handleSave}
        >
          <span className="truncate">Save & Continue to Skills</span>
        </button>
      </div>
    </div>
  );
};

export default Education; 