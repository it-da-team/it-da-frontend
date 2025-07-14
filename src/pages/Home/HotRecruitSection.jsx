import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import Lottie from 'lottie-react';
import fireFlame from '../../assets/lottie/Fire Flame.json';
import './HotRecruitSection.css';

const CARD_WIDTH = 320 + 22; // min-width(320px) + gap(2.2rem=22px)

const hotJobs = [
  { id: 1, title: '유치원 교사', company: '행복유치원', location: '서울 강남구', dDay: 3 },
  { id: 2, title: '어린이집 보조교사', company: '푸른어린이집', location: '경기 수원시', dDay: 1 },
  { id: 3, title: '특별활동 강사', company: '키즈뮤직', location: '부산 해운대구', dDay: 5 },
  { id: 4, title: '방문 교사', company: '스마트교육', location: '인천 연수구', dDay: 2 },
  { id: 5, title: '영어유치원 교사', company: '글로벌키즈', location: '서울 송파구', dDay: 4 },
  { id: 6, title: '미술 강사', company: '아트스쿨', location: '경기 고양시', dDay: 6 },
  { id: 7, title: '과학 체험 강사', company: '사이언스랩', location: '대전 유성구', dDay: 7 },
  { id: 8, title: '체육 강사', company: '스포츠키즈', location: '울산 남구', dDay: 2 },
  { id: 9, title: '중국어 교사', company: '차이나스쿨', location: '광주 북구', dDay: 3 },
  { id: 10, title: '음악 강사', company: '뮤직랜드', location: '대구 수성구', dDay: 1 },
];

export default function HotRecruitSection() {
  const listRef = useRef();
  const [isOverflow, setIsOverflow] = useState(false);
  const jobs = [...hotJobs, ...hotJobs]; // 2배로 복제

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const overflow = list.scrollWidth > list.clientWidth + 2;
    setIsOverflow(overflow);
    const handleResize = () => {
      const overflow = list.scrollWidth > list.clientWidth + 2;
      setIsOverflow(overflow);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hotJobs.length]);

  useEffect(() => {
    if (!isOverflow) {
      if (listRef.current) listRef.current.scrollLeft = 0;
      return;
    }
    const list = listRef.current;
    let paused = false;
    let timer;
    function slideOnce() {
      if (!paused) {
        const next = list.scrollLeft + CARD_WIDTH;
        // 복제된 리스트의 절반(원본 끝)까지 오면, 원본 시작 위치로 순간 이동
        if (next >= CARD_WIDTH * hotJobs.length) {
          list.scrollLeft = 0;
        } else {
          list.scrollTo({ left: next, behavior: 'smooth' });
        }
      }
      timer = setTimeout(slideOnce, 3000);
    }
    timer = setTimeout(slideOnce, 3000);
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    list.addEventListener('mouseenter', onEnter);
    list.addEventListener('mouseleave', onLeave);
    return () => {
      clearTimeout(timer);
      list.removeEventListener('mouseenter', onEnter);
      list.removeEventListener('mouseleave', onLeave);
    };
  }, [isOverflow]);

  return (
    <section className="hot-recruit-section">
      <h2 className="hot-recruit-title">
        <span className="hot-recruit-lottie">
          <Lottie
            animationData={fireFlame}
            loop={true}
            style={{ width: 36, height: 36 }}
          />
        </span>
        인기 채용공고
      </h2>
      <div
        className={`hot-recruit-list${!isOverflow ? ' center' : ''}`}
        ref={listRef}
      >
        {jobs.map((job, idx) => (
          <div className="hot-recruit-card" key={idx + '-' + job.id}>
            <div className="hot-job-title-row">
              <div>
                <h2 className="hot-job-title">{job.title}</h2>
                <h3 className="hot-job-company">{job.company}</h3>
              </div>
            </div>
            <div className="hot-job-meta-row">
              <span className="hot-job-location">{job.location}</span>
              <span className="hot-job-dday">D-{job.dDay}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 