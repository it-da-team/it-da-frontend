import React, { useState, useEffect } from "react";
import FavoriteButton from '../../../components/com/FavoriteButton';
import { FaEye } from 'react-icons/fa';
import '../../../assets/css/MainDetail.css';
import '../../../assets/css/MainDetail.mobile.css';

// 모바일 여부를 감지하는 훅
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

function CompanyInfoHeader({title, companyName, isFavorite = false, onFavoriteToggle, company}){
    const safeOnFavoriteToggle = onFavoriteToggle || (async () => {});
    const [hover, setHover] = useState(false);
    const isMobile = useIsMobile();
    
    if (isMobile) {
      // 모바일: 한 줄에 [회사명][눈+조회수][관심] 오른쪽 정렬
      return (
        <div>
          <h2 className="company-title">{title}</h2>
          <div className="company-header-row mobile">
            <div className="company-name-row mobile">
              <h4 className="company-name">{companyName}</h4>
              {company && (
                <span className="company-viewcount">
                  <FaEye className="company-viewcount-icon" />
                  <span className="company-viewcount-number">{company.viewCount ?? 0}</span>
                </span>
              )}
            </div>
            <div className="company-favorite-row mobile">
              <FavoriteButton
                initialFavorite={isFavorite}
                onToggle={safeOnFavoriteToggle}
                lottieSrc="https://lottie.host/eb195dde-1eb6-4032-b4e8-8dcb4c2f810e/xZfDm20WdP.lottie"
              />
              <span
                className={`company-favorite-label${hover ? ' hover' : ''}`}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
              >
                <span className="company-favorite-label-icon"></span>관심
              </span>
            </div>
          </div>
        </div>
      );
    }
    // PC: 기존 구조 유지
    return(
        <div>
            <div className="company-header-row">
                <div>
                    <h2 className="company-title">{title}</h2>
                    <div className="company-name-row">
                      <h4 className="company-name">{companyName}</h4>
                    </div>
                </div>
                <div className="company-favorite-row">
                    <FavoriteButton
                        initialFavorite={isFavorite}
                        onToggle={safeOnFavoriteToggle}
                        lottieSrc="https://lottie.host/eb195dde-1eb6-4032-b4e8-8dcb4c2f810e/xZfDm20WdP.lottie"
                    />
                    <span
                        className={`company-favorite-label${hover ? ' hover' : ''}`}
                        onMouseOver={() => setHover(true)}
                        onMouseOut={() => setHover(false)}
                    >
                        <span className="company-favorite-label-icon"></span>관심
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CompanyInfoHeader;