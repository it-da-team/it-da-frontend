// src/components/MapDropdown.jsx
import React, { useState } from "react";
import "../../assets/css/Map.css";

const cities = [
  { value: "", label: "시 선택" },
  { value: "seoul", label: "서울특별시" },
  { value: "busan",  label: "부산광역시"  },
];

const districts = {
  seoul: [
    { value: "",       label: "구/군 선택" },
    { value: "jongno", label: "종로구"    },
    { value: "jung",   label: "중구"      },
    // … 필요에 따라 추가
  ],
  busan: [
    { value: "",        label: "구/군 선택" },
    { value: "haeundae",label: "해운대구"  },
    { value: "suyeong", label: "수영구"    },
    // … 필요에 따라 추가
  ],
};

export default function MapDropdown({ onSearch }) {
  const [city, setCity]         = useState("");
  const [district, setDistrict] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(city, district);
    } else {
      console.log("Search for", city, district);
    }
  };

  return (
    <div className="map-dropdown">
      <div className="map-filters">
        <select
          value={city}
          onChange={e => {
            setCity(e.target.value);
            setDistrict("");
          }}
        >
          {cities.map(c => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={district}
          onChange={e => setDistrict(e.target.value)}
          disabled={!city}
        >
          {(districts[city] || []).map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <button className="search-button" onClick={handleSearch}>
        검색하기
      </button>
      <h4>총 100건의 채용 공고 확인하러 가기</h4>
    </div>
  );
}
