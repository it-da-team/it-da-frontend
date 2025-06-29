import React, { useState, useEffect, useRef } from 'react';
import './PostActions.css';
import { FaHeart, FaRegHeart, FaEllipsisH, FaPen, FaTrash, FaShareAlt, FaExclamationTriangle } from 'react-icons/fa';

const PostActions = ({ likes, isAuthor = true }) => {
    // 현재 사용자가 좋아요를 눌렀는지 여부 (API 연동 필요)
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
    // TODO: API 호출로 서버에 좋아요 상태 업데이트
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="post-actions-container">
      <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        <span>{currentLikes}</span>
      </button>
      <div className="post-menu" ref={menuRef}>
        <button className="menu-button" onClick={handleMenuToggle}><FaEllipsisH /></button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            {isAuthor && (
              <>
                <a href="#" className="dropdown-item"><FaPen /> 수정하기</a>
                <a href="#" className="dropdown-item danger"><FaTrash /> 삭제하기</a>
              </>
            )}
            {!isAuthor && (
                 <a href="#" className="dropdown-item danger"><FaExclamationTriangle /> 신고하기</a>
            )}
            <a href="#" className="dropdown-item"><FaShareAlt /> 공유하기</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostActions; 