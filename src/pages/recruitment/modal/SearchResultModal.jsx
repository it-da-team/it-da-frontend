import React, { useState, useEffect } from 'react';
import '../../../assets/css/SearchResultModal.css';
import ViewRecruitmentButton from '../../../components/common/ViewRecruitmentButton';
import FavoriteButton from '../../../components/com/FavoriteButton';
import { CategoryTypes, SubType, DutyType } from '../../../utils/enums';
import { addFavoriteRecruitment, removeFavoriteRecruitment, isFavoriteRecruitment } from '../../../utils/localStorage';

export default function SearchResultModal({ isOpen, onClose, searchResults }) {
  const [favoriteStates, setFavoriteStates] = useState({});

  // 컴포넌트 마운트 시와 searchResults가 변경될 때 좋아요 상태 초기화
  useEffect(() => {
    if (searchResults) {
      const states = {};
      searchResults.forEach(result => {
        states[result.recruitmentIdHash] = isFavoriteRecruitment(result.recruitmentIdHash);
      });
      setFavoriteStates(states);
    }
  }, [searchResults]);

  if (!isOpen) return null;

  const getWorkTypeLabel = (category, workType) => {
    console.log("getWorkTypeLabel 입력:", { category, workType });
    
    // workType이 객체인 경우 value 사용
    const workTypeValue = workType?.value || workType;
    const categoryValue = category?.value || category;
    
    if (!categoryValue || !workTypeValue) {
      console.log("카테고리 또는 workType이 없음");
      return workTypeValue || '직종 미지정';
    }
    
    // 카테고리에 따른 서브타입 매핑
    const subTypes = SubType[categoryValue];
    console.log("서브타입:", subTypes);
    
    if (subTypes && subTypes[workTypeValue]) {
      console.log("서브타입 매핑 결과:", subTypes[workTypeValue]);
      return subTypes[workTypeValue];
    }
    
    // 직무 타입 매핑
    if (DutyType[workTypeValue]) {
      console.log("직무 타입 매핑 결과:", DutyType[workTypeValue]);
      return DutyType[workTypeValue];
    }
    
    console.log("매핑된 값 없음, 원본 반환:", workTypeValue);
    return workTypeValue || '직종 미지정';
  };

  const getCategoryLabel = (category) => {
    console.log("getCategoryLabel 입력:", category);
    // category가 객체인 경우 value 사용
    const categoryValue = category?.value || category;
    const label = CategoryTypes[categoryValue];
    console.log("카테고리 매핑 결과:", label);
    return label || categoryValue || '카테고리 미지정';
  };

  const formatDDay = (dDay) => {
    if (dDay === undefined || dDay === null) return 'D-day 미지정';
    return `D-${dDay}`;
  };

  const handleFavoriteToggle = async (recruitmentIdHash, newFav) => {
    console.log(`Recruitment ${recruitmentIdHash} favorite status updated to: ${newFav}`);
    
    // 현재 결과에서 해당 공고 찾기
    const recruitment = searchResults.find(r => r.recruitmentIdHash === recruitmentIdHash);
    if (!recruitment) return;

    if (newFav) {
      addFavoriteRecruitment({
        id: recruitmentIdHash,
        title: recruitment.title,
        companyName: recruitment.companyName,
        region: recruitment.region,
        district: recruitment.district,
        category: recruitment.category,
        workType: recruitment.workType,
        dDay: recruitment.dDay
      });
    } else {
      removeFavoriteRecruitment(recruitmentIdHash);
    }

    // 상태 업데이트
    setFavoriteStates(prev => ({
      ...prev,
      [recruitmentIdHash]: newFav
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>검색된 채용공고</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {searchResults && searchResults.length > 0 ? (
            <div className="search-results-list">
              {searchResults.map((result) => {
                console.log("렌더링할 결과:", result);
                return (
                  <div key={result.recruitmentIdHash} className="search-result-item">
                    <div className="search-result-left">
                      <h3>{result.title || '제목 없음'}</h3>
                      <p className="company-name">{result.companyName || '기관명 없음'}</p>
                      <div className="result-details">
                        <span>{getCategoryLabel(result.category)}</span>
                        <span>{getWorkTypeLabel(result.category, result.workType)}</span>
                      </div>
                    </div>
                    <div className="search-result-right">
                      <div className="right-top">
                        <span className="d-day">{formatDDay(result.dDay)}</span>
                        <FavoriteButton
                          initialFavorite={favoriteStates[result.recruitmentIdHash] || false}
                          onToggle={(newFav) => handleFavoriteToggle(result.recruitmentIdHash, newFav)}
                          lottieSrc="https://lottie.host/eb195dde-1eb6-4032-b4e8-8dcb4c2f810e/xZfDm20WdP.lottie"
                          size={32}
                        />
                      </div>
                      <ViewRecruitmentButton recruitmentIdHash={result.recruitmentIdHash} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
} 