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
  // 홈에서 지역 검색으로 온 경우 "ALL", 아니면 기본값 사용
  const regionParam = searchParams.get("region");
  const categoryEnum = searchParams.get("category") ?? (regionParam ? "ALL" : "KINDERGARTEN");
  const label = enumToLabel[categoryEnum] ?? "유치원";

  // 탭, 키워드, 검색 모달 상태
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // --- 스크롤 감지를 위한 상태와 로직 (모든 컨테이너 디버깅) ---
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const containers = [
      window,
      document,
      document.documentElement,
      document.body,
      document.querySelector('.main-container')
    ].filter(Boolean);

    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        (document.querySelector('.main-container')?.scrollTop ?? 0);
      console.log('SCROLL DEBUG', { scrollTop });
      const shouldBeSticky = scrollTop > 150;
      if (shouldBeSticky && !isHeaderSticky) setIsHeaderSticky(true);
      else if (!shouldBeSticky && isHeaderSticky) setIsHeaderSticky(false);
    };

    containers.forEach(c => c.addEventListener('scroll', handleScroll));
    handleScroll();

    return () => {
      containers.forEach(c => c.removeEventListener('scroll', handleScroll));
    };
  }, [isHeaderSticky]);

  const handleSearchClick = () => {
    if (isMobile) {
      setIsMobileFilterOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };
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
    navigate(`/recruitment?category=${labelToEnum[catLabel]}`);
  };

  // isCategorySticky와 tabsBarRef 관련 로직은 모두 제거되었습니다.

  const isMobile = useMediaQuery({ maxWidth: 700 });

  // selectedKeywords에서 카테고리(한글/영문) 값 제외
  const filterTags = selectedKeywords.filter(
    (keyword) => keyword !== label && keyword !== categoryEnum
  );

  return (
    <>
      {/* --- 동적 고정 헤더 (원래 로직으로 복원) --- */}
      {isHeaderSticky && (
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

      <div className="main-container recruitment-page">
        {!isMobile && <Map label={label} />}
        
        {/* 모바일 UI */}
        {isMobile && (
          <>
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
            {/* categoryModalOpen 관련 로직은 제거되었습니다. */}
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

        {/* PC/태블릿 UI */}
        {!isMobile && (
          <section className="main-category main-category--recruitment compact">
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

        <div className="sticky-tabs-bar">
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

        {/* 모달들 */}
        {isMobile ? (
          isMobileFilterOpen && (
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
          )
        ) : (
          isModalOpen && (
            <MainRecruitmentSearch
              onClose={handleCloseModal}
              onSearch={handleSearch}
              initialCategory={categoryEnum}
              selectedKeywords={selectedKeywords}
              setSelectedKeywords={setSelectedKeywords}
            />
          )
        )}
      </div>
    </>
  );
}

export default Recruitment;
