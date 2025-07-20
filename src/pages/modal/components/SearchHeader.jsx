import React from "react";

export default function SearchHeader({ onClose, onReset }) {
    return (
      <div className="search-header-row">
        <div className="search-header-title">상세 검색</div>
        <div className="search-header-actions">
          <button className="reset-button icon" onClick={onReset}>
            <span style={{marginRight: '0.4em', fontSize: '1.1em'}}>⟳</span> 초기화
          </button>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
      </div>
    );
} 