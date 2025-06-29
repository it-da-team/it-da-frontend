import React from 'react';
import './PlayItem.css';

const PlayItem = ({ play }) => {
  const { title, description, sourceType, sourceUrl, shoppingItems } = play;

  const ShoppingInfo = () => (
    <div className="play-item-shopping">
      <h4>이 놀이 아이템 최저가! 🛒</h4>
      <ul>
        {shoppingItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.price.toLocaleString()}원 ~
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="play-item-card">
        <h3 className="play-item-title">{title}</h3>
        <p className="play-item-description">{description}</p>
      
      <div className="play-item-media-content">
        {sourceType === 'youtube' && (
          <div className="media-youtube">
            <iframe
              src={sourceUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {sourceType === 'instagram' && (
          <div className="media-instagram">
            <iframe
              src={sourceUrl}
              frameBorder="0"
              scrolling="no"
              allowTransparency="true"
              allowFullScreen="true"
            ></iframe>
          </div>
        )}
      </div>

      <ShoppingInfo />
      <button className="add-play-button">이 놀이 담기 💜</button>
    </div>
  );
};

export default PlayItem; 