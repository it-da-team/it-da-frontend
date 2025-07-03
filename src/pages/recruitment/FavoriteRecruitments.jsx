import React, { useState, useEffect } from 'react';
import { getFavoriteRecruitments } from '../../utils/localStorage';
import RecruitmentListItem from './JopListItem';
import '../../assets/css/JopList.css';

export default function FavoriteRecruitments() {
  const [favoriteRecruitments, setFavoriteRecruitments] = useState([]);

  useEffect(() => {
    // 컴포넌트 마운트 시 로컬스토리지에서 관심공고 목록 가져오기
    const loadFavorites = () => {
      const favorites = getFavoriteRecruitments();
      setFavoriteRecruitments(favorites);
    };

    loadFavorites();

    // 로컬스토리지 변경 이벤트 리스너 등록
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="recruitment-list-container">
      <h1>관심 공고</h1>
      {favoriteRecruitments.length === 0 ? (
        <div className="no-recruitments">
          <p>관심 공고가 없습니다.</p>
        </div>
      ) : (
        <div className="recruitment-list">
          {favoriteRecruitments.map((recruitment) => (
            <RecruitmentListItem key={recruitment.id} job={recruitment} />
          ))}
        </div>
      )}
    </div>
  );
} 