import React from 'react';
import MainBanner from './MainBanner';
import MainCategory from './MainCategory';
import MainCategoryList from './MainCategoryList';
import HotRecruitSection from './HotRecruitSection';
import RegionStatsSection from './RegionStatsSection';
import StatsBar from './StatsBar';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="main-section">
        <MainBanner />
      </div>
      <div className="main-section">
        <MainCategory />
      </div>
      <div className="main-section">
        <MainCategoryList />
      </div>

      <div className="divider-horizon" />
      
      <div className="main-section last-section">
        <RegionStatsSection />
      </div>
      <div className="main-section">
        <StatsBar />
      </div>
      <div className="divider-horizon" />
      <div className="main-section">
        <HotRecruitSection />
      </div>
    </div>
  );
}

export default Home;