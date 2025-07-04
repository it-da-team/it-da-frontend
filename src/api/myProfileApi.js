import axios from '../utils/axiosConfig';

export const fetchMyProfile = async () => {
  console.log('[myProfileApi] fetchMyProfile 요청 시작');
  try {
    const res = await axios.get('/community/profile/my');
    console.log('[myProfileApi] fetchMyProfile 응답:', res.data);
    return res.data.data;
  } catch (err) {
    console.error('[myProfileApi] fetchMyProfile 에러:', err);
    throw err;
  }
}; 