import React from "react";
import JopList from "../JopList";
import "../../../assets/css/global.css";
import "../../../assets/css/SimilarJobSection.css"

function SimilarJobSection() {
  return (
    <div className="similar-job-section">
      <h2>비슷한 채용 공고</h2>
      <JopList />
    </div>
  );
}

export default SimilarJobSection;
