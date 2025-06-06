import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../components/com/FavoriteButton";
import "../../assets/css/RecruitmentListItem.css";
import "../../assets/css/global.css";

export default function RecruitmentListItem({ job }) {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(job.isFavorite);
  
    const handleClick = () => {
      navigate(`/recruitment/detail/${job.id}`);
    };
   // 즐겨찾기 상태 로컬에서 관리
  const updateFav = async (newFav) => {
    setIsFavorite(newFav);
    // TODO: API 연동 시 서버 업데이트 로직 추가
    console.log(`Job ${job.id} favorite status updated to: ${newFav}`);
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
        <FavoriteButton
          initialFavorite={isFavorite}
          onToggle={updateFav}
          lottieSrc="https://lottie.host/eb195dde-1eb6-4032-b4e8-8dcb4c2f810e/xZfDm20WdP.lottie"
          size={32}
        />
        <div>{`D - ${job.dDay}`}</div>
      </div>
    </div>
  );
}
