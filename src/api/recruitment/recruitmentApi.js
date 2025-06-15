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

export const fetchRecruitmentDetail = async (id) => {
    try {
        console.log('상세 정보 요청 시작:', id);
        const response = await axios.get(`/recruitment/detail/${id}`);
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
      console.log('필터 검색 요청 시작:', {
        url: '/filter',
        method: 'POST',
        data: filterDto
      });
      
      const response = await axios.post('/filter', filterDto);
      
      console.log('필터 검색 응답:', {
        status: response.status,
        data: response.data
      });
      
      return response.data.data || [];
    } catch (error) {
      console.error("필터 검색 에러:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
        url: error.config?.url,
        method: error.config?.method,
        requestData: error.config?.data
      });
      throw error;
    }
};
