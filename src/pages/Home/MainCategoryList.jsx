// src/components/MainCategoryList.jsx
import React from "react";
import "../../assets/css/MainCategory.css";

function MainCategoryList({ label, image, active, compact, iconClass = "category-icon" }) {
  return (
    <div className={`main-category-list ${compact ? "compact" : ""} ${active ? "active" : ""}`}>
      {image && (
        <img src={image} alt={label} className={iconClass} />
      )}
      <span className="category-label">{label}</span>
    </div>
  );
}

export default MainCategoryList;
