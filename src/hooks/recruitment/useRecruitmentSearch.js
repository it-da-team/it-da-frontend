import { useState } from 'react';
import { fetchFilteredRecruitments } from '../../api/recruitment/recruitmentApi';

export const useRecruitmentSearch = (categoryEnum) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecruitments = async (searchParams) => {
    try {
      setLoading(true);
      setError(null);

      console.log('전송할 DTO:', searchParams); // 디버깅용
      const results = await fetchFilteredRecruitments(searchParams);
      setSearchResults(results);
    } catch (err) {
      console.error('검색 에러:', err);
      if (err.response?.data) {
        console.error('서버 응답:', err.response.data); // 디버깅용
      }
      setError(err.response?.data?.message || '검색 중 오류가 발생했습니다.');
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