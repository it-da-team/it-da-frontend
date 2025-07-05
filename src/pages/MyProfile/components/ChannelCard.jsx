import React from 'react';
import { FaHashtag } from 'react-icons/fa';

const ChannelCard = ({ channel, type }) => {
  return (
    <div className="profile-channel-card">
      <div className="profile-channel-title">
        <FaHashtag className="channel-hashtag-icon" />
        {channel.name}
      </div>
      <div className="profile-channel-desc">{channel.description}</div>
      <div className="profile-channel-stats" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span className="member-count">
          참여자: {channel.subUserCount || 0} / {channel.maxMembers || 300}
        </span>
      </div>
    </div>
  );
};

export default ChannelCard; 