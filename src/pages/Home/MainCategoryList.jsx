// src/components/MainCategoryList.jsx
import React, { memo } from "react";
import "../../assets/css/MainCategory.css";

const MainCategoryList = memo(function MainCategoryList({ label, image, active, compact, iconClass = "category-icon" }) {
  return (
    <div className={`main-category-list ${compact ? "compact" : ""} ${active ? "active" : ""}`}>
      {image && (
        <img 
          src={image} 
          alt={`${label} 카테고리 아이콘`} 
          className={iconClass}
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="category-label">{label}</span>
    </div>
  );
});

export default MainCategoryList;
