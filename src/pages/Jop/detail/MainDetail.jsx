import React from "react";
import { useParams } from "react-router-dom";
import DailyTrafficSection from "./DailyTrafficSection";
import CompanyInfoSection from "./CompanyInfoSection";
import ApplySection from "./ApplySection";
import SimilarJobSection from "./SimilarJobSection";
import "../../../assets/css/MainDetail.css";
import "../../../assets/css/global.css";
import jobDetails from "../../../data/jobDetailData.json";

function MainDetail() {

  const { id } = useParams();
  const jobId = parseInt(id);
  const companyData = jobDetails.find(job => job.id === jobId);
  
  console.log("현재 ID:", id);
  console.log("매칭된 데이터:", companyData);
  /** 에러 */
  if (!companyData) {
    return <div>해당 채용 정보를 찾을 수 없습니다.</div>;
  }

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
