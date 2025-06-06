// src/pages/recruitment/index.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { enumToLabel } from "../../utils/categoryMap";
import Map from "./Map";
import MainRecruitmentList from "./MainRecruitmentList";

function Recruitment() {
  const [searchParams] = useSearchParams();
  const categoryEnum = searchParams.get("category") ?? "KINDERGARTEN";

  console.log("🚀 categoryEnum:", categoryEnum);
  const label = enumToLabel[categoryEnum] ?? "유치원";

  return (
    <div className="main-container">
      <Map label={label} />
      <MainRecruitmentList categoryEnum={categoryEnum} />
    </div>
  );
}

export default Recruitment;
