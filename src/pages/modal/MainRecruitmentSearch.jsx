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
  KEYWORD_PRIORITY,
  PROVINCE_FULLNAME_MAP
} from "./constants/keywords";

export function MainRecruitmentSearch({ onClose, onSearch, initialCategory, selectedKeywords = [], setSelectedKeywords = () => {} }) {
  // 기관 유형만 추출
  const selectedCompanyTypes = selectedKeywords.filter(
    k => Object.values(COMPANY_TYPE_KEYWORDS).includes(k)
  );
  const showKindergarten = selectedCompanyTypes.includes(COMPANY_TYPE_KEYWORDS.KINDERGARTEN);
  const showDaycare = selectedCompanyTypes.includes(COMPANY_TYPE_KEYWORDS.DAYCARE);
  const showInstitutionSub = showKindergarten || showDaycare;

  // 키워드 추가/제거 (모든 Selector에서 사용)
  const updateKeywords = (item, isSelected) => {
    setSelectedKeywords(prev => {
      let newKeywords;
      if (isSelected) {
        newKeywords = [...prev, item];
      } else {
        newKeywords = prev.filter(k => k !== item);
      }
      return Array.from(new Set(newKeywords)); // 중복 방지
    });
  };

  // 어린이집/유치원이 선택 해제되면 서브유형, 상세직군도 해제
  useEffect(() => {
    // 선택된 기관 유형
    const hasKindergarten = selectedKeywords.includes(COMPANY_TYPE_KEYWORDS.KINDERGARTEN);
    const hasDaycare = selectedKeywords.includes(COMPANY_TYPE_KEYWORDS.DAYCARE);
    let filtered = selectedKeywords;
    // 유치원이 해제되면 유치원 서브유형 제거
    if (!hasKindergarten) {
      filtered = filtered.filter(k => !Object.values(INSTITUTION_SUB_TYPE_KEYWORDS).slice(0,2).includes(k));
    }
    // 어린이집이 해제되면 어린이집 서브유형 제거
    if (!hasDaycare) {
      filtered = filtered.filter(k => !Object.values(INSTITUTION_SUB_TYPE_KEYWORDS).slice(2).includes(k));
    }
    // 둘 다 해제되면 상세직군(교사 담당)도 제거
    if (!hasKindergarten && !hasDaycare) {
      filtered = filtered.filter(k => !Object.values(TEACHER_DUTY_KEYWORDS).includes(k));
    }
    if (filtered.length !== selectedKeywords.length) {
      setSelectedKeywords(filtered);
    }
  }, [selectedKeywords, setSelectedKeywords]);

  // 검색 실행 (서버 전송 시에만 지역 풀네임/코드 변환)
  const handleSearch = () => {
    // 지역(축약명) → 서버 전송 시에만 풀네임으로 변환
    const provinceArr = selectedKeywords
      .filter(keyword => KEYWORD_GROUPS[KEYWORD_PRIORITY.REGION]?.includes(keyword))
      .map(short => PROVINCE_FULLNAME_MAP[short] || short);
    // 기관 유형(한글 라벨) → 서버 전송 시에만 코드로 변환
    const category = selectedKeywords
      .filter(keyword => KEYWORD_GROUPS[KEYWORD_PRIORITY.COMPANY_TYPE]?.includes(keyword))
      .map(label => {
        const entry = Object.entries(COMPANY_TYPE_KEYWORDS).find(([, v]) => v === label);
        return entry ? entry[0] : label;
      });
    // 중분류(기관 서브 유형)
    const companyWorkTypeArr = selectedKeywords.filter(
      keyword => KEYWORD_GROUPS[KEYWORD_PRIORITY.INSTITUTION_SUB_TYPE]?.includes(keyword)
    );
    // 소분류(교사 담당 유형) - 서버 Enum 값으로 변환
    const dutyTypes = selectedKeywords
      .filter(keyword => KEYWORD_GROUPS[KEYWORD_PRIORITY.TEACHER_DUTY]?.includes(keyword))
      .map(label => {
        const entry = Object.entries(TEACHER_DUTY_KEYWORDS).find(([, v]) => v === label);
        return entry ? entry[0] : label;
      });
    const searchParams = {};
    if (provinceArr.length > 0) searchParams.province = provinceArr;
    if (category.length > 0) searchParams.category = category;
    if (companyWorkTypeArr.length > 0) searchParams.companyWorkType = companyWorkTypeArr;
    if (dutyTypes.length > 0) searchParams.dutyTypes = dutyTypes;
    if (Object.keys(searchParams).length === 0) {
      onSearch({ category: [initialCategory] });
    } else {
      onSearch(searchParams);
    }
    onClose();
  };

  // 초기화 버튼
  const handleReset = () => {
    setSelectedKeywords([]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <SearchHeader onClose={onClose} onReset={handleReset} />
        <SelectedKeywordTags keywords={selectedKeywords} />
        <RegionSelector
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
          onKeywordChange={updateKeywords}
        />
        <CompanyTypeSelector
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
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
                selectedKeywords={selectedKeywords}
                setSelectedKeywords={setSelectedKeywords}
                onKeywordChange={updateKeywords}
              />
              <TeacherDutySelector
                selectedKeywords={selectedKeywords}
                setSelectedKeywords={setSelectedKeywords}
                onKeywordChange={updateKeywords}
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
