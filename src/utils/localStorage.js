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