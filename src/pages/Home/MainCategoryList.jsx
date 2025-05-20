// src/components/MainCategoryList.jsx
import React from "react";
import "../../assets/css/MainCategory.css";

function MainCategoryList({ label, image, active, compact }) {
  return (
    <div className={`main-category-list ${compact ? "compact" : ""} ${active ? "active" : ""}`}>
      {image && (
        <img src={image} alt={label} className="category-icon" />
      )}
      <span className="category-label">{label}</span>
    </div>
  );
}

export default MainCategoryList;
