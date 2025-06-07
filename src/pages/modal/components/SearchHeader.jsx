import React from "react";

export default function SearchHeader({ onClose }) {
    return (
      <div className="search-header">
        <h6 className="search-title">상세 검색</h6>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    );
} 