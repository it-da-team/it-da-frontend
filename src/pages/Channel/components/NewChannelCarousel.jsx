import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaUsers, FaHashtag } from 'react-icons/fa';
import './NewChannelCarousel.css';

const NewChannelCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const intervalRef = useRef(null);

  // 임시 데이터 (실제로는 API에서 가져올 예정)
  const originalChannels = [
    {
      id: 1,
      name: "유치원 교사 커뮤니티",
      description: "유치원 교사들의 일상과 교육 노하우를 공유하는 공간",
      memberCount: 156,
      accessPermission: "교사",
      keywords: ["유치원", "교육", "커뮤니티"],
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "원장님 네트워킹",
      description: "원장님들의 경영 노하우와 정보를 교환하는 채널",
      memberCount: 89,
      accessPermission: "원장",
      keywords: ["원장", "경영", "네트워킹"],
      createdAt: "2024-01-15"
    },
    {
      id: 3,
      name: "보육교사 일상",
      description: "보육교사들의 일상과 보육 노하우를 나누는 공간",
      memberCount: 234,
      accessPermission: "교사",
      keywords: ["보육", "일상", "노하우"],
      createdAt: "2024-01-15"
    },
    {
      id: 4,
      name: "어린이집 운영 팁",
      description: "어린이집 운영에 도움이 되는 다양한 팁과 정보",
      memberCount: 67,
      accessPermission: "전체",
      keywords: ["어린이집", "운영", "팁"],
      createdAt: "2024-01-15"
    },
    {
      id: 5,
      name: "유아교육 자료실",
      description: "유아교육에 활용할 수 있는 다양한 자료들을 공유",
      memberCount: 189,
      accessPermission: "교사",
      keywords: ["유아교육", "자료", "공유"],
      createdAt: "2024-01-15"
    },
    {
      id: 6,
      name: "교사 스트레스 해소",
      description: "교사들의 스트레스 해소 방법과 힐링 공간",
      memberCount: 123,
      accessPermission: "교사",
      keywords: ["스트레스", "힐링", "교사"],
      createdAt: "2024-01-15"
    }
  ];

  // 무한 슬라이드를 위해 배열을 3배로 확장
  const newChannels = [...originalChannels, ...originalChannels, ...originalChannels];

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setSlideDirection('left');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= originalChannels.length ? 0 : nextIndex;
      });
      setIsTransitioning(false);
    }, 1100);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setSlideDirection('right');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const prevIndexValue = prevIndex - 1;
        return prevIndexValue < 0 ? originalChannels.length - 1 : prevIndexValue;
      });
      setIsTransitioning(false);
    }, 1100);
  };

  // 자동 재생 시작/정지 (2초마다)
  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 2000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 마우스 호버 시 자동재생 정지
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    startAutoPlay();
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, isTransitioning]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // 현재 보여줄 카드들 (무한 슬라이드)
  const getVisibleCards = () => {
    const cards = [];
    
    // 이전 카드 (왼쪽)
    const prevIndex = (currentIndex - 1 + originalChannels.length) % originalChannels.length;
    cards.push({
      ...originalChannels[prevIndex],
      position: -1,
      isMain: false,
      cardIndex: prevIndex
    });
    
    // 메인 카드 (중앙)
    cards.push({
      ...originalChannels[currentIndex],
      position: 0,
      isMain: true,
      cardIndex: currentIndex
    });
    
    // 다음 카드 (오른쪽)
    const nextIndex = (currentIndex + 1) % originalChannels.length;
    cards.push({
      ...originalChannels[nextIndex],
      position: 1,
      isMain: false,
      cardIndex: nextIndex
    });
    
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div 
      className="new-channel-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-container">
        <button 
          className="carousel-btn carousel-btn-prev"
          onClick={prevSlide}
          disabled={isTransitioning}
          aria-label="이전 채널"
        >
          <FaChevronLeft />
        </button>

        <div className="carousel-track">
          <div className="carousel-slide">
            {visibleCards.map((channel) => (
              <div 
                key={channel.id}
                className={`channel-card ${channel.isMain ? 'main-card' : 'side-card'} ${isTransitioning ? `slide-${slideDirection}` : ''}`}
                style={{
                  '--card-position': channel.position,
                  '--card-index': channel.cardIndex
                }}
              >
                <div className="channel-card-header">
                  <div className="channel-card-title">
                    <FaHashtag className="channel-icon" />
                    <h3>{channel.name}</h3>
                  </div>
                  <div className="channel-card-meta">
                    <span className="channel-permission">{channel.accessPermission}</span>
                    <div className="channel-members">
                      <FaUsers />
                      <span>{channel.memberCount}명</span>
                    </div>
                  </div>
                </div>
                
                <p className="channel-description">{channel.description}</p>
                
                <div className="channel-keywords">
                  {channel.keywords.map((keyword, keywordIdx) => (
                    <span key={keywordIdx} className="keyword-tag">
                      #{keyword}
                    </span>
                  ))}
                </div>
                
                <div className="channel-card-footer">
                  <button className="join-channel-btn">
                    참여하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-btn carousel-btn-next"
          onClick={nextSlide}
          disabled={isTransitioning}
          aria-label="다음 채널"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default NewChannelCarousel; 