import React from 'react';
import { FaHashtag } from 'react-icons/fa';
import './PopularChannelItem.css';

export default function PopularChannelItem({ channel }) {
  return (
    <li className="popular-channel-item">
      <span className="popular-channel-title">
        <FaHashtag className="channel-hashtag-icon" />
        <span className="channel-title-text">{channel.name}</span>
      </span>
      <span className="popular-channel-desc">{channel.description}</span>
    </li>
  );
} 