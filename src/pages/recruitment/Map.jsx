import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { fetchMapRecruitments, sendTotalRecruitments } from "../../api/recruitment/recruitmentMapApi";
import MapDropdown from "./MapDropdown";
import SearchMap from "./SearchMap";
import MainCategory from "../Home/MainCategory";
import { labelToEnum, enumToLabel } from "../../utils/categoryMap";
import SearchResultModal from "./modal/SearchResultModal";
import "../../assets/css/Map.css";

function Map() {
  const [selectedCategory, setSelectedCategory] = useState("KINDERGARTEN");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category) => {
    const categoryEnum = labelToEnum[category];
    setSelectedCategory(categoryEnum);
  };

  const handleSearch = async () => {
    if (!selectedCity) {
      alert("시를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchParams = {
        category: selectedCategory,
        region: selectedCity,
        district: selectedDistrict || ""
      };

      console.log("Search params:", searchParams);
      const response = await fetchMapRecruitments(searchParams);

      if (response && response.data) {
        console.log("전체 응답 데이터:", response.data);
        const processedData = response.data.map(item => {
          console.log("처리 중인 아이템 원본:", item);
          
          // 각 필드 확인
          console.log("필드 확인:", {
            title: item.title,
            companyName: item.companyName,
            category: item.category,
            workType: item.workType,
            workSubType: item.workSubType,
            dDay: item.dDay,
            recruitmentIdHash: item.recruitmentIdHash,
            fullAddress: item.fullAddress
          });

          const processedItem = {
            ...item,
            fullAddress: item.fullAddress || '',
            recruitmentIdHash: item.recruitmentIdHash || item.id,
            title: item.title || '제목 없음',
            workType: item.workType || item.workSubType || '',
            dDay: item.dDay || 0,
            category: item.category || selectedCategory,
            companyName: item.companyName || '기관명 없음'
          };

          console.log("처리된 아이템:", processedItem);
          return processedItem;
        });
        
        console.log("최종 처리된 데이터:", processedData);
        setSearchResults(processedData);
        
        const recruitmentIds = processedData.map(item => item.recruitmentIdHash);
        console.log("추출된 recruitment IDs:", recruitmentIds);
        await sendTotalRecruitments(recruitmentIds);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="map-section">
      <div className="map-left-panel">
        <MainCategory 
          compact 
          selected={enumToLabel[selectedCategory]} 
          onCategorySelect={handleCategorySelect} 
        />
      </div>

      <div className="map-right-panel">
        <div className="map-text">
          <h1 className="map-title">지역별</h1>
          <h3 className="map-subtext">채용 공고 확인하기</h3>
          <MapDropdown
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            onCityChange={setSelectedCity}
            onDistrictChange={setSelectedDistrict}
            onSearch={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className="job-count">
              <span className="job-count-label">검색된 채용공고 총</span>
              <span className="job-count-number">
                <CountUp start={0} end={searchResults.length} duration={2} />
              </span>
              <span className="job-count-unit">건</span>
              <button 
                className="job-count-button"
                onClick={async () => {
                  try {
                    const recruitmentIds = searchResults.map(item => item.recruitmentIdHash);
                    console.log("Button click - sending IDs:", recruitmentIds);
                    const response = await sendTotalRecruitments(recruitmentIds);
                    console.log("Total recruitments response:", response);
                    
                    // API 응답 데이터 처리
                    if (response && response.data) {
                      const processedData = response.data.map(item => ({
                        ...item,
                        fullAddress: item.fullAddress || '',
                        recruitmentIdHash: item.id || item.recruitmentIdHash,
                        title: item.title || '제목 없음',
                        workType: item.workType || item.workSubType || '',
                        dDay: item.dDay || 0,
                        category: item.category || selectedCategory,
                        companyName: item.companyName || '기관명 없음'
                      }));
                      console.log("Processed total recruitments data:", processedData);
                      setSearchResults(processedData);
                    }
                    
                    setIsModalOpen(true);
                  } catch (error) {
                    console.error('Error sending recruitment IDs:', error);
                  }
                }}
              >
                {'>>'} &nbsp; 확인하러 가기 
              </button>
            </div>
          )}
        </div>

        <div className="map-wrapper">
          <SearchMap markers={searchResults} />
        </div>
      </div>
      {isLoading && <div className="loading">검색 중...</div>}
      {error && <div className="error">{error}</div>}

      <SearchResultModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchResults={searchResults}
      />
    </div>
  );
}

export default Map;
