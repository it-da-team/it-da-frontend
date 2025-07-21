import axios from '../instances/recruitmentClient';

export const fetchRecruitmentsByCategory = async (category) => {
    try {
        console.log('API 요청 시작:', category);
        console.log('Base URL:', process.env.REACT_APP_RECRUITMENT_API_BASE_URL);
        
        const response = await axios.get(`/recruitment/${category}`);
        console.log('API 응답:', response.data);
        // 서버 응답에서 data 필드 추출
        return response.data.data || [];
    } catch (error) {
        console.error('API 에러 상세:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
        });
        throw error;
    }
};

export const fetchRecruitmentDetail = async (id, signal) => {
    try {
        console.log('상세 정보 요청 시작:', id);
        const response = await axios.get(`/recruitment/detail/${id}`, { signal });
        console.log('상세 정보 응답:', response.data);
        return response.data.data;
    } catch (error) {
        console.error('상세 정보 에러:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
        });
        throw error;
    }
};

export const fetchFilteredRecruitments = async (filterDto) => {
    try {
      // undefined 값 제거 후 JSON 직렬화/역직렬화로 배열 보장
      const safeDto = JSON.parse(JSON.stringify(filterDto));
      console.log('AXIOS POST safeDto:', safeDto, Array.isArray(safeDto.province));
      console.log('AXIOS POST 전체 DTO:', safeDto);
      console.log('=== 필터 검색 요청 시작 ===');
      console.log('URL:', '/recruitment/filter');
      console.log('Method:', 'POST');
      console.log('전송할 데이터:', JSON.stringify(safeDto, null, 2));
      console.log('데이터 타입:', typeof safeDto);
      console.log('========================');
      
      const response = await axios.post(`/recruitment/filter`, safeDto, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('=== 필터 검색 응답 성공 ===');
      console.log('Status:', response.status);
      console.log('Response Data:', response.data);
      console.log('==========================');
      
      return response.data.data || [];
    } catch (error) {
      console.error("=== 필터 검색 에러 상세 ===");
      console.error("Error Message:", error.message);
      console.error("Status:", error.response?.status);
      console.error("Status Text:", error.response?.statusText);
      console.error("Response Data:", error.response?.data);
      console.error("Request Config:", {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data
      });
      console.error("==========================");
      throw error;
    }
};
