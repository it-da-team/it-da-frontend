import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
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
        disabled={loading}
      >
        {loading ? '검색 중...' : '검색'}
      </button>
    </form>
  );
};

export default SearchBar; 