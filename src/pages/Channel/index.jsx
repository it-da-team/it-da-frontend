import React from 'react';
import './ChannelMain.css';
import NewChannelCarousel from './components/NewChannelCarousel';
import PopularChannelsSection from './components/PopularChannelsSection';
import KeywordChannelsSection from './components/KeywordChannelsSection';
import ChannelSidebar from './components/ChannelSidebar';

const ChannelMain = () => {
  return (
    <div className="channel-main-container">
      {/* 상단 새로운 채널 캐러셀 */}
      <section className="new-channels-section">
        <div className="section-header">
          <h2 className="section-title">오늘의 새로운 채널</h2>
          <p className="section-subtitle">매일 새롭게 생성되는 특별한 공간들을 만나보세요</p>
        </div>
        <NewChannelCarousel />
      </section>

      {/* 메인 콘텐츠 영역 */}
      <div className="channel-main-content">
        <div className="channel-main-left">
          {/* 인기 채널 섹션 */}
          <PopularChannelsSection />
          
          {/* 키워드 채널 섹션 */}
          <KeywordChannelsSection />
        </div>
        
        {/* 사이드바 */}
        <div className="channel-main-sidebar">
          <ChannelSidebar />
        </div>
      </div>
    </div>
  );
};

export default ChannelMain; 