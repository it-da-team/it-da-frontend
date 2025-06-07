import React from "react";
// SelectedKeywordTags.jsx
export function SelectedKeywordTags({ keywords }) {
    if (keywords.length === 0) return null;
  
    return (
      <div className="selected-keyword-tags">
        {keywords.map((word, idx) => (
          <span className="keyword-tag" key={idx}>#{word}</span>
        ))}
      </div>
    );
  }
  

export default SelectedKeywordTags;