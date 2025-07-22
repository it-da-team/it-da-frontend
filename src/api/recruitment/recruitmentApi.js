import axios from '../instances/recruitmentClient';

export const fetchRecruitmentsByCategory = async (category) => {
    try {
       
        const response = await axios.get(`/recruitment/${category}`);
        // 서버 응답에서 data 필드 추출
        return response.data.data || [];
    } catch (error) {
        throw error;
    }
};

export const fetchRecruitmentDetail = async (id, signal) => {
    try {
        const response = await axios.get(`/recruitment/detail/${id}`, { signal });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const fetchFilteredRecruitments = async (filterDto) => {
    try {
      // undefined 값 제거 후 JSON 직렬화/역직렬화로 배열 보장
      const safeDto = JSON.parse(JSON.stringify(filterDto));
      
      const response = await axios.post(`/recruitment/filter`, safeDto, {
        headers: { 'Content-Type': 'application/json' }
      });
    
      
      return response.data.data || [];
    } catch (error) {
      throw error;
    }
};


export const fetchRecruitmentsByProvince = async (province) => {
    const response = await axios.post('/recruitment/province', null, {
      params: { province },
    });
    return response.data.data || [];
  };
  
