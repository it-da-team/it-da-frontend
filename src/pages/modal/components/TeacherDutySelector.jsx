import React, { useState, useEffect } from "react";
import ButtonList from "./ButtonList";
import { TEACHER_DUTY_KEYWORDS } from "../constants/keywords";

export default function TeacherDutySelector({ onKeywordChange, selectedKeywords = [] }) {
    const [selectedDuties, setSelectedDuties] = useState([]);
    const teacherDutyTypes = Object.values(TEACHER_DUTY_KEYWORDS);

    // selectedKeywords가 변경될 때마다 선택된 직무 업데이트
    useEffect(() => {
        const duties = selectedKeywords.filter(keyword => 
            teacherDutyTypes.includes(keyword)
        );
        setSelectedDuties(duties);
    }, [selectedKeywords]);

    const handleDutyChange = (item, isSelected) => {
        // selectedKeywords에 코드가 들어있으면 라벨로 변환
        const normalized = selectedKeywords.map(k => {
          const found = Object.values(TEACHER_DUTY_KEYWORDS).includes(k) ? k : TEACHER_DUTY_KEYWORDS[k];
          return found || k;
        });
        const newSelected = isSelected
            ? [...normalized, item]
            : normalized.filter(duty => duty !== item);
        setSelectedDuties(newSelected);
        onKeywordChange?.(item, isSelected);
    };

    return (
        <div className="search-section">
            <h4>상세 직군</h4>
            <ButtonList
                items={teacherDutyTypes}
                selectedItems={selectedKeywords}
                onKeywordChange={handleDutyChange}
            />
            <div className="divider" />
        </div>
    );
} 