'use client';

import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

interface SkillForm {
  name: string;
  level: string;
}

interface SkillsProps {
  onComplete?: () => void;
  onBack?: () => void;
}

const Skills: React.FC<SkillsProps> = ({ onComplete, onBack }) => {
  const { state, addSkill, deleteSkill } = useResume();
  const { skills } = state;

  const [currentSkill, setCurrentSkill] = useState<SkillForm>({
    name: '',
    level: '',
  });

  const [pendingSkills, setPendingSkills] = useState<
    Array<SkillForm & { id: string }>
  >([]);
  const [pendingIdCounter, setPendingIdCounter] = useState<number>(1);

  const handleInputChange = (field: keyof SkillForm, value: string) => {
    setCurrentSkill(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSkill = () => {
    if (!currentSkill.name || !currentSkill.level) {
      alert('Please fill in both Skill and Proficiency');
      return;
    }

    const newSkill = {
      ...currentSkill,
      id: `pending-${pendingIdCounter}`,
    };

    setPendingSkills(prev => [...prev, newSkill]);
    setPendingIdCounter(prev => prev + 1);
    setCurrentSkill({
      name: '',
      level: '',
    });
  };

  const handleDeletePendingSkill = (id: string) => {
    setPendingSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const handleDeleteSkill = (skillId: string) => {
    deleteSkill(skillId);
  };

  const handleSave = () => {
    // Check if user has added at least one skill
    if (pendingSkills.length === 0 && skills.length === 0) {
      alert('Please add at least one skill before continuing.');
      return;
    }

    // Save all pending skills to context
    pendingSkills.forEach(skill => {
      addSkill({
        name: skill.name,
        level: skill.level,
      });
    });

    setPendingSkills([]);
    alert('Skills saved successfully!');

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
      <div className='flex flex-wrap justify-between gap-3 p-4'>
        <div className='flex min-w-72 flex-col gap-3'>
          <p className='text-[#101418] tracking-light text-[32px] font-bold leading-tight'>
            Skills
          </p>
          <p className='text-[#5c728a] text-sm font-normal leading-normal'>
            Add your skills and proficiency levels
          </p>
        </div>
      </div>

      {/* Display pending skills */}
      {pendingSkills.length > 0 && (
        <>
          <h3 className='text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4'>
            Pending Skills
          </h3>
          {pendingSkills.map(skill => (
            <div
              key={skill.id}
              className='flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between'
            >
              <div className='flex flex-col justify-center'>
                <p className='text-[#101418] text-base font-medium leading-normal line-clamp-1'>
                  {skill.name}
                </p>
                <p className='text-[#5c728a] text-sm font-normal leading-normal line-clamp-2'>
                  {skill.level}
                </p>
              </div>
              <div className='shrink-0'>
                <button
                  onClick={() => handleDeletePendingSkill(skill.id)}
                  className='text-[#101418] flex size-7 items-center justify-center hover:bg-gray-200 rounded-full transition-colors'
                  data-icon='Trash'
                  data-size='24px'
                  data-weight='regular'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24px'
                    height='24px'
                    fill='currentColor'
                    viewBox='0 0 256 256'
                  >
                    <path d='M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z'></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Display saved skills */}
      {skills.length > 0 && (
        <>
          <h3 className='text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4'>
            Saved Skills
          </h3>
          {skills.map(skill => (
            <div
              key={skill.id}
              className='flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between'
            >
              <div className='flex flex-col justify-center'>
                <p className='text-[#101418] text-base font-medium leading-normal line-clamp-1'>
                  {skill.name}
                </p>
                <p className='text-[#5c728a] text-sm font-normal leading-normal line-clamp-2'>
                  {skill.level}
                </p>
              </div>
              <div className='shrink-0'>
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className='text-[#101418] flex size-7 items-center justify-center hover:bg-gray-200 rounded-full transition-colors'
                  data-icon='Trash'
                  data-size='24px'
                  data-weight='regular'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24px'
                    height='24px'
                    fill='currentColor'
                    viewBox='0 0 256 256'
                  >
                    <path d='M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z'></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Add new skill form */}
      <div className='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
        <label className='flex flex-col min-w-40 flex-1'>
          <p className='text-[#101418] text-base font-medium leading-normal pb-2'>
            Skill *
          </p>
          <input
            placeholder='Enter a skill'
            className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] h-14 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal'
            value={currentSkill.name}
            onChange={e => handleInputChange('name', e.target.value)}
          />
        </label>
        <label className='flex flex-col min-w-40 flex-1'>
          <p className='text-[#101418] text-base font-medium leading-normal pb-2'>
            Proficiency *
          </p>
          <select
            className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] h-14 p-[15px] text-base font-normal leading-normal'
            value={currentSkill.level}
            onChange={e => handleInputChange('level', e.target.value)}
          >
            <option value=''>Select Proficiency</option>
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Advanced'>Advanced</option>
            <option value='Expert'>Expert</option>
          </select>
        </label>
      </div>

      <div className='flex px-4 py-3 justify-start'>
        <button
          className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#b2cbe5] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'
          onClick={handleAddSkill}
        >
          <span className='truncate'>Add Skill</span>
        </button>
      </div>

      <div className='flex px-4 py-3 justify-between'>
        <button
          className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-gray-300 text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'
          onClick={onBack}
        >
          <span className='truncate'>Back to Education</span>
        </button>
        <button
          className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#b2cbe5] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]'
          onClick={handleSave}
        >
          <span className='truncate'>Save & View Resume</span>
        </button>
      </div>
    </div>
  );
};

export default Skills;
