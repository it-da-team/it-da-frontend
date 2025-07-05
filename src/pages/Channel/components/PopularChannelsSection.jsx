import React, { useState } from 'react';
import { FaUsers, FaHashtag, FaFire } from 'react-icons/fa';
import './PopularChannelsSection.css';

const PopularChannelsSection = () => {
  const [activeTab, setActiveTab] = useState('전체');

  // 임시 데이터 (실제로는 API에서 가져올 예정)
  const popularChannels = {
    전체: [
      {
        id: 1,
        name: "유치원 교사 커뮤니티",
        description: "유치원 교사들의 일상과 교육 노하우를 공유하는 공간",
        memberCount: 1256,
        maxMembers: 2000,
        accessPermission: "교사",
        keywords: ["유치원", "교육", "커뮤니티"],
        rank: 1
      },
      {
        id: 2,
        name: "원장님 네트워킹",
        description: "원장님들의 경영 노하우와 정보를 교환하는 채널",
        memberCount: 892,
        maxMembers: 1500,
        accessPermission: "원장",
        keywords: ["원장", "경영", "네트워킹"],
        rank: 2
      },
      {
        id: 3,
        name: "보육교사 일상",
        description: "보육교사들의 일상과 보육 노하우를 나누는 공간",
        memberCount: 734,
        maxMembers: 1000,
        accessPermission: "교사",
        keywords: ["보육", "일상", "노하우"],
        rank: 3
      }
    ],
    교사: [
      {
        id: 4,
        name: "유치원 교사 커뮤니티",
        description: "유치원 교사들의 일상과 교육 노하우를 공유하는 공간",
        memberCount: 1256,
        maxMembers: 2000,
        accessPermission: "교사",
        keywords: ["유치원", "교육", "커뮤니티"],
        rank: 1
      },
      {
        id: 5,
        name: "보육교사 일상",
        description: "보육교사들의 일상과 보육 노하우를 나누는 공간",
        memberCount: 734,
        maxMembers: 1000,
        accessPermission: "교사",
        keywords: ["보육", "일상", "노하우"],
        rank: 2
      },
      {
        id: 6,
        name: "유아교육 자료실",
        description: "유아교육에 활용할 수 있는 다양한 자료들을 공유",
        memberCount: 589,
        maxMembers: 800,
        accessPermission: "교사",
        keywords: ["유아교육", "자료", "공유"],
        rank: 3
      }
    ],
    원장: [
      {
        id: 7,
        name: "원장님 네트워킹",
        description: "원장님들의 경영 노하우와 정보를 교환하는 채널",
        memberCount: 892,
        maxMembers: 1500,
        accessPermission: "원장",
        keywords: ["원장", "경영", "네트워킹"],
        rank: 1
      },
      {
        id: 8,
        name: "어린이집 운영 팁",
        description: "어린이집 운영에 도움이 되는 다양한 팁과 정보",
        memberCount: 467,
        maxMembers: 600,
        accessPermission: "원장",
        keywords: ["어린이집", "운영", "팁"],
        rank: 2
      },
      {
        id: 9,
        name: "원장 경영 노하우",
        description: "원장님들의 경영 노하우와 정보를 교환하는 채널",
        memberCount: 345,
        maxMembers: 500,
        accessPermission: "원장",
        keywords: ["경영", "노하우", "정보"],
        rank: 3
      }
    ]
  };

  const tabs = ['전체', '교사', '원장'];

  return (
    <section className="popular-channels-section">
      <div className="section-header">
        <h2 className="section-title">
          <FaFire className="title-icon" />
          인기 채널 TOP 3
        </h2>
        <p className="section-subtitle">참여자가 가장 많은 인기 채널들을 확인해보세요</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="popular-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`popular-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 채널 리스트 */}
      <div className="popular-channels-grid">
        {popularChannels[activeTab].map((channel, index) => (
          <div key={channel.id} className="popular-channel-card">
            <div className="channel-rank">
              <span className="rank-number">{channel.rank}</span>
            </div>
            
            <div className="channel-content">
              <div className="channel-header">
                <div className="channel-title">
                  <FaHashtag className="channel-icon" />
                  <h3>{channel.name}</h3>
                </div>
                <span className="channel-permission">{channel.accessPermission}</span>
              </div>
              
              <p className="channel-description">{channel.description}</p>
              
              <div className="channel-stats">
                <div className="member-count">
                  <FaUsers />
                  <span>{channel.memberCount.toLocaleString()}명</span>
                  <span className="max-members">/ {channel.maxMembers.toLocaleString()}명</span>
                </div>
                <div className="member-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: `${(channel.memberCount / channel.maxMembers) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="channel-keywords">
                {channel.keywords.map((keyword, idx) => (
                  <span key={idx} className="keyword-tag">
                    #{keyword}
                  </span>
                ))}
              </div>
              
              <button className="join-channel-btn">
                참여하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularChannelsSection; 