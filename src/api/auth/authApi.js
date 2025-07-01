import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_RECRUITMENT_API_BASE_URL;

/**
 * 교사 인증을 요청하는 API
 * @param {FormData} formData - file, institutionName을 포함하는 FormData
 * @param {string} token - 사용자 인증 토큰
 * @returns {Promise<any>}
 */
export async function requestTeacherAuth(formData, token) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/users/auth-request`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('교사 인증 요청 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '교사 인증 요청에 실패했습니다.');
  }
} 