// src/components/MapDropdown.jsx
import React, { useState } from "react";
import "../../assets/css/Map.css";

const cities = [
  { value: "", label: "시 선택" },
  { value: "서울", label: "서울특별시" },
  { value: "부산", label: "부산광역시" },
  { value: "대구", label: "대구광역시" },
  { value: "인천", label: "인천광역시" },
  { value: "광주", label: "광주광역시" },
  { value: "대전", label: "대전광역시" },
  { value: "울산", label: "울산광역시" },
  { value: "세종", label: "세종특별자치시" },
  { value: "경기", label: "경기도" },
  { value: "강원", label: "강원도" },
  { value: "충북", label: "충청북도" },
  { value: "충남", label: "충청남도" },
  { value: "전북", label: "전라북도" },
  { value: "전남", label: "전라남도" },
  { value: "경북", label: "경상북도" },
  { value: "경남", label: "경상남도" },
  { value: "제주", label: "제주특별자치도" }
];

const districts = {
  "서울": [
    { value: "", label: "구/군 선택" },
    { value: "강남구", label: "강남구" },
    { value: "강동구", label: "강동구" },
    { value: "강북구", label: "강북구" },
    { value: "강서구", label: "강서구" },
    { value: "관악구", label: "관악구" },
    { value: "광진구", label: "광진구" },
    { value: "구로구", label: "구로구" },
    { value: "금천구", label: "금천구" },
    { value: "노원구", label: "노원구" },
    { value: "도봉구", label: "도봉구" },
    { value: "동대문구", label: "동대문구" },
    { value: "동작구", label: "동작구" },
    { value: "마포구", label: "마포구" },
    { value: "서대문구", label: "서대문구" },
    { value: "서초구", label: "서초구" },
    { value: "성동구", label: "성동구" },
    { value: "성북구", label: "성북구" },
    { value: "송파구", label: "송파구" },
    { value: "양천구", label: "양천구" },
    { value: "영등포구", label: "영등포구" },
    { value: "용산구", label: "용산구" },
    { value: "은평구", label: "은평구" },
    { value: "종로구", label: "종로구" },
    { value: "중구", label: "중구" },
    { value: "중랑구", label: "중랑구" }
  ],
  "부산": [
    { value: "", label: "구/군 선택" },
    { value: "중구", label: "중구" },
    { value: "서구", label: "서구" },
    { value: "동구", label: "동구" },
    { value: "영도구", label: "영도구" },
    { value: "부산진구", label: "부산진구" },
    { value: "동래구", label: "동래구" },
    { value: "남구", label: "남구" },
    { value: "북구", label: "북구" },
    { value: "해운대구", label: "해운대구" },
    { value: "사하구", label: "사하구" },
    { value: "금정구", label: "금정구" },
    { value: "강서구", label: "강서구" },
    { value: "연제구", label: "연제구" },
    { value: "수영구", label: "수영구" },
    { value: "사상구", label: "사상구" },
    { value: "기장군", label: "기장군" }
  ]
  // 다른 도시들의 구/군 데이터는 필요에 따라 추가
};

export default function MapDropdown({ selectedCity, selectedDistrict, onCityChange, onDistrictChange, onSearch }) {
  const handleSearch = () => {
    if (!selectedCity) {
      alert("시를 선택해주세요.");
      return;
    }
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className="map-dropdown">
      <h3 className="map-dropdown-text">시/군/구 선택</h3>
      <div className="map-filters">
        <select
          value={selectedCity}
          onChange={e => {
            onCityChange(e.target.value);
            onDistrictChange("");
          }}
        >
          {cities.map(c => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={e => onDistrictChange(e.target.value)}
          disabled={!selectedCity}
        >
          {(districts[selectedCity] || []).map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <button className="search-button" onClick={handleSearch}>
        검색하기
      </button>
    </div>
  );
}
