// src/pages/recruitment/JopList.jsx
import React from "react";
import JopListItem from "./JopListItem";
import useRecruitmentList from "../../hooks/recruitment/useRecruitmentList";

export default function JopList({ type, categoryEnum, searchResults, loading: searchLoading, error: searchError }) {
  const { data: jobsToShow, loading: listLoading, error: listError } = useRecruitmentList(categoryEnum);

  // 검색이 실행되었을 때
  if (searchResults !== undefined) {
    if (searchLoading) return <p>검색 중...</p>;
    if (searchError) return <p>검색 중 오류가 발생했습니다: {searchError}</p>;
    if (!searchResults.length) return <p>검색 결과가 없습니다.</p>;

    const filtered = type === "favorite"
      ? searchResults.filter(job => job.isFavorite)
      : searchResults;

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

  // 검색이 실행되지 않았을 때 (전체 목록)
  if (listLoading) return <p>불러오는 중...</p>;
  if (listError) return <p>에러 발생: {listError}</p>;

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
