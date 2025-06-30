import React, { useState, useEffect } from 'react';
import PlaySearch from './components/PlaySearch';
import PlayList from './components/PlayList';
import Pagination from './components/Pagination';
import playData from '../../data/playData.json';
import './Play.css';

const ITEMS_PER_PAGE = 4;

const Play = () => {
  const [youtubePlays, setYoutubePlays] = useState([]);
  const [instagramPlays, setInstagramPlays] = useState([]);

  const [youtubeCurrentPage, setYoutubeCurrentPage] = useState(1);
  const [instagramCurrentPage, setInstagramCurrentPage] = useState(1);

  useEffect(() => {
    // 데이터를 sourceType에 따라 필터링
    const youtubeData = playData.filter(p => p.sourceType === 'youtube');
    const instagramData = playData.filter(p => p.sourceType === 'instagram');
    setYoutubePlays(youtubeData);
    setInstagramPlays(instagramData);
  }, []);

  // Get current posts for each section
  const lastYoutubeIndex = youtubeCurrentPage * ITEMS_PER_PAGE;
  const firstYoutubeIndex = lastYoutubeIndex - ITEMS_PER_PAGE;
  const currentYoutubePlays = youtubePlays.slice(firstYoutubeIndex, lastYoutubeIndex);

  const lastInstagramIndex = instagramCurrentPage * ITEMS_PER_PAGE;
  const firstInstagramIndex = lastInstagramIndex - ITEMS_PER_PAGE;
  const currentInstagramPlays = instagramPlays.slice(firstInstagramIndex, lastInstagramIndex);

  const handleSearch = () => {
    // TODO: 월, 연령, 주제에 따른 필터링 기능 추가
    alert('추천 받기 기능은 곧 추가될 예정입니다!');
    const youtubeData = playData.filter(p => p.sourceType === 'youtube');
    const instagramData = playData.filter(p => p.sourceType === 'instagram');
    setYoutubePlays(youtubeData);
    setInstagramPlays(instagramData);
  };

  return (
    <div className="play-page-container">
      <PlaySearch onSearch={handleSearch} />

      <section className="play-section">
        <h2 className="section-title">✨ 유튜브 추천 놀이</h2>
        <PlayList plays={currentYoutubePlays} />
        <Pagination
          totalItems={youtubePlays.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={youtubeCurrentPage}
          onPageChange={setYoutubeCurrentPage}
        />
      </section>

      <section className="play-section">
        <h2 className="section-title">📸 인스타그램 추천 놀이</h2>
        <PlayList plays={currentInstagramPlays} />
        <Pagination
          totalItems={instagramPlays.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={instagramCurrentPage}
          onPageChange={setInstagramCurrentPage}
        />
      </section>
    </div>
  );
};

export default Play; 