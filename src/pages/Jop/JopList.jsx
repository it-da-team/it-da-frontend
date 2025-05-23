// src/pages/Jop/JopList.jsx
import React from "react";
import JopListItem from "./JopListItem";
import useRecruitmentList from "../../hooks/recruitment/useRecruitmentList";

export default function JopList({ type, categoryEnum }) {
  const { data: jobsToShow, loading, error } = useRecruitmentList(categoryEnum);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  const filtered = type === "favorite"
    ? jobsToShow.filter(job => job.isFavorite)
    : jobsToShow;

  if (!filtered.length) {
    return <p>표시할 공고가 없습니다.</p>;
  }

  return (
    <div className="jop-list">
      {filtered.map(job => (
        <div className="jop-list-item" key={job.id}>
          <JopListItem job={job} />
        </div>
      ))}
    </div>
  );
}
