// src/pages/Jop/Map.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchMap from "./SearchMap";
import MapDropdown from "./MapDropdown";
import MainCategory from "../Home/MainCategory";
import "../../assets/css/Map.css";

function Map() {
  const location = useLocation();
  // 홈에서 받은 카테고리 값을 초기값으로 사용, 없으면 "유치원"으로
  const initialCategory = location.state?.label || "유치원";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // location.state.label 이 바뀌면 selectedCategory 업데이트
  useEffect(() => {
    if (location.state?.label) {
      setSelectedCategory(location.state.label);
    }
  }, [location.state]);

  return (
    <div className="map-section">
      {/* 왼쪽: 카테고리 메뉴 (compact 모드) */}
      <div className="map-left-panel">
        <MainCategory
          compact
          selected={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>

      {/* 오른쪽: 제목, 필터, 지도 */}
      <div className="map-right-panel">
        <div className="map-text">
          <h1 className="map-title">지역별</h1>
          <h3 className="map-subtext">채용 공고 확인하기</h3>
          <MapDropdown selectedCategory={selectedCategory} />
        </div>

        <div className="map-wrapper">
          <SearchMap
            latitude={37.5665}
            longitude={126.9780}
            level={3}
          />
        </div>
      </div>
    </div>
  );
}

export default Map;
