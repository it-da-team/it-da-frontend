import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DailyTrafficSection from "./DailyTrafficSection";
import CompanyInfoSection from "./CompanyInfoSection";
import ApplySection from "./ApplySection";
import SimilarJobSection from "./SimilarJobSection";
import { fetchRecruitmentDetail } from "../../../api/recruitment/recruitmentApi";
import "../../../assets/css/MainDetail.css";
import "../../../assets/css/global.css";
import EmptyState from '../../../components/common/EmptyState';
import { addFavoriteRecruitment, removeFavoriteRecruitment, isFavoriteRecruitment } from "../../../utils/localStorage";
import '../../../assets/css/MainDetail.mobile.css'; // 모바일 전용 스타일 (700px 이하)

// 모바일 여부를 감지하는 훅
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

function MainDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchRecruitmentDetail(id, controller.signal);
        console.log("받은 상세 데이터:", data);
        setCompanyData(data);
        if (data) {
          setIsFavorite(isFavoriteRecruitment(data.id));
        }
      } catch (err) {
        if (err.name !== 'CanceledError') { // 취소로 인한 에러는 무시
          console.error("상세 데이터 로딩 에러:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      controller.abort(); // 컴포넌트 언마운트 시 또는 재호출 직전에 요청 취소
    };
  }, [id]);

  const handleFavoriteToggle = async (newFavState) => {
    if (!companyData) return;

    if (newFavState) {
      addFavoriteRecruitment(companyData);
    } else {
      removeFavoriteRecruitment(companyData.id);
    }
    setIsFavorite(newFavState);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!companyData) return (
    <EmptyState
      title="해당 채용 정보를 찾을 수 없습니다."
      description="공고가 마감되었거나 삭제되었을 수 있습니다."
      buttonText="비슷한 공고 보기"
      onButtonClick={() => navigate('/recruitment')}
    />
  );

  return (
    <div className="main-detail-container">
      <div>
        <div className="two-column-layout">
          <div className="left-column">
            <CompanyInfoSection
              company={companyData}
              isFavorite={isFavorite}
              onFavoriteToggle={handleFavoriteToggle}
            />
          </div>
          {!isMobile && (
            <div className="right-column">
              <div className="apply-sticky-box">
                <ApplySection company={companyData}/>
              </div>
            </div>
          )}
        </div>
        <div className="divider" />
        {/* <SimilarJobSection /> */}
        <div style={{
          padding: '2rem',
          height: '10rem',
          textAlign: 'center',
          background: '#f9f9f9',
          borderRadius: '8px',
          margin: '1rem 0',
          color: '#6c757d'
        }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>비슷한 공고</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>준비중인 기능입니다.</p>
        </div>
      </div>
    </div>
  );
}

export default MainDetail;
