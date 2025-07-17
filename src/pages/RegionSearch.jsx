import React from 'react';
import Map from './recruitment/Map';

function RegionSearch() {
  return (
    <div className="region-search-page">
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '1.2rem 0 1.5rem 0', textAlign: 'center' }}>
        지역별 채용공고 검색
      </h2>
      <Map />
    </div>
  );
}

export default RegionSearch; 