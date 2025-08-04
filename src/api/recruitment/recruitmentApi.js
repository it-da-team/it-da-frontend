import axios from '../instances/recruitmentClient';

export const fetchRecruitmentsByCategory = async (category) => {
    try {
        const response = await axios.get(`/recruitment/${category}`);
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
      
      // ALL 카테고리 디버깅
      if (safeDto.category && safeDto.category.includes('ALL')) {
        console.log('🔍 ALL 카테고리 요청:', safeDto);
      }
      
      // ALL 카테고리는 category 파라미터를 제거하거나 빈 객체로 보내기
      let requestDto = safeDto;
      if (safeDto.category && safeDto.category.includes('ALL')) {
        console.log('🔍 ALL 카테고리 감지 - category 파라미터 제거');
        requestDto = { ...safeDto };
        delete requestDto.category; // category 파라미터 제거
      }
      
      const response = await axios.post(`/recruitment/filter`, requestDto, {
        headers: { 'Content-Type': 'application/json' }
      });
    
      // ALL 카테고리 응답 디버깅
      if (safeDto.category && safeDto.category.includes('ALL')) {
        console.log('🔍 ALL 카테고리 응답:', response.data);
        console.log('🔍 ALL 카테고리 데이터 길이:', response.data.data?.length);
      }
      
      return response.data.data || [];
    } catch (error) {
      if (filterDto.category && filterDto.category.includes('ALL')) {
        console.error('🚨 ALL 카테고리 에러:', error);
        console.error('🚨 에러 상세:', error.response?.data);
      }
      throw error;
    }
};

export const fetchRecruitmentsByProvince = async (province) => {
    const response = await axios.post('/recruitment/province', null, {
      params: { province },
    });
    return response.data.data || [];
  };
  
export const fetchRecruitmentsChart = async () => {
    const response = await axios.get('/recruitment/province/count');
    return response.data.data || [];
  };
  
