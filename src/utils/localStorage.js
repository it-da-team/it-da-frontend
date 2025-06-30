const FAVORITE_RECRUITMENTS_KEY = 'favoriteRecruitments';

// 관심공고 목록 가져오기
export const getFavoriteRecruitments = () => {
  const favorites = localStorage.getItem(FAVORITE_RECRUITMENTS_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

// 관심공고 추가
export const addFavoriteRecruitment = (recruitment) => {
  const favorites = getFavoriteRecruitments();
  if (!favorites.some(fav => fav.id === recruitment.id)) {
    favorites.push(recruitment);
    localStorage.setItem(FAVORITE_RECRUITMENTS_KEY, JSON.stringify(favorites));
    // 같은 창에서도 이벤트 발생시키기
    window.dispatchEvent(new StorageEvent('storage', {
      key: FAVORITE_RECRUITMENTS_KEY,
      newValue: JSON.stringify(favorites)
    }));
  }
};

// 관심공고 제거
export const removeFavoriteRecruitment = (recruitmentId) => {
  const favorites = getFavoriteRecruitments();
  const updatedFavorites = favorites.filter(fav => fav.id !== recruitmentId);
  localStorage.setItem(FAVORITE_RECRUITMENTS_KEY, JSON.stringify(updatedFavorites));
  // 같은 창에서도 이벤트 발생시키기
  window.dispatchEvent(new StorageEvent('storage', {
    key: FAVORITE_RECRUITMENTS_KEY,
    newValue: JSON.stringify(updatedFavorites)
  }));
};

// 관심공고 여부 확인
export const isFavoriteRecruitment = (recruitmentId) => {
  const favorites = getFavoriteRecruitments();
  return favorites.some(fav => fav.id === recruitmentId);
};

// =================================================================
//                      인증 토큰 관련
// =================================G================================

const TOKEN_KEY = 'accessToken';
const IS_LOGGED_IN_KEY = 'isLoggedIn';

/**
 * localStorage에 토큰과 로그인 상태를 저장합니다.
 * @param {string} token - 저장할 JWT 토큰
 */
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(IS_LOGGED_IN_KEY, 'true');
  window.dispatchEvent(new Event('storage')); // 로그인 상태 변경 알림
};

/**
 * localStorage에서 토큰과 로그인 상태를 제거합니다.
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(IS_LOGGED_IN_KEY);
  window.dispatchEvent(new Event('storage')); // 로그아웃 상태 변경 알림
};

/**
 * localStorage에서 토큰을 가져옵니다.
 * @returns {string | null} 저장된 토큰 또는 null
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * 저장된 토큰을 디코딩하여 사용자 정보를 반환합니다.
 * @returns {{ sub: string, role: string, [key: string]: any } | null} 사용자 정보 객체 또는 null
 */
export const getUser = () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    // 토큰의 payload 부분을 디코딩합니다.
    const payload = JSON.parse(atob(token.split('.')[1]));
    // payload에는 sub(이메일), role, iat, exp 등이 포함됩니다.
    // 백엔드에서 이름(name) 등 추가 정보를 토큰에 넣어주면 여기서 활용 가능합니다.
    return payload;
  } catch (e) {
    console.error("토큰 디코딩 실패:", e);
    // 유효하지 않은 토큰이 저장되어 있을 경우, 삭제하여 문제를 방지합니다.
    removeToken();
    return null;
  }
}; 