import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import Select from "react-select";
import { fetchMapRecruitments, sendTotalRecruitments } from "../../api/recruitment/recruitmentMapApi";
import MapDropdown from "./MapDropdown";
import SearchMap from "./SearchMap";
import MainCategory from "../Home/MainCategory";
import { labelToEnum, enumToLabel } from "../../utils/categoryMap";
import SearchResultModal from "./modal/SearchResultModal";
import "../../assets/css/Map.css";
import "../../assets/css/MapDropdown.css";

const CATEGORY_OPTIONS = [
  { value: "유치원", label: "유치원" },
  { value: "어린이집", label: "어린이집" },
  { value: "교육 회사", label: "교육 회사" },
  { value: "아동 센터/학원", label: "아동 센터/학원" },
  { value: "방문 교사", label: "방문 교사" },
  { value: "특별활동 센터", label: "특별활동 센터" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 44,
    fontSize: '1.1rem',
    borderRadius: 8,
    borderColor: state.isFocused ? '#FFB300' : '#FFC107',
    boxShadow: state.isFocused ? '0 0 0 2px #FFF3E0' : 'none',
    transition: 'border-color 0.2s',
    background: state.isDisabled ? '#f5f5f5' : '#fff',
    color: '#222',
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  }),
  menu: base => ({ ...base, zIndex: 20 }),
  option: (base, state) => ({
    ...base,
    fontSize: '1.1rem',
    color: state.isSelected ? '#FF6F00' : '#222',
    background: state.isSelected ? '#FFF8E1' : state.isFocused ? '#FFFDE7' : '#fff',
    fontWeight: state.isSelected ? 700 : 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  placeholder: base => ({ ...base, color: '#bbb', fontWeight: 400, fontSize: '1.1rem' }),
  singleValue: base => ({ ...base, color: '#222', fontWeight: 500, fontSize: '1.1rem' }),
  groupHeading: base => ({ ...base, color: '#888', fontSize: '1.1rem', fontWeight: 600, padding: '4px 8px' }),
};

function Map() {
  const [selectedCategory, setSelectedCategory] = useState("KINDERGARTEN");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 카테고리 선택 핸들러
  const handleCategorySelect = (option) => {
    if (!option) return;
    const categoryEnum = labelToEnum[option.value];
    setSelectedCategory(categoryEnum);
  };

  const handleSearch = async () => {
    if (!province) {
      alert("시/도를 선택해주세요.");
      return;
    }
    if (!city) {
      alert("시/군을 선택해주세요.");
      return;
    }
    if (!district) {
      alert("구/군을 선택해주세요.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = {
        category: selectedCategory,
        province,
        city,
        district
      };

      console.log("Search params:", searchParams);
      const response = await fetchMapRecruitments(searchParams);

      if (response && response.data) {
        const processedData = response.data.map(item => ({
          ...item,
          fullAddress: item.fullAddress || '',
          recruitmentIdHash: item.recruitmentIdHash || item.id,
          title: item.title || '제목 없음',
          workType: item.workType || item.workSubType || '',
          dDay: item.dDay || 0,
          category: item.category || selectedCategory,
          companyName: item.companyName || '기관명 없음'
        }));
        setSearchResults(processedData);
        const recruitmentIds = processedData.map(item => item.recruitmentIdHash);
        await sendTotalRecruitments(recruitmentIds);
      }
    } catch (error) {
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: '#f9fafb', width: '100%', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '1rem 0',
          boxSizing: 'border-box',
        }}
      >
        <section
          style={{
            flex: '0 0 400px',
            minWidth: 260,
            background: '#fff',
            borderRadius: '1.1rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.07)',
            padding: '2rem 1.5rem',
            height: '405px',
            minHeight: '405px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <h2 className="search-title" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>지역별 채용공고</h2>
          <div className="search-subtext" style={{ fontSize: '1rem', fontWeight: 500, color: '#666', marginBottom: '0.5rem' }}>채용 공고 확인하기</div>
          <form className="search-form" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '14px', maxWidth: '100%' }} onSubmit={e => { e.preventDefault(); handleSearch(); }}>
            <div style={{ marginBottom: '18px', marginTop: '24px' }}>
              <label className="search-label" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6, display: 'block' }}>기관 유형</label>
              <Select
                inputId="category-select"
                instanceId="category-select"
                options={CATEGORY_OPTIONS}
                value={CATEGORY_OPTIONS.find(opt => labelToEnum[opt.value] === selectedCategory) || null}
                onChange={handleCategorySelect}
                placeholder="기관 유형 선택"
                styles={{
                  ...customStyles,
                  control: (base, state) => ({
                    ...base,
                    minHeight: 36,
                    fontSize: '1rem',
                    borderRadius: 6,
                    borderColor: state.isFocused ? '#FFB300' : '#FFC107',
                    boxShadow: state.isFocused ? '0 0 0 2px #FFF3E0' : 'none',
                    background: state.isDisabled ? '#f5f5f5' : '#fff',
                    color: '#222',
                    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
                    padding: '0 4px',
                  }),
                  option: (base, state) => ({
                    ...base,
                    fontSize: '1rem',
                    color: state.isSelected ? '#FF6F00' : '#222',
                    background: state.isSelected ? '#FFF8E1' : state.isFocused ? '#FFFDE7' : '#fff',
                    fontWeight: state.isSelected ? 700 : 400,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }),
                  placeholder: base => ({ ...base, color: '#bbb', fontWeight: 400, fontSize: '1rem' }),
                  singleValue: base => ({ ...base, color: '#222', fontWeight: 500, fontSize: '1rem' }),
                }}
                aria-label="기관 유형 선택"
              />
            </div>
            <div>
              <label className="search-label" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6, display: 'block' }}>지역 선택</label>
              <MapDropdown
                province={province}
                city={city}
                district={district}
                onProvinceChange={setProvince}
                onCityChange={setCity}
                onDistrictChange={setDistrict}
              />
            </div>
            <button
              className="search-button"
              type="submit"
              style={{
                height: 36,
                fontSize: '1rem',
                borderRadius: 6,
                marginTop: '12px',
                background: 'linear-gradient(90deg, #ffe082 0%, #ffc107 100%)',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 1px 4px rgba(255,193,7,0.08)',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ffd54f 0%, #ffb300 100%)'}
              onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ffe082 0%, #ffc107 100%)'}
            >
              검색하기
            </button>
            {searchResults.length > 0 && (
              <div className="job-count" style={{ marginTop: '0.5rem' }}>
                <span className="job-count-label">검색된 채용공고 총</span>
                <span className="job-count-number">
                  <CountUp start={0} end={searchResults.length} duration={2} />
                </span>
                <span className="job-count-unit">건</span>
              </div>
            )}
          </form>
        </section>
        <section
          style={{
            flex: 1,
            minWidth: 650,
            background: '#fff',
            borderRadius: '1.1rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.07)',
            height: '450px',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <SearchMap markers={searchResults} />
        </section>
        {isLoading && <div className="loading">검색 중...</div>}
        {error && <div className="error">{error}</div>}
        <SearchResultModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          searchResults={searchResults}
        />
      </div>
    </div>
  );
}

export default Map;
