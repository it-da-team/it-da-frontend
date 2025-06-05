// src/hooks/useRecruitmentList.js
import { useState, useEffect } from "react";
import { fetchRecruitmentsByCategory } from "../../api/recruitment/recruitmentApi";

export default function useRecruitmentList(categoryEnum) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryEnum) return;

    setLoading(true);
    setError(null);

    fetchRecruitmentsByCategory(categoryEnum)
      .then(responseData => {
        console.log('받은 데이터:', responseData);
        setData(responseData);
      })
      .catch((err) => {
        console.error('데이터 로딩 에러:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [categoryEnum]);

  return { data, loading, error };
}
