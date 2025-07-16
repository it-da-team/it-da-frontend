// src/pages/recruitment/index.jsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { enumToLabel, labelToEnum } from "../../utils/categoryMap";
import Map from "./Map";
import MainRecruitmentList, { MainRecruitmentListHeader } from "./MainRecruitmentList";
import MainCategory from "../Home/MainCategory";
import MainRecruitmentSearch from "../modal/MainRecruitmentSearch";
import "./Recruitment.css";

function Recruitment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryEnum = searchParams.get("category") ?? "KINDERGARTEN";
  const label = enumToLabel[categoryEnum] ?? "유치원";

  // 탭, 검색 모달 상태
  const [tabIndex, setTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 검색 태그를 항상 쿼리 파라미터에서 파싱해서 유지
  const selectedKeywords = useMemo(() => {
    const keywords = [];
    searchParams.forEach((value, key) => {
      if (value) {
        if (value.includes(",")) {
          keywords.push(...value.split(","));
        } else {
          keywords.push(value);
        }
      }
    });
    return keywords;
  }, [searchParams]);

  const handleSearchClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 검색 실행 및 태그 갱신
  const handleSearch = (searchParamsObj) => {
    const newSearchParams = new URLSearchParams();
    Object.entries(searchParamsObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        newSearchParams.set(key, value.join(","));
      } else {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams);
    setIsModalOpen(false);
  };

  const handleCategorySelect = (catLabel) => {
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

  return (
    <div className="main-container">
      <Map label={label} />
      {/* 1. 원래 위치(스크롤 전) */}
      {!isCategorySticky && (
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
      {/* 2. 탭바(sticky) */}
      <div className="sticky-tabs-bar" ref={tabsBarRef}>
        <MainRecruitmentListHeader
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          selectedKeywords={selectedKeywords}
          onSearchClick={handleSearchClick}
        />
        {/* 3. sticky 위치(스크롤 후) */}
        {isCategorySticky && (
          <div className="sticky-category-bar">
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
          </div>
        )}
      </div>
      <MainRecruitmentList
        categoryEnum={categoryEnum}
        tabIndex={tabIndex}
        selectedKeywords={selectedKeywords}
      />
      {isModalOpen && (
        <MainRecruitmentSearch
          onClose={handleCloseModal}
          onSearch={handleSearch}
          initialCategory={categoryEnum}
        />
      )}
    </div>
  );
}

export default Recruitment;
