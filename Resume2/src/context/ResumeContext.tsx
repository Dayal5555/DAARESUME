'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

// Types for resume data
export interface PersonalInfo {
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

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
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

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  isFresher: boolean;
}

// Initial state
const initialState: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    summary: '',
    roleApplyingFor: '',
    website: '',
  },
  experience: [],
  education: [],
  skills: [],
  isFresher: false,
};

// Action types
type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | {
      type: 'UPDATE_EXPERIENCE';
      payload: { id: string; data: Partial<Experience> };
    }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | {
      type: 'UPDATE_EDUCATION';
      payload: { id: string; data: Partial<Education> };
    }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'SET_FRESHER'; payload: boolean }
  | { type: 'LOAD_DATA'; payload: ResumeData }
  | { type: 'RESET_DATA' };

// Reducer function
function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload],
      };

    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(exp =>
          exp.id === action.payload.id
            ? { ...exp, ...action.payload.data }
            : exp
        ),
      };

    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter(exp => exp.id !== action.payload),
      };

    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
      };

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu =>
          edu.id === action.payload.id
            ? { ...edu, ...action.payload.data }
            : edu
        ),
      };

    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload),
      };

    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };

    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill.id === action.payload.id
            ? { ...skill, ...action.payload.data }
            : skill
        ),
      };

    case 'DELETE_SKILL':
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload),
      };

    case 'SET_FRESHER':
      return {
        ...state,
        isFresher: action.payload,
      };

    case 'LOAD_DATA':
      return action.payload;

    case 'RESET_DATA':
      return initialState;

    default:
      return state;
  }
}

// Context interface
interface ResumeContextType {
  state: ResumeData;
  dispatch: React.Dispatch<ResumeAction>;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  setFresher: (isFresher: boolean) => void;
  resetData: () => void;
}

// Create context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Provider component
export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  const [idCounter, setIdCounter] = useState<number>(200);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });

        // Set counter to max ID + 1 to avoid conflicts
        const maxId = Math.max(
          ...parsedData.experience.map(
            (exp: Experience) => parseInt(exp.id) || 0
          ),
          ...parsedData.education.map(
            (edu: Education) => parseInt(edu.id) || 0
          ),
          ...parsedData.skills.map((skill: Skill) => parseInt(skill.id) || 0),
          200 // Start from 200 to avoid conflicts with initial data
        );
        setIdCounter(maxId + 1);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [state]);

  // Helper functions
  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data });
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience: Experience = {
      ...experience,
      id: idCounter.toString(),
    };
    setIdCounter(prev => prev + 1);
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience });
  };

  const updateExperience = (id: string, data: Partial<Experience>) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data } });
  };

  const deleteExperience = (id: string) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
  };

  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation: Education = {
      ...education,
      id: idCounter.toString(),
    };
    setIdCounter(prev => prev + 1);
    dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data } });
  };

  const deleteEducation = (id: string) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skill,
      id: idCounter.toString(),
    };
    setIdCounter(prev => prev + 1);
    dispatch({ type: 'ADD_SKILL', payload: newSkill });
  };

  const updateSkill = (id: string, data: Partial<Skill>) => {
    dispatch({ type: 'UPDATE_SKILL', payload: { id, data } });
  };

  const deleteSkill = (id: string) => {
    dispatch({ type: 'DELETE_SKILL', payload: id });
  };

  const setFresher = (isFresher: boolean) => {
    dispatch({ type: 'SET_FRESHER', payload: isFresher });
  };

  const resetData = () => {
    dispatch({ type: 'RESET_DATA' });
    setIdCounter(200);
  };

  const value: ResumeContextType = {
    state,
    dispatch,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    setFresher,
    resetData,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

// Custom hook to use the context
export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
