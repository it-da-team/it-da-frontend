import React from "react";
import SearchMap from "./SearchMap";
import "../../assets/css/Map.css";
import MapDropdown from "./MapDropdown"

function Map({ label }){

    return(
        <div className="map-section">
        {/* 텍스트 영역 */}
        <div className="map-text">
          <h1>지역별</h1>
          <h2>{label}</h2>
          <h2>채용 공고 확인하기</h2>
          <MapDropdown />

        </div>
        
  
        {/* 지도 영역 */}
        <div className="map-wrapper">
          <SearchMap latitude={37.5665} longitude={126.9780} level={3} />
        </div>
      </div>
    )
}

export default Map