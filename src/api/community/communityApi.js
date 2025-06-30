import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_RECRUITMENT_API_BASE_URL;

// API_BASE_URL 확인 로그
console.log('Community API - API_BASE_URL:', API_BASE_URL);

// 커뮤니티 게시글 조회 API
// category: 'all', 'teacher', 'owner'
export async function fetchCommunityPosts({ category, role, token, isAuthenticated }) {
  try {
    // 권한에 따른 엔드포인트 매핑
    let endpoint;
    if (category === 'all') {
      endpoint = '/community/read/'; // 전체 게시판 (루트)
    } else if (category === 'teacher') {
      endpoint = '/community/read/teacher'; // 교사 게시판
    } else if (category === 'owner') {
      endpoint = '/community/read/owner'; // 원장 게시판
    } else {
      throw new Error('유효하지 않은 카테고리입니다.');
    }

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // 서버 응답 구조에 맞게 데이터 변환
    let posts = response.data.data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      authorBadge: post.authorBadge,
      likes: post.likes,
      commentsCount: post.commentsCount,
      createdAt: post.createdAt,
      category: post.category,
      imageUrl: post.imageUrl,
      // 권한 체크 및 블라인드 처리
      isBlind: false // 서버에서 이미 권한 체크를 했으므로 기본적으로 false
    }));

    // 카테고리별 추가 필터링
    if (category === 'teacher') {
      // 교사만 탭에서는 '교사 게시판' 카테고리만 필터링
      posts = posts.filter(post => post.category === '교사 게시판');
    } else if (category === 'owner') {
      // 원장만 탭에서는 '원장 게시판' 카테고리만 필터링
      posts = posts.filter(post => post.category === '원장 게시판');
    }
    // 'all' 카테고리는 모든 게시물을 그대로 표시

    console.log(`카테고리 ${category} 필터링 결과:`, posts.length, '개 게시물');

    return posts;
  } catch (error) {
    console.error('커뮤니티 게시글 조회 실패:', error);
    
    // 권한 관련 에러 처리
    if (error.response?.status === 403) {
      throw new Error('해당 게시판에 접근할 권한이 없습니다.');
    }
    
    // 네트워크 에러 등 기타 에러
    throw new Error('게시글을 불러오지 못했습니다.');
  }
}

// 게시글 상세 조회 API
export async function fetchPostDetail(postHash, token) {
  try {
    console.log('게시글 상세 조회 시작:', { postHash, hasToken: !!token });
    
    const response = await axios.get(`${API_BASE_URL}/community/read/detail/${postHash}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('서버 응답:', response.data);
    
    // 응답 데이터 구조 확인
    if (!response.data || !response.data.data) {
      console.error('서버 응답 구조가 예상과 다릅니다:', response.data);
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    
    const data = response.data.data;
    
    // postDto와 parentCommentDto 존재 확인
    if (!data.postDto) {
      console.error('postDto가 없습니다. 응답 데이터:', data);
      throw new Error('게시글 정보를 찾을 수 없습니다.');
    }
    
    // 서버 응답 구조에 맞게 데이터 변환
    const result = {
      // 게시글 정보
      ...data.postDto,
      // 댓글 정보 (부모 댓글만)
      comments: (data.parentCommentDto || []).map(comment => ({
        id: comment.id,
        author: comment.author,
        authorBadge: comment.authorBadge,
        content: comment.content,
        likes: comment.likes,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        replyCount: comment.reCommentsCount,
        hasReplies: comment.hasReplies,
        replies: [] // 초기에는 빈 배열 (Lazy Loading)
      }))
    };

    console.log('변환된 데이터:', result);
    return result;
  } catch (error) {
    console.error('게시글 상세 조회 상세 에러:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    
    // 서버에서 권한 정보가 포함된 에러 응답이 있는 경우
    if (error.response?.data?.error === 'ACCESS_DENIED' && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    // 기타 모든 에러는 권한 부족으로 처리
    throw new Error('해당 게시글에 접근할 권한이 없습니다.');
  }
}

// 답글 조회 API
export async function fetchReplies(commentId, token) {
  try {
    console.log('대댓글 조회 시작:', { commentId, hasToken: !!token });
    
    const response = await axios.get(`${API_BASE_URL}/community/read/comment/${commentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('대댓글 조회 서버 응답:', response.data);
    
    // 응답 데이터 구조 확인
    if (!response.data || !response.data.data) {
      console.error('서버 응답 구조가 예상과 다릅니다:', response.data);
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    
    const replies = response.data.data;
    
    // 배열이 아닌 경우 처리
    if (!Array.isArray(replies)) {
      console.error('대댓글 데이터가 배열이 아닙니다:', replies);
      throw new Error('대댓글 데이터 형식이 올바르지 않습니다.');
    }

    const result = replies.map(reply => ({
      id: reply.id,
      author: reply.author,
      authorBadge: reply.authorBadge,
      content: reply.content,
      likes: reply.likes,
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt,
      parentCommentId: reply.parentCommentId,
      isDeleted: reply.isDeleted,
      hasReplies: reply.hasReplies,
      replyCount: reply.recommentCount,
      depth: reply.depth
    }));
    
    console.log('변환된 대댓글 데이터:', result);
    return result;
  } catch (error) {
    console.error('대댓글 조회 상세 에러:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    
    // 서버에서 받은 에러 메시지가 있으면 그대로 사용
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('답글을 불러오지 못했습니다.');
  }
}

// 인기글 조회 API (향후 구현)
export async function fetchPopularPosts(token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/community/read/popular`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.data;
  } catch (error) {
    console.error('인기글 조회 실패:', error);
    throw new Error('인기글을 불러오지 못했습니다.');
  }
}

// 게시글 검색 API (향후 구현)
export async function searchPosts(keyword, token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/community/read/search`, {
      params: { keyword },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.data;
  } catch (error) {
    console.error('게시글 검색 실패:', error);
    throw new Error('검색 결과를 불러오지 못했습니다.');
  }
}

// 게시글 생성 API
export async function createPost(postData, token) {
  try {
    const response = await axios.post(`${API_BASE_URL}/community/create/`, postData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('게시글 생성 실패:', error.response);
    throw new Error(error.response?.data?.message || '게시글 생성에 실패했습니다.');
  }
}