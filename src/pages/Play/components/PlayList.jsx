import React from 'react';
import PlayItem from './PlayItem';
import './PlayList.css';

const PlayList = ({ plays }) => {
  return (
    <div className="play-list-container">
      {plays.map((play) => (
        <PlayItem key={play.id} play={play} />
      ))}
    </div>
  );
};

export default PlayList; 