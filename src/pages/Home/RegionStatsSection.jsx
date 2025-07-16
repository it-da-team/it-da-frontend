import React, { useEffect, useRef, useState } from 'react';
import './RegionStatsSection.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import graphDiagram from '../../assets/lottie/Graph Diagram Animation.json';
import { useMediaQuery } from 'react-responsive';

const regionStatsRaw = [
  { region: '서울', count: 32 },
  { region: '부산', count: 14 },
  { region: '대구', count: 8 },
  { region: '인천', count: 11 },
  { region: '광주', count: 7 },
  { region: '대전', count: 6 },
  { region: '울산', count: 5 },
  { region: '세종', count: 3 },
  { region: '경기', count: 28 },
  { region: '강원', count: 4 },
  { region: '충북', count: 5 },
  { region: '충남', count: 6 },
  { region: '전북', count: 5 },
  { region: '전남', count: 4 },
  { region: '경북', count: 7 },
  { region: '경남', count: 8 },
  { region: '제주', count: 2 },
];

// regionStats에서 '전국' 항목을 제거하고 regionStatsRaw만 사용
const regionStats = regionStatsRaw;

function AnimatedBar({ value, max, delay = 0, region, fixed, setFixedIndex, index }) {
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
    navigate(`/recruitment?region=${encodeURIComponent(region)}`);
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
  const [fixedIndex, setFixedIndex] = useState(null);
  const maxCount = Math.max(...regionStats.map(r => r.count));
  const isMobile = useMediaQuery({ maxWidth: 700 });

  // 상위 5개(공고 수 많은 순) 강조
  const sortedStats = [...regionStats].sort((a, b) => b.count - a.count);
  const top5 = sortedStats.slice(0, 5).map(r => r.region);

  if (isMobile) {
    // 모바일: 2열 그리드, 상위 5개 강조
    return (
      <section className="region-stats-section mobile">
        <h2 className="section-title">지역별 최신 공고 통계</h2>
        <div className="region-stats-card-list grid">
          {regionStats.map((r) => (
            <div
              className={`region-stats-card${top5.includes(r.region) ? ' top' : ''}`}
              key={r.region}
              onClick={() => window.location.href = `/recruitment?region=${encodeURIComponent(r.region)}`}
              style={{ cursor: 'pointer' }}
            >
              <span className="region-stats-card-region">{r.region}</span>
              <span className="region-stats-card-count">{r.count}건</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="region-stats-section">
      <h2 className="section-title">
        <Lottie animationData={graphDiagram} loop={true} style={{ width: 44, height: 44, display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem', position: 'relative', top: '4px' }} />
        지역별 최신 공고 통계
      </h2>
      <div className="region-stats-graph-vertical">
        {regionStats.map((r, i) => (
          <div className="region-bar-col" key={r.region}>
            <AnimatedBar
              value={r.count}
              max={maxCount}
              delay={i * 120}
              region={r.region}
              fixed={fixedIndex === i}
              setFixedIndex={setFixedIndex}
              index={i}
            />
            <span className="region-label-vertical">{r.region}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 