import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeartButton from "../../components/com/HeartButton";
import { addFavoriteRecruitment, removeFavoriteRecruitment, isFavoriteRecruitment } from "../../utils/localStorage";
import "../../assets/css/RecruitmentListItem.css";
import "../../assets/css/HotAnimation.css"; // HOT 애니메이션 스타일 import
import "../../assets/css/global.css";
import { JobStatus } from "../../utils/enums";
import { FaEye } from "react-icons/fa"; // FaEye 아이콘 import
import Lottie from 'react-lottie'; // react-lottie import
import hotAnimationData from '../../assets/lottie/hot.json'; // Lottie 파일 import

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

export default function RecruitmentListItem({ job, index }) { // index prop 추가
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
  
    // Lottie 기본 옵션
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: hotAnimationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

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
              {index < 5 && (
                <div className="hot-animation-container">
                  <Lottie options={defaultOptions} height={30} width={30} />
                </div>
              )}
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
        </div>
        <div className="jop-item-type">
          <div className="jop-item-tags">
            <span className="job-tag job-tag--primary">{safeRender(job.workType)}</span>
            <span className="job-info-text">
              {`${safeRender(job.region)} ${safeRender(job.district)} | ${safeRender(job.category)}`}
            </span>
            {parseInt(job.dDay, 10) >= 0 && parseInt(job.dDay, 10) !== 999 && (
              <span className="job-info-text">
                {`D - ${safeRender(job.dDay)}`}
              </span>
            )}
          </div>
          <div className="view-count-container">
            <HeartButton
              isFavorite={isFavorite}
              onToggle={updateFav}
            />
            <FaEye className="view-count-icon" />
            <span className="view-count-number">{job.viewCount ?? 0}</span>
          </div>
        </div>
      </div>
    );
}
