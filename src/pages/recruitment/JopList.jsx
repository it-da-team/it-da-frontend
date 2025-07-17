// src/pages/recruitment/JopList.jsx
import React, { useState, useEffect } from "react";
import JopListItem from "./JopListItem";
import useRecruitmentList from "../../hooks/recruitment/useRecruitmentList";
import { getFavoriteRecruitments } from "../../utils/localStorage";
import FavoriteGuide from "../../components/recruitment/FavoriteGuide";
import "../../assets/css/JopList.css";

// 안전하게 렌더링하는 함수 추가
function safeRender(field) {
  if (typeof field === "string" || typeof field === "number") return field;
  if (Array.isArray(field)) return field.map(safeRender).join(", ");
  if (field && typeof field === "object" && "label" in field) return field.label;
  return "";
}

export default function JopList({ type, categoryEnum, searchResults, loading: searchLoading, error: searchError, selectedFilters, onFilterChange }) {
  const { data: jobsToShow, loading: listLoading, error: listError } = useRecruitmentList(categoryEnum);
  const [favoriteJobs, setFavoriteJobs] = useState([]);

  // 필터 제거 핸들러
  const handleRemoveFilter = (filterType) => {
    if (onFilterChange) {
      onFilterChange({
        ...selectedFilters,
        [filterType]: null
      });
    }
  };

  // 로컬스토리지에서 관심공고 목록 가져오기
  const loadFavorites = () => {
    const favorites = getFavoriteRecruitments();
    setFavoriteJobs(favorites);
  };

  useEffect(() => {
    loadFavorites();

    // 로컬스토리지 변경 이벤트 리스너 등록
    const handleStorageChange = (e) => {
      if (e.key === 'favoriteRecruitments') {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 검색이 실행되었을 때
  if (searchResults !== undefined) {
    if (searchLoading) return <p>검색 중...</p>;
    if (searchError) return <p>검색 중 오류가 발생했습니다: {searchError}</p>;
    if (!searchResults.length) return <p>검색 결과가 없습니다.</p>;

    const filtered = type === "favorite"
      ? favoriteJobs
      : searchResults;

    return (
      <div className="jop-list-container">
        {type === "favorite" && <FavoriteGuide />}
        <div className="jop-list">
          {filtered.map(job => (
            <div className="jop-list-item" key={job.id}>
              <JopListItem job={job} />
            </div>
          ))}
        </div>
        {selectedFilters?.region && (
          <div className="search-tag region">
            {safeRender(selectedFilters.region)}
            <button onClick={() => handleRemoveFilter('region')}>×</button>
          </div>
        )}
        {selectedFilters?.category && (
          <div className="search-tag category">
            {safeRender(selectedFilters.category)}
            <button onClick={() => handleRemoveFilter('category')}>×</button>
          </div>
        )}
        {selectedFilters?.jobType && (
          <div className="search-tag job-type">
            {safeRender(selectedFilters.jobType)}
            <button onClick={() => handleRemoveFilter('jobType')}>×</button>
          </div>
        )}
      </div>
    );
  }

  // 검색이 실행되지 않았을 때 (전체 목록)
  if (listLoading) return <p>불러오는 중...</p>;
  if (listError) return <p>에러 발생: {listError}</p>;

  const filtered = type === "favorite"
    ? favoriteJobs
    : jobsToShow;

  if (!filtered.length) {
    return <p>표시할 공고가 없습니다.</p>;
  }

  return (
    <div className="jop-list-container">
      {type === "favorite" && <FavoriteGuide />}
      <div className="jop-list">
        {filtered.map(job => (
          <div className="jop-list-item" key={job.id}>
            <JopListItem job={job} />
          </div>
        ))}
      </div>
      {selectedFilters?.region && (
        <div className="search-tag region">
          {safeRender(selectedFilters.region)}
          <button onClick={() => handleRemoveFilter('region')}>×</button>
        </div>
      )}
      {selectedFilters?.category && (
        <div className="search-tag category">
          {safeRender(selectedFilters.category)}
          <button onClick={() => handleRemoveFilter('category')}>×</button>
        </div>
      )}
      {selectedFilters?.jobType && (
        <div className="search-tag job-type">
          {safeRender(selectedFilters.jobType)}
          <button onClick={() => handleRemoveFilter('jobType')}>×</button>
        </div>
      )}
    </div>
  );
}
