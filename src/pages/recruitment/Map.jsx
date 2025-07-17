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
import "../../assets/css/Map.mobile.css";
import JopListItem from "./JopListItem";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 700 && window.innerWidth <= 1023);

  // 디버깅용 로그
  console.log("searchResults:", searchResults);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
      setIsTablet(window.innerWidth > 700 && window.innerWidth <= 1023);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    // city, district는 선택 옵션이므로 체크하지 않음
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
        // 중복 제거: recruitmentIdHash 또는 id 기준
        const seen = new Set();
        const processedData = response.data
          .map(item => ({
            ...item,
            fullAddress: item.fullAddress || '',
            recruitmentIdHash: item.recruitmentIdHash || item.id,
            title: item.title || '제목 없음',
            workType: item.workType || item.workSubType || '',
            dDay: item.dDay || 0,
            category: item.category || selectedCategory,
            companyName: item.companyName || '기관명 없음'
          }))
          .filter(item => {
            const key = item.recruitmentIdHash || item.id;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
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

  if (isMobile || isTablet) {
    return (
      <div className="map-area-mobile">
        <div className="mobile-map-header">
          <h2 className="search-title mobile-search-title">지역별 채용공고</h2>
          <button className="filter-btn mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>필터</button>
        </div>
        <section className="mobile-map-section">
          <SearchMap markers={searchResults} />
        </section>
        {/* 검색 결과 개수 + 리스트: 화이트 배경 카드 효과 */}
        {isMobile && searchResults && searchResults.length > 0 && (
          <div className="mobile-search-results-card">
            <div className="mobile-search-results-header">
              <span className="mobile-search-results-count">
                총 <span className="mobile-search-results-count-number">{searchResults.length}</span>건 검색됨
              </span>
            </div>
            <div className="mobile-search-results-list">
              {searchResults.map((result) => {
                const job = {
                  id: result.recruitmentIdHash || result.id,
                  title: result.title,
                  companyName: result.companyName,
                  region: result.region,
                  district: result.district,
                  category: result.category,
                  workType: result.workType,
                  dDay: result.dDay,
                };
                return (
                  <div key={job.id} className="mobile-search-result-item">
                    <JopListItem job={job} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {isMobile && searchResults && searchResults.length === 0 && !isLoading && !error && (
          <div className="empty-list-guide">
            <p>앗! 조건에 맞는 채용공고가 아직 없어요.</p>
            <p className="empty-list-sub">필터를 조정하면 다양한 지역의 공고를 확인할 수 있어요.</p>
            <button className="open-filter-btn" onClick={() => setIsFilterOpen(true)}>
              필터 다시 설정하기
            </button>
          </div>
        )}
        {isLoading && <div className="loading">검색 중...</div>}
        {error && <div className="error">{error}</div>}
        {/* 필터 모달 (슬라이드업) */}
        {isFilterOpen && (
          <div className="filter-modal mobile-filter-modal">
            <form className="search-form mobile-search-form" onSubmit={e => { e.preventDefault(); handleSearch(); setIsFilterOpen(false); }}>
              <div className="mobile-category-select-wrapper">
                <label className="search-label mobile-search-label">기관 유형</label>
                <Select
                  inputId="category-select"
                  instanceId="category-select"
                  options={CATEGORY_OPTIONS}
                  value={CATEGORY_OPTIONS.find(opt => labelToEnum[opt.value] === selectedCategory) || null}
                  onChange={handleCategorySelect}
                  placeholder="기관 유형 선택"
                  styles={{
                    ...customStyles,
                    menuPortal: base => ({ ...base, zIndex: 99999 })
                  }}
                  menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                  aria-label="기관 유형 선택"
                />
              </div>
              <div>
                <label className="search-label mobile-search-label">지역 선택</label>
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
                className="search-button mobile-search-button"
                type="submit"
              >
                검색하기
              </button>
              <button type="button" className="mobile-close-btn" onClick={() => setIsFilterOpen(false)}>닫기</button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="map-area-desktop">
      <div className="map-desktop-container">
        <section className="map-desktop-section">
          <h2 className="search-title map-desktop-search-title">지역별 채용공고</h2>
          <div className="search-subtext map-desktop-search-subtext">채용 공고 확인하기</div>
          <form className="search-form map-desktop-search-form" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
            <div className="map-desktop-category-select-wrapper">
              <label className="search-label map-desktop-search-label">기관 유형</label>
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
              <label className="search-label map-desktop-search-label">지역 선택</label>
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
              className="search-button map-desktop-search-button"
              type="submit"
            >
              검색하기
            </button>
            {searchResults.length > 0 && (
              <div className="job-count map-desktop-job-count">
                <span className="job-count-label">검색된 채용공고 총</span>
                <span className="job-count-number">
                  <CountUp start={0} end={searchResults.length} duration={2} />
                </span>
                <span className="job-count-unit">건</span>
              </div>
            )}
          </form>
        </section>
        <section className="map-desktop-map-section">
          <SearchMap markers={searchResults} />
        </section>
        {isLoading && <div className="loading">검색 중...</div>}
        {error && <div className="error">{error}</div>}
        {/* 데스크탑에서만 모달 렌더링 */}
        {!isMobile && (
          <SearchResultModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            searchResults={searchResults}
          />
        )}
      </div>
    </div>
  );
}

export default Map;
