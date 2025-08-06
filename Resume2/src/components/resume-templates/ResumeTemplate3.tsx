'use client';

import React, { useState, useEffect } from 'react';
import { useResume, Experience, Education, Skill } from '../../context/ResumeContext';

interface ResumeTemplate3Props {
  useSampleData?: boolean;
  isEditable?: boolean;
}

const ResumeTemplate3: React.FC<ResumeTemplate3Props> = ({ useSampleData = false, isEditable = false }) => {
  const { state, dispatch } = useResume();
  const { personalInfo, experience, education, skills } = state;
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [editingSummary, setEditingSummary] = useState(false);
  const [summaryValue, setSummaryValue] = useState('');
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [skillValue, setSkillValue] = useState('');
  const [editingExperience, setEditingExperience] = useState<string | null>(null);
  const [experienceValue, setExperienceValue] = useState('');
  const [editingEducation, setEditingEducation] = useState<string | null>(null);
  const [educationValue, setEducationValue] = useState('');
  const [editingRole, setEditingRole] = useState(false);
  const [roleValue, setRoleValue] = useState('');
  const [editingContact, setEditingContact] = useState(false);
  const [contactValue, setContactValue] = useState('');
  const [editingExperienceTitle, setEditingExperienceTitle] = useState<string | null>(null);
  const [experienceTitleValue, setExperienceTitleValue] = useState('');
  const [editingExperienceCompany, setEditingExperienceCompany] = useState<string | null>(null);
  const [experienceCompanyValue, setExperienceCompanyValue] = useState('');
  const [editingExperienceDates, setEditingExperienceDates] = useState<string | null>(null);
  const [experienceDatesValue, setExperienceDatesValue] = useState('');
  const [editingEducationDegree, setEditingEducationDegree] = useState<string | null>(null);
  const [educationDegreeValue, setEducationDegreeValue] = useState('');
  const [editingEducationDates, setEditingEducationDates] = useState<string | null>(null);
  const [educationDatesValue, setEducationDatesValue] = useState('');
  const [editingEducationInstitution, setEditingEducationInstitution] = useState<string | null>(null);
  const [educationInstitutionValue, setEducationInstitutionValue] = useState('');
  const [editingEducationDescription, setEditingEducationDescription] = useState<string | null>(null);
  const [educationDescriptionValue, setEducationDescriptionValue] = useState('');

  // Add skill functionality
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillValue, setNewSkillValue] = useState('');
  
  // Individual contact field editing states
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [editingWebsite, setEditingWebsite] = useState(false);
  const [websiteValue, setWebsiteValue] = useState('');

  console.log('ResumeTemplate3 rendering with data:', { 
    personalInfo, 
    experience, 
    education, 
    skills,
    useSampleData,
    isEditable
  });

  // Wait for data to be loaded from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 200); // Increased delay to ensure localStorage data is fully loaded
    
    return () => clearTimeout(timer);
  }, []);

  // Sample data to show when user hasn't entered any data
  const sampleData = {
    personalInfo: {
      firstName: 'ESTELLE',
      lastName: 'DARCY',
      email: 'hello@reallygreatsite.com',
      phone: '+1 (555) 123-4567',
      address: '123 Anywhere St.',
      city: 'Any City',
      state: 'NY',
      zipCode: '10001',
      summary: 'Experienced Process Engineer with expertise in automation systems, manufacturing processes, and preventive maintenance strategies. Proven track record of increasing operational efficiency and reducing costs.',
      roleApplyingFor: 'PROCESS ENGINEER',
      website: 'www.reallygreatsite.com',
    },
    experience: [
      {
        id: 'sample-1',
        company: 'Company1',
        position: 'Instrument Tech',
        location: 'San Francisco, CA',
        startDate: 'Jan 2024',
        endDate: 'Present',
        current: true,
        description: 'Led development of an advanced automation system, achieving a 15% increase in operational efficiency. Streamlined manufacturing processes, reducing production costs by 10%. Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime.',
      },
      {
        id: 'sample-2',
        company: 'Company2',
        position: 'Internship',
        location: 'Austin, TX',
        startDate: 'Jun 2022',
        endDate: 'Aug 2022',
        current: false,
        description: 'Designed and optimised a robotic control system, realizing a 12% performance improvement. Coordinated testing and validation, ensuring compliance with industry standards. Provided technical expertise, contributing to a 15% reduction in system failures.',
      }
    ],
    education: [
      {
        id: 'sample-3',
        institution: 'Engineering University',
        degree: 'Bachelor of Design in Process Engineering',
        field: 'Process Engineering',
        location: 'Boston, MA',
        startDate: 'Sep 2019',
        endDate: 'Sep 2023',
        current: false,
        gpa: '3.8',
        description: 'Relevant coursework in Process Design and Project Management.',
      }
    ],
    skills: [
      { id: 'sample-4', name: 'Prototyping Tools', level: 'Expert' },
      { id: 'sample-5', name: 'User Research', level: 'Advanced' },
      { id: 'sample-6', name: 'Interaction Design', level: 'Advanced' },
      { id: 'sample-7', name: 'Visual Design', level: 'Intermediate' },
      { id: 'sample-8', name: 'Accessibility', level: 'Intermediate' },
      { id: 'sample-9', name: 'Responsive Design', level: 'Advanced' }
    ]
  };

  // Check if user has any meaningful data (not just empty strings)
  const hasUserData = (personalInfo.firstName && personalInfo.firstName.trim() !== '') || 
                     (personalInfo.lastName && personalInfo.lastName.trim() !== '') ||
                     (personalInfo.email && personalInfo.email.trim() !== '') || 
                     (personalInfo.summary && personalInfo.summary.trim() !== '') ||
                     experience.length > 0 || education.length > 0 || skills.length > 0;
  
  // For template page (useSampleData=true): Always use sample data
  // For builder page (isEditable=true): Use user data if exists, otherwise show placeholders
  const finalDisplayData = useSampleData ? sampleData : 
                          (hasUserData ? { personalInfo, experience, education, skills } : { personalInfo: { firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', summary: '', roleApplyingFor: '', website: '' }, experience: [], education: [], skills: [] });

  console.log('ResumeTemplate3 - finalDisplayData:', {
    hasUserData,
    useSampleData,
    isEditable,
    experienceLength: finalDisplayData.experience.length,
    experience: finalDisplayData.experience
  });

  // Don't render until data is loaded to prevent flash of sample data
  if (!isDataLoaded) {
    return (
      <div id="resume-content" className="resume-template h-full w-full flex flex-col font-poppins">
        <div className="h-full w-full bg-[#fefffc] flex flex-col p-4">
          <div className="flex-1 p-2 flex items-center justify-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Split skills into professional and technical (for demo purposes)
  const professionalSkills = finalDisplayData.skills.slice(0, Math.ceil(finalDisplayData.skills.length / 2));
  const technicalSkills = finalDisplayData.skills.slice(Math.ceil(finalDisplayData.skills.length / 2));

  const handleNameClick = () => {
    if (isEditable) {
      // Clear all other editing states
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingName(true);
      setNameValue(`${finalDisplayData.personalInfo.firstName} ${finalDisplayData.personalInfo.lastName}`);
    }
  };

  const handleNameSave = () => {
    if (isEditable && !useSampleData) {
      const nameParts = nameValue.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { 
          ...personalInfo, // Keep all existing personal info
          firstName, 
          lastName 
        }
      });
    }
    // Add a small delay to prevent interference with new editing
    setTimeout(() => setEditingName(false), 50);
  };

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      setEditingName(false);
    }
  };

  const handleSummaryClick = () => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingSummary(true);
      setSummaryValue(finalDisplayData.personalInfo.summary || '');
      // Set the height after a brief delay to ensure the textarea is rendered
      setTimeout(() => {
        const textarea = document.querySelector('textarea[placeholder*="Briefly explain"]') as HTMLTextAreaElement;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      }, 10);
    }
  };

  const handleSummarySave = () => {
    if (isEditable && !useSampleData) {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { 
          ...personalInfo, // Keep all existing personal info
          summary: summaryValue
        }
      });
    }
    // Add a small delay to prevent interference with new editing
    setTimeout(() => setEditingSummary(false), 50);
  };

  const handleSummaryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSummarySave();
    } else if (e.key === 'Escape') {
      setEditingSummary(false);
    }
  };

  const handleSkillClick = (skill: Skill) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingSkill(skill.id);
      setSkillValue(skill.name);
    }
  };

  const handleSkillSave = () => {
    if (isEditable && !useSampleData && editingSkill) {
      if (skillValue.trim() === '') {
        // Delete the skill if text is empty
        dispatch({
          type: 'DELETE_SKILL',
          payload: editingSkill
        });
      } else {
        // Update the skill if text is not empty
        dispatch({
          type: 'UPDATE_SKILL',
          payload: { id: editingSkill, data: { name: skillValue.trim() } }
        });
      }
    }
    setTimeout(() => setEditingSkill(null), 50);
  };

  const handleSkillDelete = (skillId: string) => {
    if (isEditable && !useSampleData) {
      dispatch({
        type: 'DELETE_SKILL',
        payload: skillId
      });
    }
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSkillSave();
    } else if (e.key === 'Escape') {
      setEditingSkill(null);
    }
  };

  const handleAddSkillClick = () => {
    setIsAddingSkill(true);
    setNewSkillValue('');
  };

  const handleAddSkillSave = () => {
    if (newSkillValue.trim()) {
      dispatch({
        type: 'ADD_SKILL',
        payload: {
          id: Date.now().toString(), // Generate a temporary ID
          name: newSkillValue.trim(),
          level: 'Advanced'
        }
      });
    }
    setIsAddingSkill(false);
    setNewSkillValue('');
  };

  const handleAddSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkillSave();
    } else if (e.key === 'Escape') {
      setIsAddingSkill(false);
      setNewSkillValue('');
    }
  };

  const handleExperienceClick = (exp: Experience) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingExperience(exp.id);
      setExperienceValue(exp.description);
    }
  };

  const handleExperienceSave = () => {
    if (isEditable && !useSampleData && editingExperience) {
      dispatch({
        type: 'UPDATE_EXPERIENCE',
        payload: { id: editingExperience, data: { description: experienceValue } }
      });
    }
    setTimeout(() => setEditingExperience(null), 50);
  };

  const handleExperienceKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExperienceSave();
    } else if (e.key === 'Escape') {
      setEditingExperience(null);
    }
  };

  const handleEducationClick = (edu: Education) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingEducation(edu.id);
      setEducationValue(edu.description || '');
    }
  };

  const handleEducationSave = () => {
    if (isEditable && !useSampleData && editingEducation) {
      dispatch({
        type: 'UPDATE_EDUCATION',
        payload: { id: editingEducation, data: { description: educationValue } }
      });
    }
    setTimeout(() => setEditingEducation(null), 50);
  };

  const handleEducationKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEducationSave();
    } else if (e.key === 'Escape') {
      setEditingEducation(null);
    }
  };

  // Role editing handlers
  const handleRoleClick = () => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingContact(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingRole(true);
      setRoleValue(finalDisplayData.personalInfo.roleApplyingFor || '');
    }
  };

  const handleRoleSave = () => {
    if (isEditable && !useSampleData) {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { 
          ...personalInfo,
          roleApplyingFor: roleValue
        }
      });
    }
    setTimeout(() => setEditingRole(false), 50);
  };

  const handleRoleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRoleSave();
    } else if (e.key === 'Escape') {
      setEditingRole(false);
    }
  };

  // Contact info editing handlers
  const handleContactClick = () => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingContact(true);
      setContactValue(`${finalDisplayData.personalInfo.address}, ${finalDisplayData.personalInfo.city} | ${finalDisplayData.personalInfo.email} | ${finalDisplayData.personalInfo.website}`);
    }
  };

  const handleContactSave = () => {
    if (isEditable && !useSampleData) {
      // Parse the contact string back into individual fields
      const parts = contactValue.split(' | ');
      const addressCity = parts[0] || '';
      const email = parts[1] || '';
      const website = parts[2] || '';
      
      const [address, city] = addressCity.split(', ');
      
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { 
          ...personalInfo,
          address: address || '',
          city: city || '',
          email: email,
          website: website
        }
      });
    }
    setTimeout(() => setEditingContact(false), 50);
  };

  const handleContactKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContactSave();
    } else if (e.key === 'Escape') {
      setEditingContact(false);
    }
  };

  // Address editing handlers
  const handleAddressClick = () => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingEmail(false);
      setEditingWebsite(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingAddress(true);
      setAddressValue(finalDisplayData.personalInfo.city || '');
    }
  };

  const handleAddressSave = () => {
    if (isEditable && !useSampleData) {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { 
          ...personalInfo,
          city: addressValue
        }
      });
    }
    setTimeout(() => setEditingAddress(false), 50);
  };

  const handleAddressKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddressSave();
    } else if (e.key === 'Escape') {
      setEditingAddress(false);
    }
  };

  // Email editing handlers
  const handleEmailClick = () => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingAddress(false);
      setEditingWebsite(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingEmail(true);
      setEmailValue(finalDisplayData.personalInfo.email || '');
    }
  };

  const handleEmailSave = () => {
    if (isEditable && !useSampleData) {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { 
          ...personalInfo,
          email: emailValue
        }
      });
    }
    setTimeout(() => setEditingEmail(false), 50);
  };

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEmailSave();
    } else if (e.key === 'Escape') {
      setEditingEmail(false);
    }
  };

  // Website editing handlers
  const handleWebsiteClick = () => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingAddress(false);
      setEditingEmail(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingWebsite(true);
      setWebsiteValue(finalDisplayData.personalInfo.website || '');
    }
  };

  const handleWebsiteSave = () => {
    if (isEditable && !useSampleData) {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { 
          ...personalInfo,
          website: websiteValue
        }
      });
    }
    setTimeout(() => setEditingWebsite(false), 50);
  };

  const handleWebsiteKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleWebsiteSave();
    } else if (e.key === 'Escape') {
      setEditingWebsite(false);
    }
  };

  // Experience title editing handlers
  const handleExperienceTitleClick = (exp: Experience) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingEmail(false);
      setEditingWebsite(false);
      setEditingAddress(false);
      setEditingExperienceCompany(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingExperienceTitle(exp.id);
      setExperienceTitleValue(exp.position || '');
    }
  };

  const handleExperienceTitleSave = () => {
    if (isEditable && !useSampleData && editingExperienceTitle) {
      dispatch({
        type: 'UPDATE_EXPERIENCE',
        payload: { 
          id: editingExperienceTitle, 
          data: { 
            position: experienceTitleValue
          }
        }
      });
    }
    setTimeout(() => setEditingExperienceTitle(null), 50);
  };

  const handleExperienceTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExperienceTitleSave();
    } else if (e.key === 'Escape') {
      setEditingExperienceTitle(null);
    }
  };

  // Experience dates editing handlers
  const handleExperienceDatesClick = (exp: Experience) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingExperienceTitle(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingExperienceDates(exp.id);
      setExperienceDatesValue(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
    }
  };

  const handleExperienceDatesSave = () => {
    if (isEditable && !useSampleData && editingExperienceDates) {
      const [startDate, endDatePart] = experienceDatesValue.split(' - ');
      const isCurrent = endDatePart === 'Present';
      const endDate = isCurrent ? '' : endDatePart;
      
      dispatch({
        type: 'UPDATE_EXPERIENCE',
        payload: { 
          id: editingExperienceDates, 
          data: { 
            startDate: startDate || '',
            endDate: endDate || '',
            current: isCurrent
          }
        }
      });
    }
    setTimeout(() => setEditingExperienceDates(null), 50);
  };

  const handleExperienceDatesKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExperienceDatesSave();
    } else if (e.key === 'Escape') {
      setEditingExperienceDates(null);
    }
  };

  // Experience company editing handlers
  const handleExperienceCompanyClick = (exp: Experience) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingEmail(false);
      setEditingWebsite(false);
      setEditingAddress(false);
      setEditingExperienceTitle(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingExperienceCompany(exp.id);
      setExperienceCompanyValue(exp.company || '');
    }
  };

  const handleExperienceCompanySave = () => {
    if (isEditable && !useSampleData && editingExperienceCompany) {
      dispatch({
        type: 'UPDATE_EXPERIENCE',
        payload: { 
          id: editingExperienceCompany, 
          data: { company: experienceCompanyValue }
        }
      });
    }
    setTimeout(() => setEditingExperienceCompany(null), 50);
  };

  const handleExperienceCompanyKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExperienceCompanySave();
    } else if (e.key === 'Escape') {
      setEditingExperienceCompany(null);
    }
  };

  // Education degree editing handlers
  const handleEducationDegreeClick = (edu: Education) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingEmail(false);
      setEditingWebsite(false);
      setEditingAddress(false);
      setEditingExperienceTitle(null);
      setEditingExperienceCompany(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingEducationDegree(edu.id);
      setEducationDegreeValue(edu.degree);
    }
  };

  const handleEducationDegreeSave = () => {
    if (isEditable && !useSampleData && editingEducationDegree) {
      dispatch({
        type: 'UPDATE_EDUCATION',
        payload: { 
          id: editingEducationDegree, 
          data: { degree: educationDegreeValue }
        }
      });
    }
    setTimeout(() => setEditingEducationDegree(null), 50);
  };

  const handleEducationDegreeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEducationDegreeSave();
    } else if (e.key === 'Escape') {
      setEditingEducationDegree(null);
    }
  };

  // Education dates editing handlers
  const handleEducationDatesClick = (edu: Education) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingEmail(false);
      setEditingWebsite(false);
      setEditingAddress(false);
      setEditingExperienceTitle(null);
      setEditingExperienceCompany(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingEducationDates(edu.id);
      setEducationDatesValue(`${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`);
    }
  };

  const handleEducationDatesSave = () => {
    if (isEditable && !useSampleData && editingEducationDates) {
      const [startDate, endDatePart] = educationDatesValue.split(' - ');
      const isCurrent = endDatePart === 'Present';
      const endDate = isCurrent ? '' : endDatePart;
      
      dispatch({
        type: 'UPDATE_EDUCATION',
        payload: { 
          id: editingEducationDates, 
          data: { 
            startDate: startDate || '',
            endDate: endDate || '',
            current: isCurrent
          }
        }
      });
    }
    setTimeout(() => setEditingEducationDates(null), 50);
  };

  const handleEducationDatesKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEducationDatesSave();
    } else if (e.key === 'Escape') {
      setEditingEducationDates(null);
    }
  };

  // Education institution editing handlers
  const handleEducationInstitutionClick = (edu: Education) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingEmail(false);
      setEditingWebsite(false);
      setEditingAddress(false);
      setEditingExperienceTitle(null);
      setEditingExperienceCompany(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      setEditingEducationDescription(null);
      
      setEditingEducationInstitution(edu.id);
      setEducationInstitutionValue(edu.institution);
    }
  };

  const handleEducationInstitutionSave = () => {
    if (isEditable && !useSampleData && editingEducationInstitution) {
      dispatch({
        type: 'UPDATE_EDUCATION',
        payload: { 
          id: editingEducationInstitution, 
          data: { institution: educationInstitutionValue }
        }
      });
    }
    setTimeout(() => setEditingEducationInstitution(null), 50);
  };

  const handleEducationInstitutionKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEducationInstitutionSave();
    } else if (e.key === 'Escape') {
      setEditingEducationInstitution(null);
    }
  };

  // Education description editing handlers
  const handleEducationDescriptionClick = (edu: Education) => {
    if (isEditable) {
      // Clear all other editing states
      setEditingName(false);
      setEditingSummary(false);
      setEditingSkill(null);
      setEditingExperience(null);
      setEditingEducation(null);
      setEditingRole(false);
      setEditingContact(false);
      setEditingEmail(false);
      setEditingWebsite(false);
      setEditingAddress(false);
      setEditingExperienceTitle(null);
      setEditingExperienceCompany(null);
      setEditingExperienceDates(null);
      setEditingEducationDegree(null);
      setEditingEducationDates(null);
      setEditingEducationInstitution(null);
      
      setEditingEducationDescription(edu.id);
      setEducationDescriptionValue(edu.description || '');
    }
  };

  const handleEducationDescriptionSave = () => {
    if (isEditable && !useSampleData && editingEducationDescription) {
      dispatch({
        type: 'UPDATE_EDUCATION',
        payload: { 
          id: editingEducationDescription, 
          data: { description: educationDescriptionValue }
        }
      });
    }
    setTimeout(() => setEditingEducationDescription(null), 50);
  };

  const handleEducationDescriptionKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEducationDescriptionSave();
    } else if (e.key === 'Escape') {
      setEditingEducationDescription(null);
    }
  };

  return (
    <div id="resume-content" className={`resume-template h-full w-full flex flex-col font-poppins ${editingName || editingSummary || editingSkill || editingExperience || editingEducation || editingRole || editingContact || editingAddress || editingEmail || editingWebsite || editingExperienceTitle || editingExperienceCompany || editingExperienceDates || editingEducationDegree || editingEducationDates || editingEducationInstitution || editingEducationDescription ? 'bg-gray-300' : ''}`}>
              <div className={`h-full w-full flex flex-col p-4 transition-colors duration-200 ${editingName || editingSummary || editingSkill || editingExperience || editingEducation || editingRole || editingContact || editingAddress || editingEmail || editingWebsite || editingExperienceTitle || editingExperienceCompany || editingExperienceDates || editingEducationDegree || editingEducationDates || editingEducationInstitution || editingEducationDescription ? 'bg-gray-300' : 'bg-[#fefffc]'}`}>
        
        {/* Main Content */}
        <div className="flex-1 p-2">
          {/* Header Section */}
          <header className="text-start mb-3">
            {useSampleData ? (
              // Template version - hard-coded name, non-editable
              <h1 className="text-3xl font-extrabold uppercase text-[#1e1e1e] font-poppins">
                ESTELLE DARCY
              </h1>
            ) : (
              // Editable version
              editingName ? (
              <div className="relative">
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyDown={handleNameKeyPress}
                    className="absolute inset-0 text-3xl font-extrabold uppercase text-[#1e1e1e] font-poppins bg-white outline-none w-full rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1"
                  autoFocus
                />
                  {/* Placeholder layer that shows when input is empty */}
                  {nameValue.trim() === '' && (
                    <h1 className="absolute inset-0 text-3xl font-normal italic normal-case text-gray-400 font-poppins pointer-events-none z-5">
                      Your name
                    </h1>
                  )}
                  {/* Background size reference */}
                <h1 className="text-3xl font-extrabold uppercase text-[#1e1e1e] font-poppins opacity-0">
                    {(finalDisplayData.personalInfo.firstName || finalDisplayData.personalInfo.lastName) ? 
                      `${finalDisplayData.personalInfo.firstName} ${finalDisplayData.personalInfo.lastName}`.trim() : 
                      "Your name"
                    }
                </h1>
              </div>
            ) : (
              <h1 
                className={`text-3xl font-extrabold uppercase text-[#1e1e1e] font-poppins ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                onClick={handleNameClick}
              >
                  {(finalDisplayData.personalInfo.firstName || finalDisplayData.personalInfo.lastName) ? 
                    `${finalDisplayData.personalInfo.firstName} ${finalDisplayData.personalInfo.lastName}`.trim() : 
                    (isEditable ? <span className="text-gray-400 italic font-normal normal-case">Your name</span> : "")
                  }
              </h1>
              )
            )}
            {useSampleData ? (
              // Template version - hard-coded role, non-editable
              <p className="text-lg font-medium not-italic no-underline text-[#1e1e1e] pb-1 font-inter">
                PROCESS ENGINEER
              </p>
            ) : (
              // Editable version
              editingRole ? (
              <div className="relative">
                <input
                  type="text"
                  value={roleValue}
                  onChange={(e) => setRoleValue(e.target.value)}
                  onBlur={handleRoleSave}
                  onKeyDown={handleRoleKeyPress}
                    className="absolute inset-0 text-lg font-medium not-italic no-underline text-[#1e1e1e] pb-1 font-inter bg-white outline-none w-full rounded shadow-lg z-10 focus:ring-0 focus:border-0 placeholder:text-gray-400 placeholder:italic"
                    placeholder="Position"
                  autoFocus
                />
                <p className="text-lg font-medium not-italic no-underline text-[#1e1e1e] pb-1 font-inter opacity-0">
                    {finalDisplayData.personalInfo.roleApplyingFor || "Position"}
                </p>
              </div>
            ) : (
              <p 
                className={`text-lg font-medium not-italic no-underline text-[#1e1e1e] pb-1 font-inter ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                onClick={handleRoleClick}
              >
                  {finalDisplayData.personalInfo.roleApplyingFor || (isEditable ? <span className="text-gray-400 italic">Position</span> : "")}
                </p>
              )
            )}
            {useSampleData ? (
              // Template version - hard-coded, non-editable
              <p className="text-sm font-medium text-gray-600 font-inter space-x-1">
                <span>123 Anywhere St., Any City</span> <span>|</span> <span>hello@reallygreatsite.com</span> <span>|</span> <span>www.reallygreatsite.com</span>
              </p>
            ) : (
              // Editable version with placeholders
              <div className="text-sm font-medium text-gray-600 font-inter space-x-1">
                {/* City Field */}
                {editingAddress ? (
                  <span className="relative inline-block">
                <input
                  type="text"
                      value={addressValue}
                      onChange={(e) => setAddressValue(e.target.value)}
                      onBlur={handleAddressSave}
                      onKeyDown={handleAddressKeyPress}
                      className="text-sm font-medium text-gray-600 font-inter bg-white outline-none rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1 min-w-[120px]"
                      style={{ width: Math.max(120, addressValue.length * 8) }}
                  autoFocus
                />
                    {addressValue.trim() === '' && (
                      <span className="absolute inset-0 text-sm font-medium text-gray-400 font-inter italic pointer-events-none z-5 px-2 py-1">
                        City
                      </span>
                    )}
                  </span>
                ) : (
                  <span 
                    className={`${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                    onClick={handleAddressClick}
                  >
                    {finalDisplayData.personalInfo.city || (isEditable ? <span className="text-gray-400 italic">City</span> : "")}
                  </span>
                )}
                
                <span> | </span>
                
                {/* Email Field */}
                {editingEmail ? (
                  <span className="relative inline-block">
                    <input
                      type="text"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      onBlur={handleEmailSave}
                      onKeyDown={handleEmailKeyPress}
                      className="text-sm font-medium text-gray-600 font-inter bg-white outline-none rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1 min-w-[120px]"
                      style={{ width: Math.max(120, emailValue.length * 8) }}
                      autoFocus
                    />
                    {emailValue.trim() === '' && (
                      <span className="absolute inset-0 text-sm font-medium text-gray-400 font-inter italic pointer-events-none z-5 px-2 py-1">
                        Email
                      </span>
                    )}
                  </span>
                ) : (
                  <span 
                    className={`${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                    onClick={handleEmailClick}
                  >
                    {finalDisplayData.personalInfo.email || (isEditable ? <span className="text-gray-400 italic">Email</span> : "")}
                  </span>
                )}
                
                <span> | </span>
                
                {/* Website/LinkedIn Field */}
                {editingWebsite ? (
                  <span className="relative inline-block">
                    <input
                      type="text"
                      value={websiteValue}
                      onChange={(e) => setWebsiteValue(e.target.value)}
                      onBlur={handleWebsiteSave}
                      onKeyDown={handleWebsiteKeyPress}
                      className="text-sm font-medium text-gray-600 font-inter bg-white outline-none rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1 min-w-[120px]"
                      style={{ width: Math.max(120, websiteValue.length * 8) }}
                      autoFocus
                    />
                    {websiteValue.trim() === '' && (
                      <span className="absolute inset-0 text-sm font-medium text-gray-400 font-inter italic pointer-events-none z-5 px-2 py-1">
                        LinkedIn
                      </span>
                    )}
                  </span>
                ) : (
                  <span 
                    className={`${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                    onClick={handleWebsiteClick}
                  >
                    {finalDisplayData.personalInfo.website || (isEditable ? <span className="text-gray-400 italic">LinkedIn</span> : "")}
                  </span>
                )}
              </div>
            )}
          </header>

          {/* Gold Divider */}
          <hr className="border-t-3 border-[#dfb160] my-2" />

          {/* Summary Section */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase text-[#1e1e1e] tracking-widest mb- font-poppins">
              Summary
            </h2>
            <hr className="border-t-2 border-[#dfb160] w-full mb-3" />
            {editingSummary ? (
              <div className="relative">
                <textarea
                  value={summaryValue}
                  onChange={(e) => setSummaryValue(e.target.value)}
                  onBlur={handleSummarySave}
                  onKeyDown={handleSummaryKeyPress}
                  className="absolute inset-0 text-gray-700 text-justify leading-relaxed text-sm font-inter font-medium w-full border-none outline-none bg-white resize-none focus:ring-0 focus:border-0 z-10 rounded shadow-lg"
                  placeholder="Briefly explain why you are a great fit for the role..."
                  rows={1}
                  style={{ minHeight: '1.5rem', height: 'auto' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                  autoFocus
                />
                <p className="text-gray-700 text-justify leading-relaxed text-sm font-inter font-medium opacity-0">
                  {finalDisplayData.personalInfo.summary || "Briefly explain why you are a great fit for the role..."}
                </p>
              </div>
            ) : (
              <p 
                className={`text-gray-700 text-justify leading-relaxed text-sm font-inter font-medium ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                onClick={handleSummaryClick}
              >
                {finalDisplayData.personalInfo.summary || (isEditable ? <span className="text-gray-400 italic">Briefly explain why you are a great fit for the role...</span> : "")}
              </p>
            )}
          </section>

          {/* Skills Section */}
          {(finalDisplayData.skills.length > 0 || isEditable) && (
            <section className="mb-6">
              <h2 className="text-base font-semibold uppercase text-[#1e1e1e] tracking-widest mb-2 font-poppins">
                Skills
              </h2>
              <hr className="border-t border-[#dfb160] w-full mb-3" />
              <div className="text-gray-700 text-sm font-inter leading-relaxed">
                {finalDisplayData.skills.length > 0 && finalDisplayData.skills.map((skill: Skill, index: number) => (
                  <span key={skill.id}>
                    {editingSkill === skill.id ? (
                      <div className="inline-block relative">
                        <input
                          type="text"
                          value={skillValue}
                          onChange={(e) => setSkillValue(e.target.value)}
                          onBlur={handleSkillSave}
                          onKeyDown={handleSkillKeyPress}
                          className="absolute inset-0 text-gray-700 text-sm font-inter bg-white outline-none rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-1"
                          autoFocus
                        />
                        <span className="text-gray-700 text-sm font-inter opacity-0 px-1">
                          {skill.name}
                        </span>
                      </div>
                    ) : (
                        <span 
                        className={`text-gray-700 text-sm font-inter ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                          onClick={() => handleSkillClick(skill)}
                        >
                          {skill.name}
                        </span>
                    )}
                    {index < finalDisplayData.skills.length - 1 && (
                      <span className="text-gray-700 text-sm font-inter">, </span>
                    )}
                  </span>
                ))}
                
                {/* Add Skill Input */}
                {isAddingSkill && (
                  <span>
                    <div className="inline-block relative">
                      <input
                        type="text"
                        value={newSkillValue}
                        onChange={(e) => setNewSkillValue(e.target.value)}
                        onBlur={handleAddSkillSave}
                        onKeyDown={handleAddSkillKeyPress}
                        className="text-gray-700 text-sm font-inter bg-white outline-none rounded shadow-lg focus:ring-0 focus:border-0 px-1 border border-gray-300"
                        placeholder="Enter skill name"
                        autoFocus
                      />
                    </div>
                    {finalDisplayData.skills.length > 0 && (
                      <span className="text-gray-700 text-sm font-inter">, </span>
                    )}
                  </span>
                )}
                
                {/* Add Skill Button */}
                {isEditable && !isAddingSkill && (
                  <button
                    onClick={handleAddSkillClick}
                    className="inline-flex items-center text-[#22C8A9] hover:text-[#19ac97] text-sm font-inter ml-1"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add skill
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Professional Experience Section */}
          {(finalDisplayData.experience.length > 0 || isEditable) && (
            <section className="mb-6">
              <h2 className="text-base font-semibold uppercase text-[#1e1e1e] tracking-widest mb-2 font-poppins">
                Professional Experience
              </h2>
              <hr className="border-t border-[#dfb160] w-full mb-3" />
              {finalDisplayData.experience.length > 0 ? (
                finalDisplayData.experience.map((exp: Experience, index: number) => (
                <div key={exp.id} className={index < finalDisplayData.experience.length - 1 ? "mb-4" : ""}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                    {editingExperienceTitle === exp.id ? (
                      <div className="relative inline-block">
                        <input
                          type="text"
                          value={experienceTitleValue}
                          onChange={(e) => setExperienceTitleValue(e.target.value)}
                          onBlur={handleExperienceTitleSave}
                          onKeyDown={handleExperienceTitleKeyPress}
                          className="font-bold text-sm text-[#1e1e1e] font-poppins bg-white outline-none rounded shadow-lg focus:ring-0 focus:border-0 px-2 py-1 min-w-[150px]"
                          style={{ width: Math.max(150, experienceTitleValue.length * 8 + 20) }}
                          placeholder="Position Title"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <h3 
                        className={`font-bold text-sm text-[#1e1e1e] font-poppins ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                        onClick={() => handleExperienceTitleClick(exp)}
                      >
                        {exp.position || (isEditable ? <span className="text-gray-400 italic">Position Title</span> : "")}
                      </h3>
                    )}
                  </div>
                  {/* Company Name Field */}
                  {editingExperienceCompany === exp.id ? (
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={experienceCompanyValue}
                        onChange={(e) => setExperienceCompanyValue(e.target.value)}
                        onBlur={handleExperienceCompanySave}
                        onKeyDown={handleExperienceCompanyKeyPress}
                        className="absolute inset-0 text-gray-600 text-sm font-inter bg-white outline-none w-full rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1"
                        placeholder="Company Name"
                        autoFocus
                      />
                      {experienceCompanyValue.trim() === '' && (
                        <p className="absolute inset-0 text-gray-400 italic text-sm font-inter pointer-events-none z-5 px-2 py-1">
                          Company Name
                        </p>
                      )}
                      <p className="text-gray-600 text-sm font-inter opacity-0">
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                  ) : (
                    <p 
                      className={`text-gray-600 text-sm font-inter mb-2 ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                      onClick={() => handleExperienceCompanyClick(exp)}
                    >
                      {exp.company || (isEditable ? <span className="text-gray-400 italic">Company Name</span> : "")}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                    {editingExperienceDates === exp.id ? (
                      <div className="relative">
                        <input
                          type="text"
                          value={experienceDatesValue}
                          onChange={(e) => setExperienceDatesValue(e.target.value)}
                          onBlur={handleExperienceDatesSave}
                          onKeyDown={handleExperienceDatesKeyPress}
                          className="absolute inset-0 font-semibold text-xs text-gray-600 font-inter bg-white outline-none w-full rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1"
                          placeholder="Start Date - End Date"
                          autoFocus
                        />
                        {experienceDatesValue.trim() === '' && (
                          <p className="absolute inset-0 font-semibold text-xs text-gray-400 italic font-inter pointer-events-none z-5 px-2 py-1">
                            Start Date - End Date
                          </p>
                        )}
                        <p className="font-semibold text-xs text-gray-600 font-inter opacity-0">
                          {(exp.startDate || exp.endDate) ? `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` : "Start Date - End Date"}
                        </p>
                      </div>
                    ) : (
                      <p 
                        className={`font-semibold text-xs text-gray-600 font-inter ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                        onClick={() => handleExperienceDatesClick(exp)}
                      >
                        {(exp.startDate || exp.endDate) ? `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` : (isEditable ? <span className="text-gray-400 italic">Start Date - End Date</span> : "")}
                      </p>
                    )}
                  </div>
                  {editingExperience === exp.id ? (
                    <div className="relative">
                      <textarea
                        value={experienceValue}
                        onChange={(e) => setExperienceValue(e.target.value)}
                        onBlur={handleExperienceSave}
                        onKeyDown={handleExperienceKeyPress}
                        className="text-gray-700 text-justify leading-relaxed text-sm font-inter font-medium w-full rounded-md bg-white shadow-lg focus:ring-0 focus:border-0 resize-none px-2 py-1 border border-gray-200"
                        placeholder="Job description and responsibilities..."
                        rows={3}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <p 
                      className={`text-gray-700 text-justify leading-relaxed text-sm font-inter font-medium ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                      onClick={() => handleExperienceClick(exp)}
                    >
                      {exp.description || (isEditable ? <span className="text-gray-400 italic">Job description and responsibilities...</span> : "")}
                    </p>
                  )}
                </div>
              ))
              ) : (
                <div className="text-gray-400 italic text-sm">
                  <div className="mb-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                      <h3 
                        className={`font-bold text-sm text-gray-400 font-poppins italic ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                        onClick={() => {
                          if (isEditable) {
                            // If no experience exists, create one
                            if (finalDisplayData.experience.length === 0) {
                              const newExperience = {
                                id: Date.now().toString(),
                                company: '',
                                position: '',
                                location: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                                description: ''
                              };
                              dispatch({
                                type: 'ADD_EXPERIENCE',
                                payload: newExperience
                              });
                              // Set editing state for position
                              setEditingExperienceTitle(newExperience.id);
                              setExperienceTitleValue('');
                            } else {
                              // Edit the first existing experience
                              const firstExp = finalDisplayData.experience[0];
                              setEditingExperienceTitle(firstExp.id);
                              setExperienceTitleValue(firstExp.position || '');
                            }
                          }
                        }}
                      >
                        Position Title
                      </h3>
                      <p 
                        className={`font-semibold text-xs text-gray-400 font-inter italic ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                        onClick={() => {
                          if (isEditable) {
                            // If no experience exists, create one
                            if (finalDisplayData.experience.length === 0) {
                              const newExperience = {
                                id: Date.now().toString(),
                                company: '',
                                position: '',
                                location: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                                description: ''
                              };
                              dispatch({
                                type: 'ADD_EXPERIENCE',
                                payload: newExperience
                              });
                              // Set editing state for dates
                              setEditingExperienceDates(newExperience.id);
                              setExperienceDatesValue('');
                            } else {
                              // Edit the first existing experience
                              const firstExp = finalDisplayData.experience[0];
                              setEditingExperienceDates(firstExp.id);
                              setExperienceDatesValue(`${firstExp.startDate} - ${firstExp.current ? 'Present' : firstExp.endDate}`);
                            }
                          }
                        }}
                      >
                        Start Date - End Date
                      </p>
                    </div>
                    <p 
                      className={`text-gray-600 text-sm font-inter text-gray-400 italic mb-2 ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                      onClick={() => {
                        if (isEditable) {
                          // If no experience exists, create one
                          if (finalDisplayData.experience.length === 0) {
                            const newExperience = {
                              id: Date.now().toString(),
                              company: '',
                              position: '',
                              location: '',
                              startDate: '',
                              endDate: '',
                              current: false,
                              description: ''
                            };
                            dispatch({
                              type: 'ADD_EXPERIENCE',
                              payload: newExperience
                            });
                            // Set editing state for company
                            setEditingExperienceCompany(newExperience.id);
                            setExperienceCompanyValue('');
                          } else {
                            // Edit the first existing experience
                            const firstExp = finalDisplayData.experience[0];
                            setEditingExperienceCompany(firstExp.id);
                            setExperienceCompanyValue(firstExp.company || '');
                          }
                        }
                      }}
                    >
                      Company Name
                    </p>
                    <p 
                      className={`text-gray-700 text-justify leading-relaxed text-sm font-inter font-medium text-gray-400 italic ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                      onClick={() => {
                        if (isEditable) {
                          // If no experience exists, create one
                          if (finalDisplayData.experience.length === 0) {
                            const newExperience = {
                              id: Date.now().toString(),
                              company: '',
                              position: '',
                              location: '',
                              startDate: '',
                              endDate: '',
                              current: false,
                              description: ''
                            };
                            dispatch({
                              type: 'ADD_EXPERIENCE',
                              payload: newExperience
                            });
                            // Set editing state for description
                            setEditingExperience(newExperience.id);
                            setExperienceValue('');
                          } else {
                            // Edit the first existing experience
                            const firstExp = finalDisplayData.experience[0];
                            setEditingExperience(firstExp.id);
                            setExperienceValue(firstExp.description || '');
                          }
                        }
                      }}
                    >
                      Job description and responsibilities...
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Education Section */}
          {(finalDisplayData.education.length > 0 || isEditable) && (
            <section className="mb-6">
              <h2 className="text-base font-semibold uppercase text-[#1e1e1e] tracking-widest mb-2 font-poppins">
                Education
              </h2>
              <hr className="border-t border-[#dfb160] w-full mb-3" />
              {finalDisplayData.education.length > 0 ? (
                finalDisplayData.education.map((edu: Education, index: number) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                    {editingEducationDegree === edu.id ? (
                      <div className="relative">
                        <input
                          type="text"
                          value={educationDegreeValue}
                          onChange={(e) => setEducationDegreeValue(e.target.value)}
                          onBlur={handleEducationDegreeSave}
                          onKeyDown={handleEducationDegreeKeyPress}
                          className="absolute inset-0 font-bold text-sm text-[#1e1e1e] font-poppins bg-white outline-none w-full rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1"
                          placeholder="Degree and Field of Study"
                          autoFocus
                        />
                        {educationDegreeValue.trim() === '' && (
                          <h3 className="absolute inset-0 font-bold text-sm text-gray-400 italic font-poppins pointer-events-none z-5 px-2 py-1">
                            Degree and Field of Study
                          </h3>
                        )}
                        <h3 className="font-bold text-sm text-[#1e1e1e] font-poppins opacity-0">
                          {edu.degree || "Degree and Field of Study"}
                        </h3>
                      </div>
                    ) : (
                      <h3 
                        className={`font-bold text-sm text-[#1e1e1e] font-poppins ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                        onClick={() => handleEducationDegreeClick(edu)}
                      >
                        {edu.degree || (isEditable ? <span className="text-gray-400 italic">Degree and Field of Study</span> : "")}
                      </h3>
                    )}
                    {editingEducationDates === edu.id ? (
                      <div className="relative">
                        <input
                          type="text"
                          value={educationDatesValue}
                          onChange={(e) => setEducationDatesValue(e.target.value)}
                          onBlur={handleEducationDatesSave}
                          onKeyDown={handleEducationDatesKeyPress}
                          className="absolute inset-0 font-semibold text-xs text-gray-600 font-inter bg-white outline-none w-full rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1"
                          placeholder="Start Date - End Date"
                          autoFocus
                        />
                        {educationDatesValue.trim() === '' && (
                          <p className="absolute inset-0 font-semibold text-xs text-gray-400 italic font-inter pointer-events-none z-5 px-2 py-1">
                            Start Date - End Date
                          </p>
                        )}
                        <p className="font-semibold text-xs text-gray-600 font-inter opacity-0">
                          {(edu.startDate || edu.endDate) ? `${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}` : "Start Date - End Date"}
                        </p>
                      </div>
                    ) : (
                      <p 
                        className={`font-semibold text-xs text-gray-600 font-inter ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                        onClick={() => handleEducationDatesClick(edu)}
                      >
                        {(edu.startDate || edu.endDate) ? `${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}` : (isEditable ? <span className="text-gray-400 italic">Start Date - End Date</span> : "")}
                      </p>
                    )}
                  </div>
                  {editingEducationInstitution === edu.id ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={educationInstitutionValue}
                        onChange={(e) => setEducationInstitutionValue(e.target.value)}
                        onBlur={handleEducationInstitutionSave}
                        onKeyDown={handleEducationInstitutionKeyPress}
                        className="absolute inset-0 text-gray-800 font-medium text-sm font-inter bg-white outline-none w-full rounded shadow-lg z-10 focus:ring-0 focus:border-0 px-2 py-1"
                        placeholder="College and University Name"
                        autoFocus
                      />
                      {educationInstitutionValue.trim() === '' && (
                        <p className="absolute inset-0 text-gray-400 italic font-medium text-sm font-inter pointer-events-none z-5 px-2 py-1">
                          College and University Name
                        </p>
                      )}
                      <p className="text-gray-800 font-medium text-sm font-inter opacity-0">
                        {edu.institution || "College and University Name"}
                      </p>
                    </div>
                  ) : (
                    <p 
                      className={`text-gray-800 font-medium text-sm font-inter ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                      onClick={() => handleEducationInstitutionClick(edu)}
                    >
                      {edu.institution || (isEditable ? <span className="text-gray-400 italic">College and University Name</span> : "")}
                    </p>
                  )}
                  {edu.description && (
                    <div className="mt-2 pl-2">
                      {editingEducationDescription === edu.id ? (
                        <div className="relative">
                          <textarea
                            value={educationDescriptionValue}
                            onChange={(e) => setEducationDescriptionValue(e.target.value)}
                            onBlur={handleEducationDescriptionSave}
                            onKeyDown={handleEducationDescriptionKeyPress}
                            className="text-gray-700 text-sm font-inter bg-white outline-none w-full rounded shadow-lg focus:ring-0 focus:border-0 resize-none px-2 py-1 border border-gray-200"
                            placeholder="Education description..."
                            rows={2}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm font-inter">
                          <li 
                            className={`${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                            onClick={() => handleEducationDescriptionClick(edu)}
                          >
                            {edu.description || (isEditable ? <span className="text-gray-400 italic">Education description...</span> : "")}
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))
              ) : (
                <div className="text-gray-400 italic text-sm">
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                      <h3 
                        className={`font-bold text-sm text-gray-400 font-poppins italic ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                        onClick={() => {
                          if (isEditable) {
                            // If no education exists, create one
                            if (finalDisplayData.education.length === 0) {
                              const newEducation = {
                                id: Date.now().toString(),
                                institution: '',
                                degree: '',
                                field: '',
                                location: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                                gpa: '',
                                description: ''
                              };
                              dispatch({
                                type: 'ADD_EDUCATION',
                                payload: newEducation
                              });
                              // Set editing state for degree
                              setEditingEducationDegree(newEducation.id);
                              setEducationDegreeValue('');
                            } else {
                              // Edit the first existing education
                              const firstEdu = finalDisplayData.education[0];
                              setEditingEducationDegree(firstEdu.id);
                              setEducationDegreeValue(firstEdu.degree || '');
                            }
                          }
                        }}
                      >
                        Degree and Field of Study
                      </h3>
                      <p 
                        className={`font-semibold text-xs text-gray-400 font-inter italic ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                        onClick={() => {
                          if (isEditable) {
                            // If no education exists, create one
                            if (finalDisplayData.education.length === 0) {
                              const newEducation = {
                                id: Date.now().toString(),
                                institution: '',
                                degree: '',
                                field: '',
                                location: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                                gpa: '',
                                description: ''
                              };
                              dispatch({
                                type: 'ADD_EDUCATION',
                                payload: newEducation
                              });
                              // Set editing state for dates
                              setEditingEducationDates(newEducation.id);
                              setEducationDatesValue('');
                            } else {
                              // Edit the first existing education
                              const firstEdu = finalDisplayData.education[0];
                              setEditingEducationDates(firstEdu.id);
                              setEducationDatesValue(`${firstEdu.startDate} - ${firstEdu.current ? 'Present' : firstEdu.endDate}`);
                            }
                          }
                        }}
                      >
                        Start Date - End Date
                      </p>
                    </div>
                    <p 
                      className={`text-gray-800 font-medium text-sm font-inter text-gray-400 italic ${isEditable ? 'cursor-pointer hover:bg-blue-50 px-1 rounded' : ''}`}
                      onClick={() => {
                        if (isEditable) {
                          // If no education exists, create one
                          if (finalDisplayData.education.length === 0) {
                            const newEducation = {
                              id: Date.now().toString(),
                              institution: '',
                              degree: '',
                              field: '',
                              location: '',
                              startDate: '',
                              endDate: '',
                              current: false,
                              gpa: '',
                              description: ''
                            };
                            dispatch({
                              type: 'ADD_EDUCATION',
                              payload: newEducation
                            });
                            // Set editing state for institution
                            setEditingEducationInstitution(newEducation.id);
                            setEducationInstitutionValue('');
                          } else {
                            // Edit the first existing education
                            const firstEdu = finalDisplayData.education[0];
                            setEditingEducationInstitution(firstEdu.id);
                            setEducationInstitutionValue(firstEdu.institution || '');
                          }
                        }
                      }}
                    >
                      College and University Name
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}
          
          {/* Additional Information Section - Only show in sample data */}
          {useSampleData && (
            <section>
              <h2 className="text-base font-semibold uppercase text-[#1e1e1e] tracking-widest mb-2 font-poppins">
                Additional Information
              </h2>
              <hr className="border-t border-[#dfb160] w-full mb-3" />
              <p className="text-gray-700 text-sm font-inter">
                • Available for immediate start • Willing to relocate • Fluent in English and Spanish
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate3;