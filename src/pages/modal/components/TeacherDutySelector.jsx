import React, { useState } from "react";
import ButtonList from "./ButtonList";

export default function TeacherDutySelector({ onKeywordChange }) {
    const [selectedDuties, setSelectedDuties] = useState([]);
    const teacherDutyTypes = ["정담임", "비담임", "보조", "대체", "누리반", "연장반", "방과후", "조리사/차량/행정", "신입", "무관"];

    const handleDutyChange = (item, isSelected) => {
        const newSelected = isSelected
            ? [...selectedDuties, item]
            : selectedDuties.filter(duty => duty !== item);
        setSelectedDuties(newSelected);
        onKeywordChange?.(item, isSelected);
    };

    return (
        <div className="search-section">
            <h4>상세 직군</h4>
            <ButtonList
                items={teacherDutyTypes}
                selectedItems={selectedDuties}
                onKeywordChange={handleDutyChange}
            />
            <div className="divider" />
        </div>
    );
} 