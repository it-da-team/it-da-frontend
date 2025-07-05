import React from 'react';
import { FaHashtag } from 'react-icons/fa';
import ChannelCard from './ChannelCard';
import EmptyChannelState from './EmptyChannelState';

const ChannelSection = ({ myChannels, joinedChannels, canCreateChannel, channelCount, onNavigateToCreate, onNavigateToChannelMain }) => {
  return (
    <div className="profile-channel-list-wrap">
      <div className="profile-channel-list-header">
        <button
          className="create-channel-btn"
          disabled={!canCreateChannel}
          title={canCreateChannel ? '' : '채널은 1개만 만들 수 있습니다.'}
          onClick={() => canCreateChannel && onNavigateToCreate()}
        >
          내 채널 만들러가기 ({channelCount}/1)
        </button>
      </div>
      
      {/* 내가 만든 채널 섹션 */}
      {myChannels.length > 0 ? (
        <>
          <div className="profile-channel-section-title">내가 만든 채널</div>
          <div className="profile-card-list">
            {myChannels.map(channel => (
              <ChannelCard key={channel.id} channel={channel} type="owner" />
            ))}
          </div>
          <hr className="profile-channel-divider" />
        </>
      ) : (
        <>
          <div className="profile-channel-section-title">내가 만든 채널</div>
          <EmptyChannelState 
            message="아직 만든 채널이 없습니다."
            linkText="내 채널 만들러가기"
            linkHref="/channel/create"
          />
          <hr className="profile-channel-divider" />
        </>
      )}
      
      {/* 참여한 채널 섹션 */}
      {joinedChannels.length > 0 ? (
        <>
          <div className="profile-channel-section-header">
            <div className="profile-channel-section-title">참여한 채널</div>
            <button 
              className="channel-more-btn"
              onClick={onNavigateToChannelMain}
            >
              채널 더보기
            </button>
          </div>
          <div className="profile-card-list">
            {joinedChannels.map(channel => (
              <ChannelCard key={channel.id} channel={channel} type="subscriber" />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="profile-channel-section-header">
            <div className="profile-channel-section-title">참여한 채널</div>
            <button 
              className="channel-more-btn"
              onClick={onNavigateToChannelMain}
            >
              채널 더보기
            </button>
          </div>
          <EmptyChannelState 
            message="현재 구독 중인 채널이 없습니다."
            linkText="채널 구독하러가기"
            linkHref="/community"
          />
        </>
      )}
    </div>
  );
};

export default ChannelSection; 