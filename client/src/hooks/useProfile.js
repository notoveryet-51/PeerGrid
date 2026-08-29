import { useState, useEffect, useCallback } from 'react';
import { fetchMyProfile, updateMyProfile } from '../api/user.api';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMyProfile();
      setProfile(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveProfile = async (updates) => {
    try {
      const updated = await updateMyProfile(updates);
      setProfile(updated);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Update failed' };
    }
  };

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return { profile, loading, error, saveProfile, reload: loadProfile };
}