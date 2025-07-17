import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_RECRUITMENT_API_BASE_URL,
  timeout: 5000,
});

// // 요청 인터셉터
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // 토큰이 만료되었거나 유효하지 않은 경우
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('isLoggedIn');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default instance; 