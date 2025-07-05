import React, { useState } from 'react';
import { FaHashtag, FaUsers, FaChartLine } from 'react-icons/fa';
import './KeywordChannelsSection.css';

const KeywordChannelsSection = () => {
  const [selectedKeyword, setSelectedKeyword] = useState('유아교육');

  // 임시 데이터 (실제로는 API에서 가져올 예정)
  const monthlyKeywords = [
    { name: '유아교육', count: 45, trend: 'up' },
    { name: '보육', count: 32, trend: 'up' },
    { name: '원장', count: 28, trend: 'up' },
    { name: '커뮤니티', count: 25, trend: 'down' },
    { name: '네트워킹', count: 22, trend: 'up' },
    { name: '운영', count: 18, trend: 'stable' }
  ];

  const keywordChannels = {
    유아교육: [
      {
        id: 1,
        name: "유아교육 자료실",
        description: "유아교육에 활용할 수 있는 다양한 자료들을 공유하는 채널",
        memberCount: 589,
        maxMembers: 800,
        accessPermission: "교사",
        keywords: ["유아교육", "자료", "공유"],
        createdAt: "2024-01-10"
      },
      {
        id: 2,
        name: "유아교육 연구회",
        description: "유아교육에 대한 연구와 토론을 나누는 공간",
        memberCount: 234,
        maxMembers: 500,
        accessPermission: "교사",
        keywords: ["유아교육", "연구", "토론"],
        createdAt: "2024-01-08"
      },
      {
        id: 3,
        name: "유아교육 실무 팁",
        description: "유아교육 현장에서 활용할 수 있는 실무 팁 공유",
        memberCount: 156,
        maxMembers: 300,
        accessPermission: "교사",
        keywords: ["유아교육", "실무", "팁"],
        createdAt: "2024-01-05"
      }
    ],
    보육: [
      {
        id: 4,
        name: "보육교사 일상",
        description: "보육교사들의 일상과 보육 노하우를 나누는 공간",
        memberCount: 734,
        maxMembers: 1000,
        accessPermission: "교사",
        keywords: ["보육", "일상", "노하우"],
        createdAt: "2024-01-12"
      },
      {
        id: 5,
        name: "보육 프로그램",
        description: "다양한 보육 프로그램과 활동을 공유하는 채널",
        memberCount: 298,
        maxMembers: 600,
        accessPermission: "교사",
        keywords: ["보육", "프로그램", "활동"],
        createdAt: "2024-01-09"
      }
    ],
    원장: [
      {
        id: 6,
        name: "원장님 네트워킹",
        description: "원장님들의 경영 노하우와 정보를 교환하는 채널",
        memberCount: 892,
        maxMembers: 1500,
        accessPermission: "원장",
        keywords: ["원장", "경영", "네트워킹"],
        createdAt: "2024-01-11"
      },
      {
        id: 7,
        name: "원장 경영 노하우",
        description: "원장님들의 경영 노하우와 정보를 교환하는 채널",
        memberCount: 345,
        maxMembers: 500,
        accessPermission: "원장",
        keywords: ["경영", "노하우", "정보"],
        createdAt: "2024-01-07"
      }
    ]
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <FaChartLine className="trend-icon trend-up" />;
      case 'down':
        return <FaChartLine className="trend-icon trend-down" />;
      default:
        return <span className="trend-icon trend-stable">─</span>;
    }
  };

  return (
    <section className="keyword-channels-section">
      <div className="section-header">
        <h2 className="section-title">
          <FaChartLine className="title-icon" />
          이번달 키워드 채널
        </h2>
        <p className="section-subtitle">트렌딩 키워드로 찾는 맞춤형 채널</p>
      </div>

      {/* 키워드 선택 */}
      <div className="keyword-selector">
        <div className="keyword-tabs">
          {monthlyKeywords.map((keyword) => (
            <button
              key={keyword.name}
              className={`keyword-tab ${selectedKeyword === keyword.name ? 'active' : ''}`}
              onClick={() => setSelectedKeyword(keyword.name)}
            >
              <div className="keyword-info">
                <span className="keyword-name">#{keyword.name}</span>
                <div className="keyword-stats">
                  {getTrendIcon(keyword.trend)}
                  <span className="keyword-count">{keyword.count}개</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 키워드별 채널 리스트 */}
      <div className="keyword-channels-list">
        {keywordChannels[selectedKeyword] ? (
          keywordChannels[selectedKeyword].map((channel) => (
            <div key={channel.id} className="keyword-channel-card">
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
              
              <div className="channel-footer">
                <span className="channel-date">{channel.createdAt}</span>
                <button className="join-channel-btn">
                  참여하기
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-channels-message">
            <p>해당 키워드로 생성된 채널이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default KeywordChannelsSection; 