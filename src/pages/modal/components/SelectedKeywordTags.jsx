import React from "react";
import { INSTITUTION_SUB_TYPE_KEYWORDS } from "../constants/keywords";
// SelectedKeywordTags.jsx
export function SelectedKeywordTags({ keywords }) {
    if (keywords.length === 0) return null;
  
    return (
      <div className="selected-keyword-tags">
        {keywords.map((word, idx) => (
          <span className="keyword-tag" key={idx}>#
            {INSTITUTION_SUB_TYPE_KEYWORDS[word] || word}
          </span>
        ))}
      </div>
    );
  }
  

export default SelectedKeywordTags;