import React, { useEffect, useRef, useState } from 'react';
import './RegionStatsSection.css';
import { useNavigate } from 'react-router-dom';
import StatsBar from './StatsBar';
import Lottie from 'lottie-react';
import graphDiagram from '../../assets/lottie/Graph Diagram Animation.json';
import { useMediaQuery } from 'react-responsive';
import { fetchRecruitmentsByProvince } from "../../api/recruitment/recruitmentApi";
import useProvinceRecruitmentCount from "../../hooks/recruitment/useRecruitmentChart"; // 실제 경로에 맞춰 조정


const SHORT_TO_FULL_REGION_MAP = {
  서울: '서울특별시',
  부산: '부산광역시',
  대구: '대구광역시',
  인천: '인천광역시',
  광주: '광주광역시',
  대전: '대전광역시',
  울산: '울산광역시',
  세종: '세종특별자치시',
  경기: '경기도',
  강원: '강원도',
  충북: '충청북도',
  충남: '충청남도',
  전북: '전라북도',
  전남: '전라남도',
  경북: '경상북도',
  경남: '경상남도',
  제주: '제주특별자치도',
};

const FULL_TO_SHORT_REGION_MAP = Object.fromEntries(
  Object.entries(SHORT_TO_FULL_REGION_MAP).map(([short, full]) => [full, short])
);



function AnimatedBar({ value, max, delay = 0, region, fixed, setFixedIndex, index,onRegionClick }) {
  const [height, setHeight] = useState(0);
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [tooltipHover, setTooltipHover] = useState(false);
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => setHeight((value / max) * 100), delay);
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 30));
    let frame = 0;
    function animateCount() {
      frame++;
      current += step;
      if (current >= value || frame > 40) {
        setCount(value);
      } else {
        setCount(current);
        requestAnimationFrame(animateCount);
      }
    }
    setTimeout(animateCount, delay + 100);
    return () => clearTimeout(timeout);
  }, [visible, value, max, delay]);

  const handleGoRegion = () => {
    onRegionClick(region); // ✅ 이렇게만 호출
  };
  

  // Tooltip shows if hovered, tooltipHover, or fixed
  const showTooltip = hovered || tooltipHover || fixed;

  // Toggle fixed state on bar click
  const handleBarClick = (e) => {
    e.stopPropagation();
    if (fixed) {
      setFixedIndex(null);
    } else {
      setFixedIndex(index);
    }
  };

  // Close tooltip if clicking outside (when fixed)
  useEffect(() => {
    if (!fixed) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setFixedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [fixed, setFixedIndex]);

  return (
    <div
      className="region-bar-bg-vertical"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleBarClick}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <div className="region-bar-vertical" style={{ height: `${height}%` }}>
        <span className="region-bar-count-vertical">{count}</span>
      </div>
      {showTooltip && (
        <div
          className="region-bar-tooltip"
          onMouseEnter={() => setTooltipHover(true)}
          onMouseLeave={() => setTooltipHover(false)}
        >
          <div className="region-bar-tooltip-title">{region}</div>
          <button className="region-bar-tooltip-btn" onClick={handleGoRegion}>
            보러가기
          </button>
        </div>
      )}
    </div>
  );
}
export default function RegionStatsSection() {
  const { counts: regionStats,totalCount, todayCount,loading, error } = useProvinceRecruitmentCount();
  const navigate = useNavigate();
  const [fixedIndex, setFixedIndex] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 700 });
  
  const maxCount = Math.max(...regionStats.map(r => r.count), 1);

  const handleRegionClick = async (region) => {
    try {
      const fullRegion = SHORT_TO_FULL_REGION_MAP[region] || region;
      const data = await fetchRecruitmentsByProvince(fullRegion);
      navigate(`/recruitment?region=${encodeURIComponent(fullRegion)}`, {
        state: data,
      });
    } catch (err) {
      console.error("지역 요청 실패:", err);
      alert("해당 지역 공고를 불러오는 데 실패했습니다.");
    }
  };

  // 정렬된 데이터
  const sortedStats = [...regionStats].sort((a, b) => b.count - a.count);
  const top5 = sortedStats.slice(0, 5).map(r => r.province || r.region);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  // 모바일
  if (isMobile) {
    return (
      <section className="region-stats-section mobile">
        <h2 className="section-title">지역별 최신 공고 통계</h2>
        <StatsBar today={todayCount} total={totalCount} />
        <div className="region-stats-card-list grid">
          {regionStats.map((r) => (
            <div
              className={`region-stats-card${top5.includes(r.province) ? ' top' : ''}`}
              key={r.province}
              onClick={() => handleRegionClick(r.province)}
              style={{ cursor: 'pointer' }}
            >
              <span className="region-stats-card-region">
                {FULL_TO_SHORT_REGION_MAP[r.province] || r.province}
              </span>
              <span className="region-stats-card-count">{r.count}건</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // PC
  return (
    <section className="region-stats-section">
      <h2 className="section-title">
        <Lottie animationData={graphDiagram} loop={true} style={{ width: 44, height: 44, display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem', position: 'relative', top: '4px' }} />
        지역별 최신 공고 통계
      </h2>
      <StatsBar today={todayCount} total={totalCount} />
      <div className="region-stats-graph-vertical">
        {regionStats.map((r, i) => (
          <div className="region-bar-col" key={r.province}>
            <AnimatedBar
              value={r.count}
              max={maxCount}
              delay={i * 120}
              region={r.province}
              fixed={fixedIndex === i}
              setFixedIndex={setFixedIndex}
              index={i}
              onRegionClick={handleRegionClick}
            />
           <span className="region-label-vertical">
            {FULL_TO_SHORT_REGION_MAP[r.province] || r.province}
          </span>
          </div>
        ))}
      </div>
    </section>
  );
}
