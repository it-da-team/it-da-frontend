import React, { useEffect, useState, useRef } from 'react';
import './RollingText.css';

const texts = [
  '원장님이신가요? > 채용 공고 올리기',
  '센터장님이신가요? > 센터 정보 등록하기',
];

export default function RollingText({ interval = 3000 }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIdx(i => (i + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer.current);
  }, [interval]);

  return (
    <div className="rolling-text">
      <ul
        className="rolling-text__list"
        style={{ transform: `translateY(-${idx * 100}%)` }}
      >
        {texts.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
