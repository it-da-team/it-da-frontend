import React, { useRef, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import './StatsBar.css';

export default function StatsBar() {
  // 예시 데이터 (실제 데이터로 교체 가능)
  const todayCount = 12;
  const totalCount = 324;
  const [start, setStart] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-bar" ref={ref}>
      <div className="stats-item">
        <span className="stats-label">오늘 등록된 공고</span>
        <span className="stats-count">
          <CountUp end={todayCount} duration={2.2} start={start ? undefined : 0} />
        </span>
      </div>
      <div className="stats-divider" />
      <div className="stats-item">
        <span className="stats-label">모든 채용공고</span>
        <span className="stats-count">
          <CountUp end={totalCount} duration={2.2} start={start ? undefined : 0} />
        </span>
      </div>
    </div>
  );
} 