import React, { useEffect, useState } from 'react';
import BoardTabs from './components/BoardTabs';
import PostList from './components/PostList';
import PostListItem from './components/PostListItem';
import PopularPosts from './components/PopularPosts';
import SearchBar from './components/SearchBar';
import PopularChannels from '../MyProfile/PopularChannels';
import { Link } from 'react-router-dom';
import './Community.css';
import bannerImg from '../../assets/images/ondam_community_banner.png'; // 실제 경로에 맞게 수정 필요

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
        <img 
          src={bannerImg} 
          alt="온담 커뮤니티 - 따뜻한 이야기를 나누는 공간, 온담" 
          className="community-header-banner"
        />
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
          <Link to="/myprofile" className="go-myprofile-btn">
            내 프로필 보러가기
          </Link>
          <PopularPosts />
          <PopularChannels />
        </aside>
      </main>
    </div>
  );
};

export default CommunityPage; 