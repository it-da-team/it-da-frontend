// src/pages/recruitment/JopList.jsx
import React, { useState, useEffect } from "react";
import JopListItem from "./JopListItem";
import useRecruitmentList from "../../hooks/recruitment/useRecruitmentList";
import { getFavoriteRecruitments } from "../../utils/localStorage";
import FavoriteGuide from "../../components/recruitment/FavoriteGuide";
import "../../assets/css/JopList.css";

export default function JopList({ type, categoryEnum, searchResults, loading: searchLoading, error: searchError }) {
  const { data: jobsToShow, loading: listLoading, error: listError } = useRecruitmentList(categoryEnum);
  const [favoriteJobs, setFavoriteJobs] = useState([]);

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
      ? favoriteJobs  // 검색 결과가 아닌 저장된 관심공고 목록 사용
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
      </div>
    );
  }

  // 검색이 실행되지 않았을 때 (전체 목록)
  if (listLoading) return <p>불러오는 중...</p>;
  if (listError) return <p>에러 발생: {listError}</p>;

  const filtered = type === "favorite"
    ? favoriteJobs  // 전체 목록이 아닌 저장된 관심공고 목록 사용
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
    </div>
  );
}
