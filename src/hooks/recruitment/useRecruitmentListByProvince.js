import { useState, useEffect } from "react";
import { fetchRecruitmentsByProvince } from "../../api/recruitment/recruitmentApi";

export default function useRecruitmentListByProvince(province) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!province) return;

    setLoading(true);
    setError(null);

    fetchRecruitmentsByProvince(province)
      .then(responseData => {
        const processedData = responseData.map(item => ({
          ...item,
          dDay: item.dDay ?? 999,
        }));
        setData(processedData);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [province]);

  return { data, loading, error };
}
