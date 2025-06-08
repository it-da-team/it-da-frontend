import React from 'react';
import '../../assets/css/ViewRecruitmentButton.css';

export default function ViewRecruitmentButton({ recruitmentIdHash }) {
  const handleViewRecruitment = () => {
    window.location.href = `/recruitment/detail/${recruitmentIdHash}`;
  };

  return (
    <button 
      className="view-recruitment-button"
      onClick={handleViewRecruitment}
    >
      채용공고 보러가기
    </button>
  );
} 