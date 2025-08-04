// src/pages/recruitment/MainRecruitmentList.jsx
import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useSearchParams, useLocation } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import "../../assets/css/MainRecruitmentList.css";
import JopList from "./JopList";
import MainRecruitmentSearch from "../modal/MainRecruitmentSearch";
import { useRecruitmentSearch } from "../../hooks/recruitment/useRecruitmentSearch";
import { COMPANY_TYPE_KEYWORDS, TEACHER_DUTY_KEYWORDS, INSTITUTION_SUB_TYPE_KEYWORDS } from "../modal/constants/keywords";
import { PROVINCE_FULLNAME_MAP } from "../modal/constants/keywords";


// 스크롤 위치 복원 커스텀 훅 (성능 최적화)
function useScrollRestoration(deps) {
  const scrollY = useRef(window.scrollY);

  useEffect(() => {
    // deps가 바뀌기 직전에 스크롤 위치 저장
    return () => {
      scrollY.current = window.scrollY;
    };
  }, deps);

  useEffect(() => {
    // deps가 바뀐 후에 스크롤 위치 복원 (부드럽게)
    const scrollOptions = {
      top: scrollY.current,
      left: 0,
      behavior: 'auto' // 즉시 복원
    };
    
    // requestAnimationFrame으로 렌더링 완료 후 실행
    requestAnimationFrame(() => {
      window.scrollTo(scrollOptions);
    });
  }, deps);
}

export function MainRecruitmentListHeader({ tabIndex, setTabIndex, selectedKeywords, onSearchClick }) {
  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  return (
    <div className="tabs-header">
      <Tabs selectedIndex={tabIndex} onSelect={setTabIndex} className="tabs-container">
        <TabList className="search">
          <Tab>전체 공고</Tab>
          <Tab>관심 공고</Tab>
        </TabList>
      </Tabs>
      <div className="search-keywords-button-row">
        {/* 모바일이 아닐 때만 태그 렌더링 */}
        {!isMobile && selectedKeywords.length > 0 && (
          <div className="selected-keywords">
            {selectedKeywords.map((keyword, index) => (
              <span key={index} className="keyword-tag">#
                {INSTITUTION_SUB_TYPE_KEYWORDS[keyword] || COMPANY_TYPE_KEYWORDS[keyword] || TEACHER_DUTY_KEYWORDS[keyword] || keyword}
              </span>
            ))}
          </div>
        )}
        {/* 모바일이 아닐 때만 검색하기 버튼 렌더링 */}
        {!isMobile && (
          <button onClick={onSearchClick} className="tab-action-button">
            검색하기
          </button>
        )}
      </div>
    </div>
  );
}

export default function MainRecruitmentList({ categoryEnum, tabIndex, selectedKeywords: propSelectedKeywords, setSelectedKeywords: propSetSelectedKeywords }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults, loading, error, searchRecruitments } = useRecruitmentSearch();
  const [localSelectedKeywords, localSetSelectedKeywords] = useState([]);
  const location = useLocation(); // ✅ 함수 안에서 선언
  const stateRecruitments = location.state || null;
  // props가 있으면 props 사용, 없으면 local state 사용
  const selectedKeywords = propSelectedKeywords !== undefined ? propSelectedKeywords : localSelectedKeywords;
  const setSelectedKeywords = propSetSelectedKeywords !== undefined ? propSetSelectedKeywords : localSetSelectedKeywords;

  const recruitmentsToDisplay = tabIndex === 0
  ? (stateRecruitments || searchResults)
  : [];

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
    useEffect(() => {
    if (tabIndex !== 0 || stateRecruitments) return; // state가 있으면 요청 생략

    // URL에서 카테고리 파라미터를 직접 확인
    const urlCategory = searchParams.get('category');
    
    if (urlCategory) {
      // URL에 카테고리가 있으면 해당 카테고리로 검색
      const params = { category: [urlCategory] };
      
      // 다른 파라미터들도 처리
      searchParams.forEach((value, key) => {
        if (key !== 'category') {
          if (
            key === 'region' ||
            key === 'dutyTypes' ||
            key === 'province' ||
            key === 'companyWorkType'
          ) {
            params[key] = value.split(',');
          } else {
            params[key] = value;
          }
        }
      });
      
      // 키워드 처리
      const keywords = [];
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          keywords.push(...value);
        } else if (value) {
          keywords.push(value);
        }
      });
      
      const normalized = keywords.map(k => {
        const short = Object.entries(PROVINCE_FULLNAME_MAP).find(([short, full]) => full === k);
        if (short) return short[0];
        const companyLabel = Object.values(COMPANY_TYPE_KEYWORDS).includes(k)
          ? k
          : Object.entries(COMPANY_TYPE_KEYWORDS).find(([code, label]) => code === k)?.[1];
        if (companyLabel) return companyLabel;
        const duty = Object.values(TEACHER_DUTY_KEYWORDS).includes(k) ? k : TEACHER_DUTY_KEYWORDS[k];
        if (duty) return duty;
        return k;
      });
      setSelectedKeywords(Array.from(new Set(normalized)));
      
      searchRecruitments(params);
    }
  }, [searchParams, tabIndex]);
  
  // 카테고리(혹은 검색 등) 값이 바뀌어도 스크롤 위치 유지
  useScrollRestoration([categoryEnum]);

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

    // 모든 필터 값을 selectedKeywords로 갱신 (항상 한글/축약명만)
    const keywords = [];
    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        keywords.push(...value);
      } else if (value) {
        keywords.push(value);
      }
    });
    const normalized = keywords.map(k => {
      // 지역
      const short = Object.entries(PROVINCE_FULLNAME_MAP).find(([short, full]) => full === k);
      if (short) return short[0];
      // 기관유형
      const label = Object.values(COMPANY_TYPE_KEYWORDS).includes(k) ? k : COMPANY_TYPE_KEYWORDS[k];
      if (label) return label;
      // 직무
      const duty = Object.values(TEACHER_DUTY_KEYWORDS).includes(k) ? k : TEACHER_DUTY_KEYWORDS[k];
      if (duty) return duty;
      return k;
    });
    setSelectedKeywords(Array.from(new Set(normalized)));

    // 전체 공고 탭에서만 서버 요청
    if (tabIndex === 0) {
      await searchRecruitments(searchParams);
    }
  };

  return (
    <div className="card-container">
      <JopList
        type={tabIndex === 0 ? "all" : "favorite"}
        categoryEnum={categoryEnum}
        {...(tabIndex === 0 ? {
          searchResults: recruitmentsToDisplay,     // ✅ 이 부분이 핵심
          loading: stateRecruitments ? false : loading,
          error
        } : {})}
      />
      {isModalOpen && (
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
