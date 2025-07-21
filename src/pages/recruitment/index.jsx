// src/pages/recruitment/index.jsx
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { enumToLabel, labelToEnum } from "../../utils/categoryMap";
import Map from "./Map";
import MainRecruitmentList, { MainRecruitmentListHeader } from "./MainRecruitmentList";
import MainCategory from "../Home/MainCategory";
import MainRecruitmentSearch from "../modal/MainRecruitmentSearch";
import "./Recruitment.css";
import { useMediaQuery } from "react-responsive";
import { PROVINCE_FULLNAME_MAP, COMPANY_TYPE_KEYWORDS, TEACHER_DUTY_KEYWORDS } from "../modal/constants/keywords";

function Recruitment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryEnum = searchParams.get("category") ?? "KINDERGARTEN";
  const label = enumToLabel[categoryEnum] ?? "유치원";

  // 탭, 키워드, 검색 모달 상태
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // --- 스크롤 감지를 위한 상태와 로직 추가 ---
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const categorySectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 701) {
        if (isHeaderSticky) setIsHeaderSticky(false);
        return;
      }
      if (categorySectionRef.current) {
        const shouldBeSticky = categorySectionRef.current.getBoundingClientRect().bottom < 72;
        if (shouldBeSticky !== isHeaderSticky) {
          setIsHeaderSticky(shouldBeSticky);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHeaderSticky]);
  // --- 여기까지 추가 ---

  const handleSearchClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 검색 실행 및 태그 갱신
  const handleSearch = (searchParamsObj) => {
    // 검색 파라미터를 URL 쿼리 파라미터로 저장
    const newSearchParams = new URLSearchParams();
    const keywords = [];
    Object.entries(searchParamsObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        newSearchParams.set(key, value.join(","));
        keywords.push(...value);
      } else {
        newSearchParams.set(key, value);
        if (value) keywords.push(value);
      }
    });
    setSearchParams(newSearchParams);
    // 변환: 코드/풀네임이 있으면 한글/축약명으로 변환
    const normalized = keywords.map(k => {
      // 지역
      const short = Object.entries(PROVINCE_FULLNAME_MAP).find(([short, full]) => full === k);
      if (short) return short[0];
      // 기관유형: 코드가 들어오면 라벨로 변환
      const companyLabel = Object.values(COMPANY_TYPE_KEYWORDS).includes(k)
        ? k
        : Object.entries(COMPANY_TYPE_KEYWORDS).find(([code, label]) => code === k)?.[1];
      if (companyLabel) return companyLabel;
      // 직무
      const duty = Object.values(TEACHER_DUTY_KEYWORDS).includes(k) ? k : TEACHER_DUTY_KEYWORDS[k];
      if (duty) return duty;
      return k;
    });
    setSelectedKeywords(Array.from(new Set(normalized)));
    setIsModalOpen(false);
  };

  const handleCategorySelect = (catLabel) => {
    navigate(`/recruitment?category=${labelToEnum[catLabel]}`);
  };

  const handleModalCategorySelect = (catLabel) => {
    setCategoryModalOpen(false);
    navigate(`/recruitment?category=${labelToEnum[catLabel]}`);
  };

  // 카테고리 sticky 상태 관리
  const [isCategorySticky, setIsCategorySticky] = useState(false);
  const tabsBarRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (!tabsBarRef.current) return;
      const rect = tabsBarRef.current.getBoundingClientRect();
      setIsCategorySticky(rect.top <= 72); // 헤더 높이만큼
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 700 });

  // selectedKeywords에서 카테고리(한글/영문) 값 제외
  const filterTags = selectedKeywords.filter(
    (keyword) => keyword !== label && keyword !== categoryEnum
  );

  return (
    <div className="main-container recruitment-page">
      {/* --- 동적 고정 헤더 추가 --- */}
      {isHeaderSticky && !isMobile && (
        <div className="dynamic-sticky-header">
          <div className="sticky-header-content">
            <div className="sticky-header-left">
              <span className="category-dropdown-title">기관 유형 선택하기</span>
              <select
                className="category-dropdown"
                value={label}
                onChange={(e) => handleCategorySelect(e.target.value)}
              >
                {Object.keys(labelToEnum).map((catLabel) => (
                  <option key={catLabel} value={catLabel}>
                    {catLabel}
                  </option>
                ))}
              </select>
            </div>
            <div className="sticky-header-right">
              <div className="sticky-header-tags">
                {filterTags.length > 0 ? (
                  filterTags.map((keyword, idx) => (
                    <span key={idx} className="filter-tag sticky-tag">
                      #{keyword}
                    </span>
                  ))
                ) : (
                  <span className="filter-tag-placeholder sticky-placeholder">
                    선택된 필터가 없습니다.
                  </span>
                )}
              </div>
              <button className="filter-search-button" onClick={handleSearchClick}>
                상세 필터 검색
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- 여기까지 추가 --- */}

      {!isMobile && <Map label={label} />}
      {/* 모바일 전용 UI: isMobile일 때만 렌더링 */}
      {/* 모바일에서는 Map을 렌더링하지 않음. /region에서만 Map 사용 */}
      {isMobile && (
        <>
          {/* 모바일 필터/조건 검색 바 */}
          <div className="mobile-filter-bar">
            <div className="mobile-filter-tags">
              {filterTags.length > 0 ? (
                filterTags.map((keyword, idx) => (
                  <span key={idx} className="filter-tag">#{keyword}</span>
                ))
              ) : (
                <span className="filter-tag filter-tag-placeholder">필터를 선택하세요</span>
              )}
            </div>
            <button className="change-category-btn" onClick={() => setIsMobileFilterOpen(true)}>
              변경하기
            </button>
          </div>
          {/* 안내 문구 */}
          <p className="mobile-search-hint">기관, 지역, 직무 등 모든 조건을 한 번에 변경할 수 있습니다.</p>
          {/* 모바일 카테고리 변경 모달 */}
          {categoryModalOpen && (
            <div className="category-modal-backdrop" onClick={() => setCategoryModalOpen(false)}>
              <div className="category-modal-content" onClick={e => e.stopPropagation()}>
                <h4 style={{marginBottom: '1.2rem'}}>카테고리 선택</h4>
                <MainCategory
                  onCategorySelect={handleModalCategorySelect}
                  selected={label}
                  compact={true}
                  variant="recruitment"
                  iconClass="category-icon-detail"
                />
                <button className="change-category-btn" style={{marginTop: '1.5rem'}} onClick={() => setCategoryModalOpen(false)}>닫기</button>
              </div>
            </div>
          )}
          {/* 모바일 필터 모달 */}
          {isMobileFilterOpen && (
            <div className="category-modal-backdrop" onClick={() => setIsMobileFilterOpen(false)}>
              <div className="category-modal-content" onClick={e => e.stopPropagation()}>
                <h4 style={{marginBottom: '1.2rem'}}>필터/조건 검색</h4>
                <MainRecruitmentSearch
                  onClose={() => setIsMobileFilterOpen(false)}
                  onSearch={handleSearch}
                  initialCategory={categoryEnum}
                  selectedKeywords={selectedKeywords}
                  setSelectedKeywords={setSelectedKeywords}
                />
                <button className="change-category-btn" style={{marginTop: '1.5rem'}} onClick={() => setIsMobileFilterOpen(false)}>닫기</button>
              </div>
            </div>
          )}
        </>
      )}
      {/* PC/태블릿용 기존 UI */}
      {/* 1. 카테고리 메뉴 */}
      {!isMobile && (
        <section ref={categorySectionRef} className="main-category main-category--recruitment compact">
          <div className="main-category-list-fixed">
            <MainCategory
              variant="recruitment"
              compact
              selected={label}
              onCategorySelect={handleCategorySelect}
              iconClass="category-icon-detail"
            />
          </div>
        </section>
      )}
      {/* 2. 탭바 */}
      <div className="sticky-tabs-bar" ref={tabsBarRef}>
        <MainRecruitmentListHeader
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          selectedKeywords={selectedKeywords}
          onSearchClick={handleSearchClick}
        />
      </div>
      <MainRecruitmentList
        categoryEnum={categoryEnum}
        tabIndex={tabIndex}
        selectedKeywords={selectedKeywords}
      />
      {/* 모바일이 아닐 때만 필터 검색 모달 렌더링 */}
      {!isMobile && isModalOpen && (
        <MainRecruitmentSearch
          onClose={handleCloseModal}
          onSearch={handleSearch}
          initialCategory={categoryEnum}
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
        />
      )}
    </div>
  );
}

export default Recruitment;
