import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../components/com/FavoriteButton";
import { addFavoriteRecruitment, removeFavoriteRecruitment, isFavoriteRecruitment } from "../../utils/localStorage";
import "../../assets/css/RecruitmentListItem.css";
import "../../assets/css/global.css";

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
          <h2>{job.title}</h2>
          <h3>{job.companyName}</h3>
          <div className="divider" />
        </div>
        
        <div className="jop-item-type">
          <h4>{`${job.region} ${job.district}`}</h4>
          <div className="v-divider" />
          <h4>{job.category.label}</h4>
          <div className="v-divider" />
          <h4>{job.workType}</h4>
        </div>

        <div className="job-item-meta">
          <div onClick={handleFavoriteClick}>
            <FavoriteButton
              initialFavorite={isFavorite}
              onToggle={updateFav}
              lottieSrc="https://lottie.host/eb195dde-1eb6-4032-b4e8-8dcb4c2f810e/xZfDm20WdP.lottie"
              size={32}
            />
          </div>
          <div>{`D - ${job.dDay}`}</div>
        </div>
      </div>
    );
}
