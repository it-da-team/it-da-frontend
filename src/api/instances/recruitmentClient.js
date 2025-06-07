import axios from 'axios';

const recruitmentClient = axios.create({
baseURL: process.env.REACT_APP_RECRUITMENT_API_BASE_URL, // ✅ .env에서 불러옴
withCredentials: true, // 로그인 상태 유지를 위해 필요한 경우
});

export default recruitmentClient;