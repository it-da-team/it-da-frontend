import { useState } from 'react';
import { fetchFilteredRecruitments } from '../../api/recruitment/recruitmentApi';

export const useRecruitmentSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecruitments = async (searchParams) => {
    try {
      setLoading(true);
      setError(null);

      const results = await fetchFilteredRecruitments(searchParams);
      setSearchResults(results || []);
      
    } catch (err) {
      console.error('검색 에러:', err);
      setError(err.response?.data?.message || '검색 중 오류가 발생했습니다.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchResults,
    loading,
    error,
    searchRecruitments
  };
}; 