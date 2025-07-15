import React from "react";
import TrafficNotice from "./TrafficNotice"
import "../../../assets/css/ApplySection.css";
import formatDate from '../../../utils/formatDate';

function ApplySection( { company }) {
  // 우선순위: externalUrl > siteUrl > applyUrl
  const applyUrl = company?.externalUrl || company?.siteUrl || company?.applyUrl || '';

  const handleApplyClick = () => {
    if (applyUrl) {
      window.open(applyUrl, '_blank');
    }
  };

  return (
    <div className="apply-section">
      <TrafficNotice />
      <div className="card">
        <table className="info-table">
          <tbody>
            <tr>
              <th>기업명</th>
              <td>{company.companyName}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{company.region} {company.district}</td>
            </tr>
            <tr>
              <th>직군</th>
              <td>{company.category?.label}</td>
            </tr>
            <tr>
            <th>상세 직군</th>
            <td>
            <div className="column-text">
                <div>{company.workType}</div>
                <div>{company.workSubType}</div>
            </div>
            </td>
            </tr>
            <tr>
              <th>마감일</th>
              <td>{formatDate(company.recruitEndAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>

        <button className="btn btn-primary btn-block" onClick={handleApplyClick}>지원하기</button>
      </div>
  );
}

export default ApplySection;
