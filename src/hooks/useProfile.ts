import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Profile {
  id?: string;
  user_id?: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  experience_level?: string;
  job_title?: string;
  target_role?: string;
  linkedin_url?: string;
  github_url?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [availableSkills, setAvailableSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  const fetchProfile = async () => {
    if (!isLoggedIn) {
      setProfile(null);
      setUserSkills([]);
      setLoading(false);
      return;
    }

    // Mock profile data for now
    setProfile({
      display_name: 'John Doe',
      bio: 'Software Developer',
      experience_level: 'Mid Level',
      job_title: 'Frontend Developer',
      target_role: 'Senior Frontend Developer',
      linkedin_url: '',
      github_url: ''
    });
    
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    setProfile(prev => prev ? { ...prev, ...updates } : null);
    toast.success('Profile updated successfully');
  };

  const addUserSkill = async (skillId: string, proficiencyLevel: string) => {
    toast.success('Skill added successfully');
  };

  const removeUserSkill = async (userSkillId: string) => {
    toast.success('Skill removed successfully');
  };

  useEffect(() => {
    fetchProfile();
  }, [isLoggedIn]);

  return {
    profile,
    userSkills,
    availableSkills,
    loading,
    updateProfile,
    addUserSkill,
    removeUserSkill,
    refetchProfile: fetchProfile
  };
};