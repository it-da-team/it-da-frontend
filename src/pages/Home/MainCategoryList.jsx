import React from "react";
import "../../assets/css/MainCategory.css"

function MainCategoryList({label, image}){
    return (
        <li className="main-category-list">
          {/* ① 이미지 */}
          {image && <img src={image} alt={label} className="category-icon" />}
    
          {/* ② 텍스트 */}
          <span className="category-label">{label}</span>
        </li>
      );
}

export default MainCategoryList