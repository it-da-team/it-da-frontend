import React, { useEffect, useState } from 'react';
import { FaFire } from 'react-icons/fa';
import PopularChannelItem from './PopularChannelItem';
import './PopularChannels.css';

// TODO: Replace with real API call
const mockPopularChannels = [
  { id: 1, name: '잇다 유치원 선생님 모임', description: '전국 유치원 선생님들의 정보 공유 채널' },
  { id: 2, name: '2024년 독서모임', description: '함께 책 읽고 성장하는 모임' },
  { id: 3, name: '육아 꿀팁방', description: '육아 정보를 나누는 채널' },
  { id: 4, name: '교사 커뮤니티', description: '교사들의 소통 공간' },
  { id: 5, name: '자격증 스터디', description: '함께 공부하는 스터디 채널' }
];

export default function PopularChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setChannels(mockPopularChannels);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="popular-channels-container">로딩 중...</div>;

  return (
    <div className="popular-channels-container">
      <h3 className="popular-channels-title">
        <FaFire className="fire-icon" />
        인기 채널
      </h3>
      <ul className="popular-channels-list">
        {channels && channels.length > 0 ? (
          channels.slice(0, 5).map((channel) => (
            <PopularChannelItem key={channel.id} channel={channel} />
          ))
        ) : (
          <li className="popular-channel-item">
            <span className="no-channels">인기 채널이 없습니다.</span>
          </li>
        )}
      </ul>
    </div>
  );
} 