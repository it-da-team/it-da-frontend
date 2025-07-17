import React, { useEffect, useState } from 'react';
import './PopularPosts.css';
import { FaFire } from 'react-icons/fa';
import { fetchPopularPosts } from '../../../api/community/communityApi';
// import { getToken } from '../../../utils/localStorage';

const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const token = getToken();
        // if (!token) {
        //   setError('로그인이 필요합니다.');
        //   setLoading(false);
        //   return;
        // }

        const data = await fetchPopularPosts();
        setPopularPosts(data || []);
        setLoading(false);
      } catch (err) {
        console.error('인기글 조회 실패:', err);
        setError('인기글을 불러오지 못했습니다.');
        setLoading(false);
        // 에러 발생 시 빈 배열로 설정
        setPopularPosts([]);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="popular-posts-container">로딩 중...</div>;
  if (error) return <div className="popular-posts-container">{error}</div>;

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