import React from 'react';
import { FaHashtag, FaUsers, FaPlus, FaCrown } from 'react-icons/fa';
import './ChannelSidebar.css';

const ChannelSidebar = () => {
  // 임시 데이터 (실제로는 API에서 가져올 예정)
  const myChannels = [
    {
      id: 1,
      name: "내가 만든 채널 1",
      memberCount: 45,
      maxMembers: 100,
      accessPermission: "교사",
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      name: "내가 만든 채널 2",
      memberCount: 23,
      maxMembers: 50,
      accessPermission: "전체",
      createdAt: "2024-01-08"
    }
  ];

  const joinedChannels = [
    {
      id: 3,
      name: "참여한 채널 1",
      memberCount: 156,
      maxMembers: 200,
      accessPermission: "교사",
      joinedAt: "2024-01-05"
    },
    {
      id: 4,
      name: "참여한 채널 2",
      memberCount: 89,
      maxMembers: 150,
      accessPermission: "원장",
      joinedAt: "2024-01-03"
    },
    {
      id: 5,
      name: "참여한 채널 3",
      memberCount: 234,
      maxMembers: 300,
      accessPermission: "전체",
      joinedAt: "2024-01-01"
    }
  ];

  return (
    <div className="channel-sidebar">
      {/* 내가 만든 채널 */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <h3 className="sidebar-section-title">
            <FaCrown className="section-icon" />
            내가 만든 채널
          </h3>
          <button className="create-channel-btn">
            <FaPlus />
          </button>
        </div>
        
        <div className="sidebar-channel-list">
          {myChannels.length > 0 ? (
            myChannels.map(channel => (
              <div key={channel.id} className="sidebar-channel-item owner">
                <div className="channel-item-header">
                  <div className="channel-item-title">
                    <FaHashtag className="channel-icon" />
                    <span>{channel.name}</span>
                  </div>
                  <span className="channel-permission">{channel.accessPermission}</span>
                </div>
                
                <div className="channel-item-stats">
                  <div className="member-count">
                    <FaUsers />
                    <span>{channel.memberCount}명</span>
                    <span className="max-members">/ {channel.maxMembers}명</span>
                  </div>
                  <div className="member-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${(channel.memberCount / channel.maxMembers) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="channel-item-footer">
                  <span className="channel-date">{channel.createdAt}</span>
                  <button className="manage-channel-btn">관리</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>아직 만든 채널이 없습니다.</p>
              <button className="create-first-channel-btn">
                첫 번째 채널 만들기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 내가 참여한 채널 */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <h3 className="sidebar-section-title">
            <FaUsers className="section-icon" />
            참여한 채널
          </h3>
        </div>
        
        <div className="sidebar-channel-list">
          {joinedChannels.length > 0 ? (
            joinedChannels.map(channel => (
              <div key={channel.id} className="sidebar-channel-item subscriber">
                <div className="channel-item-header">
                  <div className="channel-item-title">
                    <FaHashtag className="channel-icon" />
                    <span>{channel.name}</span>
                  </div>
                  <span className="channel-permission">{channel.accessPermission}</span>
                </div>
                
                <div className="channel-item-stats">
                  <div className="member-count">
                    <FaUsers />
                    <span>{channel.memberCount}명</span>
                    <span className="max-members">/ {channel.maxMembers}명</span>
                  </div>
                  <div className="member-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${(channel.memberCount / channel.maxMembers) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="channel-item-footer">
                  <span className="channel-date">{channel.joinedAt}</span>
                  <button className="view-channel-btn">보기</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>현재 구독 중인 채널이 없습니다.</p>
              <button className="explore-channels-btn">
                채널 둘러보기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelSidebar; 