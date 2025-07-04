import { useState, useEffect } from 'react';
import { fetchMyProfile } from '../api/myProfileApi';

export const useMyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMyProfile()
      .then(setProfile)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []); // 최초 1회만 실행

  return { profile, loading, error };
}; 