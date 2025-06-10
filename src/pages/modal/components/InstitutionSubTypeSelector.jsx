import React, { useState, useEffect } from "react";
import ButtonList from "./ButtonList";
import { INSTITUTION_SUB_TYPE_KEYWORDS } from "../constants/keywords";

export default function InstitutionSubTypeSelector({ showKindergarten, showDaycare, onKeywordChange, selectedKeywords = [] }) {
  const [selectedKindergartenTypes, setSelectedKindergartenTypes] = useState([]);
  const [selectedDaycareTypes, setSelectedDaycareTypes] = useState([]);

  const kindergartenTypes = [
    INSTITUTION_SUB_TYPE_KEYWORDS.PUBLIC_KINDERGARTEN,
    INSTITUTION_SUB_TYPE_KEYWORDS.PRIVATE_KINDERGARTEN,
    INSTITUTION_SUB_TYPE_KEYWORDS.ANY
  ];
  
  const daycareTypes = [
    INSTITUTION_SUB_TYPE_KEYWORDS.PUBLIC_DAYCARE,
    INSTITUTION_SUB_TYPE_KEYWORDS.PRIVATE_DAYCARE,
    INSTITUTION_SUB_TYPE_KEYWORDS.HOME_DAYCARE,
    INSTITUTION_SUB_TYPE_KEYWORDS.WORKPLACE_DAYCARE,
    INSTITUTION_SUB_TYPE_KEYWORDS.CORPORATE_DAYCARE,
    INSTITUTION_SUB_TYPE_KEYWORDS.COOPERATIVE_DAYCARE,
    INSTITUTION_SUB_TYPE_KEYWORDS.ANY
  ];

  // selectedKeywords가 변경될 때마다 선택된 기관 서브 타입 업데이트
  useEffect(() => {
    if (showKindergarten) {
      const types = selectedKeywords.filter(keyword => 
        kindergartenTypes.includes(keyword)
      );
      setSelectedKindergartenTypes(types);
    }
    if (showDaycare) {
      const types = selectedKeywords.filter(keyword => 
        daycareTypes.includes(keyword)
      );
      setSelectedDaycareTypes(types);
    }
  }, [selectedKeywords, showKindergarten, showDaycare]);

  // 부모 컴포넌트의 선택 상태가 변경될 때 하위 태그들 초기화
  useEffect(() => {
    if (!showKindergarten) {
      selectedKindergartenTypes.forEach(type => {
        onKeywordChange?.(type, false);
      });
      setSelectedKindergartenTypes([]);
    }
    if (!showDaycare) {
      selectedDaycareTypes.forEach(type => {
        onKeywordChange?.(type, false);
      });
      setSelectedDaycareTypes([]);
    }
  }, [showKindergarten, showDaycare]);

  const handleKindergartenTypeChange = (item, isSelected) => {
    const newSelected = isSelected
      ? [...selectedKindergartenTypes, item]
      : selectedKindergartenTypes.filter(type => type !== item);
    setSelectedKindergartenTypes(newSelected);
    onKeywordChange?.(item, isSelected);
  };

  const handleDaycareTypeChange = (item, isSelected) => {
    const newSelected = isSelected
      ? [...selectedDaycareTypes, item]
      : selectedDaycareTypes.filter(type => type !== item);
    setSelectedDaycareTypes(newSelected);
    onKeywordChange?.(item, isSelected);
  };

  if (!showKindergarten && !showDaycare) return null;

  return (
    <div className="search-section institution-section">
      <h4>기관 서브 유형</h4>
      <div className="sub-type-container">
        {showKindergarten && (
          <div className="sub-type-section">
            <h5>유치원 유형</h5>
            <ButtonList
              items={kindergartenTypes}
              selectedItems={selectedKindergartenTypes}
              onKeywordChange={handleKindergartenTypeChange}
            />
          </div>
        )}
        {showDaycare && (
          <div className="sub-type-section">
            <h5>어린이집 유형</h5>
            <ButtonList
              items={daycareTypes}
              selectedItems={selectedDaycareTypes}
              onKeywordChange={handleDaycareTypeChange}
            />
          </div>
        )}
      </div>
      <div className="divider" />
    </div>
  );
}
