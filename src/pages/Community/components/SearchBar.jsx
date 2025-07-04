import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { searchPosts } from '../../../api/community/communityApi';
import { getToken } from '../../../utils/localStorage';

const SearchBar = ({ onSearchResults }) => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const results = await searchPosts(keyword, token);
      onSearchResults && onSearchResults(results);
    } catch (error) {
      console.error('검색 실패:', error);
      alert('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="관심 있는 내용을 검색해보세요!"
        className="search-input"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button 
        type="submit" 
        className="search-button"
        aria-label="검색"
        disabled={loading}
      >
        <svg
          viewBox="0 0 448 512"
          width="2em"
          height="2em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"/>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar; 