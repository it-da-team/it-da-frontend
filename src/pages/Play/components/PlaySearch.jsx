import React from 'react';
import './PlaySearch.css';

const PlaySearch = ({ onSearch }) => {
  return (
    <div className="play-search-container">
      <h2>“오늘 어떤 놀이를 준비해드릴까요?”</h2>
      <div className="play-search-controls">
        <select defaultValue="">
          <option value="" disabled>월 선택 ⬇</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={`${i + 1}월`}>{i + 1}월</option>
          ))}
        </select>
        <select defaultValue="">
          <option value="" disabled>연령 선택 ⬇</option>
          <option value="3">만 3세</option>
          <option value="4">만 4세</option>
          <option value="5">만 5세</option>
        </select>
        <input type="text" placeholder="주제 입력" />
        <button onClick={onSearch}>추천 받기 ▶️</button>
      </div>
    </div>
  );
};

export default PlaySearch; 