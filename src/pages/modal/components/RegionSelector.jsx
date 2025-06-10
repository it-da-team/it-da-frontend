import React, { useState, useEffect } from "react";
import ButtonList from "./ButtonList";

export default function RegionSelector({ onKeywordChange, selectedKeywords = [] }) {
    const [selectedRegions, setSelectedRegions] = useState([]);
    const regions = ["서울", "경기", "인천", "강원", "충청", "전라", "경상", "제주"];

    // selectedKeywords가 변경될 때마다 선택된 지역 업데이트
    useEffect(() => {
        const regions = selectedKeywords.filter(keyword => 
            ["서울", "경기", "인천", "강원", "충청", "전라", "경상", "제주"].includes(keyword)
        );
        setSelectedRegions(regions);
    }, [selectedKeywords]);

    const handleRegionChange = (item, isSelected) => {
        const newSelected = isSelected
            ? [...selectedRegions, item]
            : selectedRegions.filter(region => region !== item);
        setSelectedRegions(newSelected);
        onKeywordChange?.(item, isSelected);
    };

    return (
        <div className="search-section">
            <h4>지역</h4>
            <ButtonList
                items={regions}
                selectedItems={selectedRegions}
                onKeywordChange={handleRegionChange}
            />
            <div className="divider" />
        </div>
    );
} 