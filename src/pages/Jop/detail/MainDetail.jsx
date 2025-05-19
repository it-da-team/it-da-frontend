import React from "react";
import DailyTrafficSection from "./DailyTrafficSection";
import CompanyInfoSection from "./CompanyInfoSection";
import ApplySection from "./ApplySection";
import SimilarJobSection from "./SimilarJobSection";
import "../../../assets/css/MainDetail.css";
import "../../../assets/css/global.css";
import sampleLogo from "../../../assets/images/sampleLogo.png";

function MainDetail() {
  const companyData = {
    name: "2025 호성초병설유치원 여름방학 중 방과후과정 운영인력 채용",
    logoUrl: sampleLogo,
    description: "삼성전자는 글로벌 전자 기업으로...",
    welfare: "자유로운 연차, 점심 지원, 건강검진",
    location: "서울 강남구 테헤란로 123",
  };

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
          {/* sticky 는 이 래퍼에 걸어줍니다 */}
          <div className="apply-sticky-box">
            <ApplySection />
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
