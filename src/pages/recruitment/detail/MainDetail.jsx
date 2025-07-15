import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DailyTrafficSection from "./DailyTrafficSection";
import CompanyInfoSection from "./CompanyInfoSection";
import ApplySection from "./ApplySection";
import SimilarJobSection from "./SimilarJobSection";
import { fetchRecruitmentDetail } from "../../../api/recruitment/recruitmentApi";
import "../../../assets/css/MainDetail.css";
import "../../../assets/css/global.css";
import EmptyState from '../../../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

function MainDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchRecruitmentDetail(id);
        console.log("받은 상세 데이터:", data);
        setCompanyData(data);
      } catch (err) {
        console.error("상세 데이터 로딩 에러:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

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
        <DailyTrafficSection />
        <div className="divider" />
        <div className="two-column-layout">
          <div className="left-column">
            <CompanyInfoSection company={companyData} />
          </div>
          <div className="right-column">
            <div className="apply-sticky-box">
              <ApplySection company={companyData}/>
            </div>
          </div>
        </div>

        <div className="divider" />
        <SimilarJobSection />
      </div>
    </div>
  );
}

export default MainDetail;
