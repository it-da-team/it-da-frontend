// ButtonList.jsx
import React, { useState } from "react";

export default function ButtonList({ items = [], selectedItems = [], onKeywordChange }) {
    const handleClick = (item) => {
      const isSelected = selectedItems.includes(item);
      onKeywordChange(item, !isSelected);
    };
  
    return (
      <div className="button-list">
        {items.map((item) => (
          <button
            key={item}
            className={`list-button ${selectedItems.includes(item) ? 'selected' : ''}`}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    );
  }
  