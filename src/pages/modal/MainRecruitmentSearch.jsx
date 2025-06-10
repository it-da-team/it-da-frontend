import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../assets/css/Modal.css";

import SearchHeader from "./components/SearchHeader";
import RegionSelector from "./components/RegionSelector";
import CompanyTypeSelector from "./components/CompanyTypeSelector";
import InstitutionSubTypeSelector from "./components/InstitutionSubTypeSelector";
import TeacherDutySelector from "./components/TeacherDutySelector";
import SelectedKeywordTags from "./components/SelectedKeywordTags";

import {
  COMPANY_TYPE_KEYWORDS,
  INSTITUTION_SUB_TYPE_KEYWORDS,
  KEYWORD_GROUPS,
  TEACHER_DUTY_KEYWORDS,
  KEYWORD_PRIORITY
} from "./constants/keywords";

export function MainRecruitmentSearch({ onClose, onSearch, initialCategory }) {
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // URL 파라미터에서 현재 선택된 키워드들을 가져와서 초기화
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keywords = [];
    let companyTypes = [];

    params.forEach((value, key) => {
      if (key === 'category') {
        const categories = value.split(',');
        categories.forEach(cat => {
          if (cat === 'DAYCARE') {
            companyTypes.push(COMPANY_TYPE_KEYWORDS.DAYCARE);
            keywords.push(COMPANY_TYPE_KEYWORDS.DAYCARE);
          } else if (cat === 'KINDERGARTEN') {
            companyTypes.push(COMPANY_TYPE_KEYWORDS.KINDERGARTEN);
            keywords.push(COMPANY_TYPE_KEYWORDS.KINDERGARTEN);
          }
        });
      } else if (key === 'region') {
        const regions = value.split(',');
        regions.forEach(region => keywords.push(region));
      } else if (key === 'dutyTypes') {
        const duties = value.split(',');
        duties.forEach(duty => keywords.push(duty));
      }
    });

    setSelectedCompanyTypes(companyTypes);
    setSelectedKeywords(keywords);
  }, []);

  console.log('MainRecruitmentSearch initialCategory:', initialCategory); // 디버깅용
  console.log('Selected Keywords:', selectedKeywords); // 디버깅용

  const showKindergarten = selectedCompanyTypes.includes(COMPANY_TYPE_KEYWORDS.KINDERGARTEN);
  const showDaycare = selectedCompanyTypes.includes(COMPANY_TYPE_KEYWORDS.DAYCARE);
  const showInstitutionSub = showKindergarten || showDaycare;

  const getKeywordPriority = (keyword) => {
    for (const [priority, keywords] of Object.entries(KEYWORD_GROUPS)) {
      if (keywords.includes(keyword)) {
        return Number(priority);
      }
    }
    return 999;
  };

  const updateKeywords = (item, isSelected) => {
    setSelectedKeywords(prev => {
      let newKeywords;

      if (isSelected) {
        newKeywords = [...prev, item];
      } else {
        // 유치원/어린이집 선택 해제 시 관련 키워드 전체 제거
        if (item === COMPANY_TYPE_KEYWORDS.DAYCARE || item === COMPANY_TYPE_KEYWORDS.KINDERGARTEN) {
          const relatedKeywords = [
            item,
            ...(item === COMPANY_TYPE_KEYWORDS.DAYCARE
              ? [
                  INSTITUTION_SUB_TYPE_KEYWORDS.PUBLIC_DAYCARE,
                  INSTITUTION_SUB_TYPE_KEYWORDS.PRIVATE_DAYCARE,
                  INSTITUTION_SUB_TYPE_KEYWORDS.HOME_DAYCARE,
                  INSTITUTION_SUB_TYPE_KEYWORDS.WORKPLACE_DAYCARE,
                  INSTITUTION_SUB_TYPE_KEYWORDS.CORPORATE_DAYCARE,
                  INSTITUTION_SUB_TYPE_KEYWORDS.COOPERATIVE_DAYCARE,
                  INSTITUTION_SUB_TYPE_KEYWORDS.ANY
                ]
              : [
                  INSTITUTION_SUB_TYPE_KEYWORDS.PUBLIC_KINDERGARTEN,
                  INSTITUTION_SUB_TYPE_KEYWORDS.PRIVATE_KINDERGARTEN,
                  INSTITUTION_SUB_TYPE_KEYWORDS.ANY
                ])
          ];

          const isDaycareSelected = selectedCompanyTypes.includes(COMPANY_TYPE_KEYWORDS.DAYCARE);
          const isKindergartenSelected = selectedCompanyTypes.includes(COMPANY_TYPE_KEYWORDS.KINDERGARTEN);
          const willBothBeDeselected = (item === COMPANY_TYPE_KEYWORDS.DAYCARE && !isKindergartenSelected) ||
                                       (item === COMPANY_TYPE_KEYWORDS.KINDERGARTEN && !isDaycareSelected);

          if (willBothBeDeselected) {
            relatedKeywords.push(
              TEACHER_DUTY_KEYWORDS.MAIN_TEACHER,
              TEACHER_DUTY_KEYWORDS.SUB_TEACHER,
              TEACHER_DUTY_KEYWORDS.ASSISTANT,
              TEACHER_DUTY_KEYWORDS.SUBSTITUTE,
              TEACHER_DUTY_KEYWORDS.NURI_CLASS,
              TEACHER_DUTY_KEYWORDS.EXTENDED_CLASS,
              TEACHER_DUTY_KEYWORDS.AFTER_SCHOOL,
              TEACHER_DUTY_KEYWORDS.SUPPORT_STAFF,
              TEACHER_DUTY_KEYWORDS.NEW_TEACHER
            );
          }

          newKeywords = prev.filter(keyword => !relatedKeywords.includes(keyword));
        } else {
          newKeywords = prev.filter(k => k !== item);
        }
      }

      return newKeywords.sort((a, b) => getKeywordPriority(a) - getKeywordPriority(b));
    });
  };

  const handleSearch = () => {
    // 선택된 모든 기관 유형을 category 리스트에 포함
    const category = selectedCompanyTypes.map(type => {
      if (type === COMPANY_TYPE_KEYWORDS.DAYCARE) return "DAYCARE";
      if (type === COMPANY_TYPE_KEYWORDS.KINDERGARTEN) return "KINDERGARTEN";
      return null;
    }).filter(Boolean); // null 값 제거

    // 검색 파라미터 구성
    const searchParams = {
      // 지역 정보
      region: selectedKeywords
        .filter(keyword => KEYWORD_GROUPS[KEYWORD_PRIORITY.REGION]?.includes(keyword)) || [],
      district: [],

      // 교사 담당 유형 (dutyTypes)
      dutyTypes: selectedKeywords
        .filter(keyword => KEYWORD_GROUPS[KEYWORD_PRIORITY.TEACHER_DUTY]?.includes(keyword)) || [],

      // 카테고리 - 선택된 기관 유형이 없으면 초기 카테고리 사용
      category: category.length > 0 ? category : [initialCategory]
    };

    // 빈 배열과 null 값 제거
    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== null;
      })
    );

    console.log('Search params:', filteredParams); // 디버깅용
    console.log('Initial category:', initialCategory); // 디버깅용

    // 아무것도 선택하지 않았으면 초기 카테고리만 포함한 객체 전달
    if (Object.keys(filteredParams).length === 0) {
      onSearch({ category: [initialCategory] });
    } else {
      onSearch(filteredParams);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <SearchHeader onClose={onClose} />
        <SelectedKeywordTags keywords={selectedKeywords} />

        <RegionSelector 
          onKeywordChange={updateKeywords}
          selectedKeywords={selectedKeywords}
        />

        <CompanyTypeSelector
          selectedItems={selectedCompanyTypes}
          onChange={setSelectedCompanyTypes}
          onKeywordChange={updateKeywords}
        />

        <AnimatePresence mode="wait">
          {showInstitutionSub && (
            <motion.div
              layout
              key="institution-block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <InstitutionSubTypeSelector
                showKindergarten={showKindergarten}
                showDaycare={showDaycare}
                onKeywordChange={updateKeywords}
                selectedKeywords={selectedKeywords}
              />
              <TeacherDutySelector 
                onKeywordChange={updateKeywords}
                selectedKeywords={selectedKeywords}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="search-actions">
          <button className="search-button" onClick={handleSearch}>검색</button>
          <button className="cancel-button" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default MainRecruitmentSearch;
