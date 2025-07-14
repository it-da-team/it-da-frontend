// src/pages/recruitment/index.jsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { enumToLabel, labelToEnum } from "../../utils/categoryMap";
import Map from "./Map";
import MainRecruitmentList from "./MainRecruitmentList";
import MainCategory from "../Home/MainCategory";
import "./Recruitment.css";

function Recruitment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryEnum = searchParams.get("category") ?? "KINDERGARTEN";

  console.log("🚀 categoryEnum:", categoryEnum);
  const label = enumToLabel[categoryEnum] ?? "유치원";

  const handleCategorySelect = (catLabel) => {
    // labelToEnum은 이미 import되어 있음
    navigate(`/recruitment?category=${labelToEnum[catLabel]}`);
  };

  return (
    <div className="main-container">
      <Map label={label} />
      <div className="recruitment-category-compact">
        <MainCategory compact selected={label} onCategorySelect={handleCategorySelect} />
      </div>
      <MainRecruitmentList categoryEnum={categoryEnum} />
    </div>
  );
}

export default Recruitment;
