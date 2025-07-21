import React, { useState } from "react";
import "../../assets/css/RecruitmentListItem.css";

function HeartButton({ initialFavorite, onToggle }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [animate, setAnimate] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    setIsFavorite((prev) => !prev);
    if (onToggle) onToggle(!isFavorite);
  };

  return (
    <button
      className={`heart-btn${isFavorite ? " active" : ""}${animate ? " animate" : ""}`}
      onClick={handleClick}
      aria-label="관심 공고"
      type="button"
    >
      <svg
        className="heart-svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill={isFavorite ? "#ff4d77" : "none"}
        stroke={isFavorite ? "#ff4d77" : "#bbb"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
  );
}

export default HeartButton; 