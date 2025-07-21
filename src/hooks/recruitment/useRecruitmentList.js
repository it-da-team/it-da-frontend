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
        const processedData = responseData.map(item => ({
          ...item,
          dDay: item.dDay === null || item.dDay === undefined ? 999 : item.dDay,
        }));
        console.log('가공된 데이터:', processedData);
        setData(processedData);
      })
      .catch((err) => {
        console.error('데이터 로딩 에러:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [categoryEnum]);

  return { data, loading, error };
}
