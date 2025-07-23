import { useState, useEffect } from "react";
import { fetchRecruitmentsChart } from "../../api/recruitment/recruitmentApi";

export default function useProvinceRecruitmentCount() {
  const [counts, setCounts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchRecruitmentsChart()
      .then((response) => {
        setCounts(response.provinceCounts || []);
        setTotalCount(response.totalCount || 0);
        setTodayCount(response.todayCount || 0);
      })
      .catch((err) => {
        console.error("지역 채용 통계 로딩 에러:", err);
        setError(err.message || "오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { counts, totalCount, todayCount, loading, error };
}
