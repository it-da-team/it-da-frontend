import React, { useEffect, useState } from 'react';
import Map from './recruitment/Map';
import { useNavigate } from 'react-router-dom';

function RegionSearchMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);

    // 모바일이 아니면 리다이렉트
    if (!isMobile) {
      navigate('/recruitment', { replace: true });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, navigate]);

  if (!isMobile) return null; // 또는 로딩/빈 화면

  return (
    <div className="region-search-page" style={{ paddingBottom: 64 }}>
      <Map />
    </div>
  );
}

export default RegionSearchMobile; 