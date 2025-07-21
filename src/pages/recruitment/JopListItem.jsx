import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../components/com/FavoriteButton";
import { addFavoriteRecruitment, removeFavoriteRecruitment, isFavoriteRecruitment } from "../../utils/localStorage";
import "../../assets/css/RecruitmentListItem.css";
import "../../assets/css/global.css";
import { JobStatus } from "../../utils/enums";

// 안전하게 렌더링하는 함수 추가
function safeRender(field) {
  if (typeof field === "string" || typeof field === "number") return field;
  if (Array.isArray(field)) return field.map(safeRender).join(", ");
  if (field && typeof field === "object" && "label" in field) return field.label;
  return "";
}

const isToday = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  const date = new Date(dateString);
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate();
};

export default function RecruitmentListItem({ job }) {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
  
    // 하트 상태 업데이트 함수
    const updateFavoriteStatus = () => {
      const favoriteStatus = isFavoriteRecruitment(job.id);
      setIsFavorite(favoriteStatus);
    };

    // 컴포넌트 마운트 시와 job.id가 변경될 때마다 상태 업데이트
    useEffect(() => {
      updateFavoriteStatus();
    }, [job.id]);

    // 로컬스토리지 변경 감지
    useEffect(() => {
      const handleStorageChange = (e) => {
        if (e.key === 'favoriteRecruitments') {
          updateFavoriteStatus();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [job.id]);

    const handleClick = () => {
      navigate(`/recruitment/detail/${job.id}`);
    };

    const handleFavoriteClick = (e) => {
      e.stopPropagation();  // 이벤트 버블링 방지
    };
  
    // 즐겨찾기 상태 업데이트
    const updateFav = async (newFav) => {
      if (newFav) {
        addFavoriteRecruitment({
          id: job.id,
          title: job.title,
          companyName: job.companyName,
          region: job.region,
          district: job.district,
          category: job.category,
          workType: job.workType,
          dDay: job.dDay
        });
      } else {
        removeFavoriteRecruitment(job.id);
      }
      // 상태 즉시 업데이트
      setIsFavorite(newFav);
    };

    return (
      <div className="main-jop-list" onClick={handleClick}>
        <div className="jop-item-title">
          <div className="job-title-container">
            <div className="title-with-labels">
              <h2 className="job-list-item__title">{job.title}</h2>
              {parseInt(job.dDay, 10) === 999 ? (
                <span className="status-label title-label always">{JobStatus.ALWAYS}</span>
              ) : parseInt(job.dDay, 10) < 0 ? (
                <span className="status-label title-label closed">{JobStatus.CLOSED}</span>
              ) : job.createAt && isToday(job.createAt) ? (
                <span className="status-label title-label latest">{JobStatus.LATEST}</span>
              ) : null}
            </div>
            <h3>{job.companyName}</h3>
          </div>
          <div className="job-item-meta">
            <div onClick={handleFavoriteClick}>
              <FavoriteButton
                initialFavorite={isFavorite}
                onToggle={updateFav}
                lottieSrc="https://lottie.host/eb195dde-1eb6-4032-b4e8-8dcb4c2f810e/xZfDm20WdP.lottie"
                size={40}
              />
            </div>
          </div>
        </div>
        <div className="jop-item-type">
          <h4>{`${safeRender(job.region)} ${safeRender(job.district)}`}</h4>
          <h4>{safeRender(job.category)}</h4>
          <h4>{safeRender(job.workType)}</h4>
          {parseInt(job.dDay, 10) >= 0 && parseInt(job.dDay, 10) !== 999 && <h4>{`D - ${safeRender(job.dDay)}`}</h4>}
        </div>
      </div>
    );
}
