import { useEffect, useState } from 'react';
import { fetchCommunityPosts } from '../../api/community/communityApi';
import { getToken, getUser } from '../../utils/localStorage';

export default function useCommunityList(category) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getToken();
        const user = getUser();
        
        if (!token) {
          setError('로그인이 필요합니다.');
          setLoading(false);
          return;
        }

        // 사용자 권한 매핑 (서버의 UserType에 맞춤)
        let userRole = 'basic';
        if (user?.role) {
          switch (user.role) {
            case 'ROLE_TEACHER':
              userRole = 'teacher';
              break;
            case 'ROLE_OWNER':
              userRole = 'owner';
              break;
            case 'ROLE_BASIC':
            default:
              userRole = 'basic';
              break;
          }
        }

        const data = await fetchCommunityPosts({ 
          category, 
          role: userRole, 
          token, 
          isAuthenticated: true 
        });
        
        setPosts(data || []);
        setLoading(false);
        
        if (!data || data.length === 0) {
          if (category === 'teacher') {
            setError('교사 권한만 볼 수 있는 게시글입니다.');
          } else if (category === 'owner') {
            setError('원장 권한만 볼 수 있는 게시글입니다.');
          } else {
            setError('게시글이 없습니다.');
          }
        }
      } catch (err) {
        console.error('커뮤니티 게시글 조회 실패:', err);
        setError(err.message || '게시글을 불러오지 못했습니다.');
        setLoading(false);
        // 에러 발생 시 빈 배열로 설정
        setPosts([]);
      }
    };

    fetchPosts();
  }, [category]);

  return { posts, error, loading };
} 