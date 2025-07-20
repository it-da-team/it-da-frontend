import React, { useState, useEffect } from "react";
import ButtonList from "./ButtonList";
import { PROVINCE_FULLNAME_MAP } from "../constants/keywords";

const FULLNAME_TO_SHORT = Object.fromEntries(
  Object.entries(PROVINCE_FULLNAME_MAP).map(([short, full]) => [full, short])
);

export default function RegionSelector({ onKeywordChange, selectedKeywords = [], setSelectedKeywords = () => {} }) {
    const [selectedRegions, setSelectedRegions] = useState([]);
    const regions = Object.keys(PROVINCE_FULLNAME_MAP);

    useEffect(() => {
        // selectedKeywords에 풀네임이 들어있으면 축약명으로 변환
        const normalized = selectedKeywords.map(k => FULLNAME_TO_SHORT[k] || k);
        const filtered = normalized.filter(keyword => regions.includes(keyword));
        setSelectedRegions(filtered);
        // selectedKeywords가 축약명이 아니면 축약명으로 덮어쓰기
        if (JSON.stringify(selectedKeywords) !== JSON.stringify(normalized)) {
            setSelectedKeywords(normalized);
        }
    }, [selectedKeywords]);

    const handleRegionChange = (item, isSelected) => {
        const normalized = selectedKeywords.map(k => FULLNAME_TO_SHORT[k] || k);
        const newSelected = isSelected
            ? [...normalized, item]
            : normalized.filter(region => region !== item);
        setSelectedKeywords(Array.from(new Set(newSelected)));
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