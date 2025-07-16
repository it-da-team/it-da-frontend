// src/components/MapDropdown.jsx
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../../assets/css/Map.css";
import "../../assets/css/MapDropdown.css";

// 예시 지역 데이터 (실제 서비스에서는 더 많은 데이터 필요)
const PROVINCES = [
  { value: "서울특별시", label: "서울특별시" },
  { value: "부산광역시", label: "부산광역시" },
  { value: "경기도", label: "경기도" },
];
const CITIES = {
  "서울특별시": [
    { value: "강남구", label: "강남구" },
    { value: "강동구", label: "강동구" },
    { value: "강북구", label: "강북구" },
    // ...
  ],
  "부산광역시": [
    { value: "중구", label: "중구" },
    { value: "서구", label: "서구" },
    // ...
  ],
  "경기도": [
    { value: "수원시", label: "수원시" },
    { value: "성남시", label: "성남시" },
    { value: "고양시", label: "고양시" },
    // ...
  ],
};
const DISTRICTS = {
  "수원시": [
    { value: "장안구", label: "장안구" },
    { value: "권선구", label: "권선구" },
    { value: "팔달구", label: "팔달구" },
    { value: "영통구", label: "영통구" },
  ],
  "성남시": [
    { value: "분당구", label: "분당구" },
    { value: "중원구", label: "중원구" },
    { value: "수정구", label: "수정구" },
  ],
  // ...
};

const RECENT_KEY = "recentRegionSelect";

function getRecentOptions() {
  try {
    const recent = localStorage.getItem(RECENT_KEY);
    if (!recent) return [];
    return JSON.parse(recent);
  } catch {
    return [];
  }
}
function setRecentOption(regionObj) {
  const prev = getRecentOptions();
  const filtered = prev.filter(r => r.value !== regionObj.value);
  const next = [regionObj, ...filtered].slice(0, 3);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

const NO_CITY_PROVINCES = ["서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시"];

export default function MapDropdown({ province, city, district, onProvinceChange, onCityChange, onDistrictChange }) {
  // 최근 선택
  const [recent, setRecent] = useState(getRecentOptions());
  useEffect(() => {
    setRecent(getRecentOptions());
  }, []);

  // 시/도 변경
  const handleProvince = (option) => {
    onProvinceChange(option ? option.value : "");
    onCityChange("");
    onDistrictChange("");
  };
  // 시/군 변경
  const handleCity = (option) => {
    onCityChange(option ? option.value : "");
    onDistrictChange("");
  };
  // 구/군 변경
  const handleDistrict = (option) => {
    onDistrictChange(option ? option.value : "");
    if (province && city && option) {
      setRecentOption({
        value: `${province} ${city} ${option.value}`,
        label: `${province} > ${city} > ${option.label}`
      });
      setRecent(getRecentOptions());
    }
  };

  // 옵션
  const provinceOptions = [
    ...(recent.length > 0 ? [{ label: "최근 선택", options: recent }] : []),
    { label: "시/도 전체", options: PROVINCES }
  ];
  // 시/군 없는 광역시/특별시/세종 처리
  const isNoCityProvince = NO_CITY_PROVINCES.includes(province);
  const cityOptions = isNoCityProvince ? [] : (province && CITIES[province] ? CITIES[province] : []);
  const districtOptions = isNoCityProvince
    ? (province && CITIES[province] ? CITIES[province].map(c => ({ value: c.value, label: c.label })) : [])
    : (city && DISTRICTS[city] ? DISTRICTS[city] : []);

  // 스타일 (react-select customStyles)
  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 44,
      fontSize: '1.1rem',
      borderRadius: 8,
      borderColor: state.isFocused ? '#FFB300' : '#FFC107',
      boxShadow: state.isFocused ? '0 0 0 2px #FFF3E0' : 'none',
      transition: 'border-color 0.2s',
      background: state.isDisabled ? '#f5f5f5' : '#fff',
      color: '#222',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    }),
    menu: base => ({ ...base, zIndex: 20 }),
    option: (base, state) => ({
      ...base,
      fontSize: '1.1rem',
      color: state.isSelected ? '#FF6F00' : '#222',
      background: state.isSelected ? '#FFF8E1' : state.isFocused ? '#FFFDE7' : '#fff',
      fontWeight: state.isSelected ? 700 : 400,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    placeholder: base => ({ ...base, color: '#bbb', fontWeight: 400, fontSize: '1.1rem' }),
    singleValue: base => ({ ...base, color: '#222', fontWeight: 500, fontSize: '1.1rem' }),
    groupHeading: base => ({ ...base, color: '#888', fontSize: '1.1rem', fontWeight: 600, padding: '4px 8px' }),
  };

  console.log('provinceOptions', provinceOptions);
  console.log('cityOptions', cityOptions);
  console.log('districtOptions', districtOptions);
  console.log('province', province, 'city', city, 'district', district);

  return (
    <div className="map-dropdown" style={{ width: '100%' }}>
      <div className="map-filters" style={{ display: 'flex', gap: '0.7rem', width: '100%' }}>
        <div style={{ flex: 1, minWidth: 120 }}>
          <Select
            inputId="province-select"
            instanceId="province-select"
            options={provinceOptions}
            value={province ? PROVINCES.find(p => p.value === province) : null}
            onChange={handleProvince}
            placeholder="시/도 선택"
            styles={{
              ...customStyles,
              menuPortal: base => ({ ...base, zIndex: 99999 })
            }}
            menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
            isClearable
            aria-label="시/도 선택"
          />
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <Select
            inputId="city-select"
            instanceId="city-select"
            options={cityOptions}
            value={city ? cityOptions.find(c => c.value === city) : null}
            onChange={handleCity}
            placeholder="시/군 선택"
            styles={{
              ...customStyles,
              menuPortal: base => ({ ...base, zIndex: 99999 })
            }}
            isDisabled={!province || isNoCityProvince}
            isClearable
            menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
            aria-label="시/군 선택"
            noOptionsMessage={() => province ? '선택 가능한 시/군이 없습니다.' : '시/도를 먼저 선택하세요.'}
          />
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <Select
            inputId="district-select"
            instanceId="district-select"
            options={districtOptions}
            value={district ? districtOptions.find(d => d.value === district) : null}
            onChange={handleDistrict}
            placeholder={isNoCityProvince ? "구 선택" : "구/군 선택"}
            styles={{
              ...customStyles,
              menuPortal: base => ({ ...base, zIndex: 99999 })
            }}
            isDisabled={isNoCityProvince ? !province : !city}
            isClearable
            menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
            aria-label={isNoCityProvince ? "구 선택" : "구/군 선택"}
            noOptionsMessage={() => isNoCityProvince
              ? (province ? '선택 가능한 구가 없습니다.' : '시/도를 먼저 선택하세요.')
              : (city ? '선택 가능한 구/군이 없습니다.' : '시/군을 먼저 선택하세요.')}
          />
        </div>
      </div>
      {/* 가이드 메시지/에러 UX */}
      <div style={{ fontSize: '0.97rem', color: '#888', marginTop: '0.5rem', minHeight: 22 }}>
        {!province && '시/도 선택 후 시/군, 구/군을 선택하세요.'}
        {province && isNoCityProvince && !district && '구를 선택하세요.'}
        {province && !isNoCityProvince && !city && '시/군을 선택하세요.'}
        {province && !isNoCityProvince && city && !district && '구/군을 선택하세요.'}
      </div>
      {/* 최근 선택 UX */}
      {recent.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#888', marginTop: 4, marginBottom: 0 }}>
          <span style={{ fontWeight: 600, color: '#FFB300', fontSize: 13, display: 'flex', alignItems: 'center', gap: 2 }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{marginRight:2}}><circle cx="10" cy="10" r="9" stroke="#FFB300" strokeWidth="2" fill="#FFF8E1"/><path d="M10 5v5l3 3" stroke="#FFB300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            최근 선택
          </span>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {recent.map(r => (
              <span key={r.value} style={{
                background: '#FFF8E1',
                color: '#FF6F00',
                borderRadius: 12,
                padding: '2px 10px',
                fontWeight: 500,
                fontSize: 13,
                display: 'inline-block',
                border: '1px solid #FFECB3',
                boxShadow: '0 1px 2px rgba(255,193,7,0.07)',
                letterSpacing: '-0.01em',
                marginRight: 2
              }}>{r.label}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
