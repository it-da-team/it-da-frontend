// src/hooks/useRecruitmentList.js
import { useState, useEffect } from "react";
import { fetchRecruitmentsByCategory } from "../../api/recruitment/recruitmentApi";

export default function useRecruitmentList(categoryEnum) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryEnum) return;

    fetchRecruitmentsByCategory(categoryEnum)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [categoryEnum]);

  return { data, loading, error };
}
