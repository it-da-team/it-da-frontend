import React from 'react';
import '../../../assets/css/SearchResultModal.css';
import ViewRecruitmentButton from '../../../components/common/ViewRecruitmentButton';

export default function SearchResultModal({ isOpen, onClose, searchResults }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>검색된 채용공고</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {searchResults && searchResults.length > 0 ? (
            <div className="search-results-list">
              {searchResults.map((result) => (
                <div key={result.recruitmentIdHash} className="search-result-item">
                  <h3>{result.title}</h3>
                  <p className="company-name">{result.companyName}</p>
                  <div className="result-details">
                    <span>{result.region}</span>
                    <span>{result.district}</span>
                    <span>{result.salary}</span>
                  </div>
                  <ViewRecruitmentButton recruitmentIdHash={result.recruitmentIdHash} />
                </div>
              ))}
            </div>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
} 