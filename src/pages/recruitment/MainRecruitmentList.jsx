// src/pages/recruitment/MainRecruitmentList.jsx
import React, { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useSearchParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import "../../assets/css/MainRecruitmentList.css";
import JopList from "./JopList";
import MainRecruitmentSearch from "../modal/MainRecruitmentSearch";
import { useRecruitmentSearch } from "../../hooks/recruitment/useRecruitmentSearch";
import { COMPANY_TYPE_KEYWORDS, TEACHER_DUTY_KEYWORDS } from "../modal/constants/keywords";

export default function MainRecruitmentList({ categoryEnum }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults, loading, error, searchRecruitments } = useRecruitmentSearch(categoryEnum);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  console.log('MainRecruitmentList categoryEnum:', categoryEnum); // 디버깅용

  // 키워드 코드를 표시 값으로 변환
  const getDisplayValue = (keyword) => {
    // 기관 유형 변환
    if (keyword === 'DAYCARE') return COMPANY_TYPE_KEYWORDS.DAYCARE;
    if (keyword === 'KINDERGARTEN') return COMPANY_TYPE_KEYWORDS.KINDERGARTEN;

    // 교사 담당 유형 변환
    const dutyType = Object.entries(TEACHER_DUTY_KEYWORDS).find(([_, value]) => value === keyword);
    if (dutyType) return dutyType[1];

    // 지역은 그대로 표시
    return keyword;
  };

  // URL 쿼리 파라미터가 있으면 검색 실행
  useEffect(() => {
    const params = {};
    const keywords = [];
    searchParams.forEach((value, key) => {
      if (key === 'category' || key === 'region' || key === 'dutyTypes') {
        params[key] = value.split(',');
        keywords.push(...value.split(','));
      } else {
        params[key] = value;
        if (value) keywords.push(value);
      }
    });

    setSelectedKeywords(keywords);

    // 검색 조건이 없으면 URL 파라미터 초기화하고 초기 카테고리로 돌아가기
    if (Object.keys(params).length === 0) {
      const initialParams = new URLSearchParams();
      initialParams.set('category', categoryEnum);
      setSearchParams(initialParams);
      searchRecruitments({ category: [categoryEnum] });
    } else {
      searchRecruitments(params);
    }
  }, [searchParams, categoryEnum]);

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async (searchParams) => {
    // 검색 파라미터를 URL 쿼리 파라미터로 저장
    const newSearchParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        newSearchParams.set(key, value.join(','));
      } else {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams);

    await searchRecruitments(searchParams);
  };

  return (
    <div className="card-container">
      <Tabs className="tabs-container">
        <div className="tabs-header">
          <TabList className="search">
            <Tab>전체 공고</Tab>
            <Tab>관심 공고</Tab>
          </TabList>

          {/* ✅ 버튼과 키워드를 나란히 배치 */}
          <div className="search-keywords-button-row">
            {selectedKeywords.length > 0 && (
              <div className="selected-keywords">
                {selectedKeywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag">#{getDisplayValue(keyword)}</span>
                ))}
              </div>
            )}
            <button 
              onClick={handleSearchClick}
              className="tab-action-button"
            >
              검색하기
            </button>
          </div>
        </div>

        <TabPanel>
          <JopList 
            type="all" 
            categoryEnum={categoryEnum} 
            searchResults={searchResults}
            loading={loading}
            error={error}
          />
        </TabPanel>
        <TabPanel>
          <JopList 
            type="favorite" 
            categoryEnum={categoryEnum}
            searchResults={searchResults}
            loading={loading}
            error={error}
          />
        </TabPanel>
      </Tabs>

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
