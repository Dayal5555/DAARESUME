'use client';

import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  summary: string;
  roleApplyingFor: string;
  website: string;
}

interface FieldErrors {
  [key: string]: string;
}

interface PersonalInfoProps {
  onComplete?: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ onComplete }) => {
  const { state, updatePersonalInfo } = useResume();
  const [formData, setFormData] = useState<FormData>(state.personalInfo);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Updated required fields - only Name, Role, Email, City, and About Me
  const requiredFields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'roleApplyingFor', label: 'Role Applying For' },
    { key: 'email', label: 'Email' },
    { key: 'city', label: 'City' },
    { key: 'summary', label: 'About Me' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newFieldErrors: FieldErrors = {};
    let isValid = true;
    
    requiredFields.forEach(field => {
      const value = formData[field.key as keyof FormData];
      if (!value || value.trim() === '') {
        newFieldErrors[field.key] = `${field.label} is required`;
        isValid = false;
      }
    });

    setFieldErrors(newFieldErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      // All validations passed, save the data
      updatePersonalInfo(formData);
      setFieldErrors({});
      
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#101418] tracking-light text-[32px] font-bold leading-tight">Personal Information</p>
          <p className="text-[#5c728a] text-sm font-normal leading-normal">Fill in your personal details</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                fieldErrors.firstName ? 'border-red-500 ring-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                fieldErrors.lastName ? 'border-red-500 ring-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Role Applying For *
            </label>
            <input
              type="text"
              name="roleApplyingFor"
              value={formData.roleApplyingFor}
              onChange={(e) => handleInputChange('roleApplyingFor', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                fieldErrors.roleApplyingFor ? 'border-red-500 ring-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Software Engineer, Graphic Designer"
              required
            />
            {fieldErrors.roleApplyingFor && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.roleApplyingFor}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                fieldErrors.email ? 'border-red-500 ring-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                fieldErrors.city ? 'border-red-500 ring-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.city && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            About Me *
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              fieldErrors.summary ? 'border-red-500 ring-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Tell us about yourself..."
            required
          />
          {fieldErrors.summary && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.summary}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save & Continue to Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo; 