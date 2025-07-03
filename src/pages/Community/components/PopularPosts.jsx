import React, { useEffect, useState } from 'react';
import './PopularPosts.css';
import { FaFire } from 'react-icons/fa';
import popularPostsData from '../../../data/popularPosts.json';

const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 더미 데이터 사용
    setPopularPosts(popularPostsData.posts || []);
    setLoading(false);
  }, []);

  if (loading) return <div className="popular-posts-container">로딩 중...</div>;

  return (
    <div className="popular-posts-container">
      <h3 className="popular-posts-title">
        <FaFire className="fire-icon" />
        인기글
      </h3>
      <ul className="popular-posts-list">
        {popularPosts && popularPosts.length > 0 ? (
          popularPosts.map((post, index) => (
            <li key={post.id} className="popular-post-item">
              <span className={`ranking-number rank-${index + 1}`}>{index + 1}</span>
              <span className="popular-post-title">{post.title}</span>
              <span className="popular-post-likes">{post.likes} ❤️</span>
            </li>
          ))
        ) : (
          <li className="popular-post-item">
            <span className="no-posts">인기글이 없습니다.</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PopularPosts; 