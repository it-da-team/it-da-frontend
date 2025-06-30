import React, { useEffect, useState } from 'react';
import BoardTabs from './components/BoardTabs';
import PostList from './components/PostList';
import PostListItem from './components/PostListItem';
import PopularPosts from './components/PopularPosts';
import SearchBar from './components/SearchBar';
import './Community.css';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    // 페이지 마운트 시 body에 클래스 추가
    document.body.classList.add('community-body');

    // 페이지 언마운트 시 body에서 클래스 제거
    return () => {
      document.body.classList.remove('community-body');
    };
  }, []); // 빈 배열을 전달하여 마운트/언마운트 시 한 번만 실행

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsSearchMode(false);
    setSearchResults(null);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results || []);
    setIsSearchMode(true);
  };

  return (
    <div className="community-container">
      <header className="community-header">
        <h1>온담 커뮤니티</h1>
        <p>따뜻한 이야기를 나누는 공간, 온담</p>
      </header>
      <main className="community-main-content">
        <div className="community-left-column">
          <SearchBar onSearchResults={handleSearchResults} />
          <BoardTabs 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          {isSearchMode ? (
            <div className="search-results-container">
              <h3>검색 결과</h3>
              <div className="post-list-container">
                {searchResults && searchResults.length > 0 ? (
                  searchResults.map((post) => (
                    <PostListItem key={post.id} post={post} />
                  ))
                ) : (
                  <div>검색 결과가 없습니다.</div>
                )}
              </div>
            </div>
          ) : (
            <PostList category={selectedCategory} />
          )}
        </div>
        <aside className="community-right-column">
          <PopularPosts />
        </aside>
      </main>
    </div>
  );
};

export default CommunityPage; 