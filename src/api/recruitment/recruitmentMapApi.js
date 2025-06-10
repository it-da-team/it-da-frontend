import axios from '../instances/recruitmentClient';

export const fetchMapRecruitments = async (params) => {
  try {
    const { category, region, district } = params;
    
    // URL에 카테고리 포함
    const url = `/recruitment/map/${category}`;
    const queryParams = {
      region,
      ...(district && { district })
    };

    console.log("Request URL:", url);
    console.log("Query Params:", queryParams);

    const response = await axios.get(url, {
      params: queryParams
    });
    
    console.log("API Response Data:", response.data);
    console.log("First item in response:", response.data[0]);
    return response.data;
  } catch (error) {
    console.error("지도용 API 에러:", error);
    console.error("Error config:", error.config);
    throw error;
  }
};

export const sendTotalRecruitments = async (recruitmentIds) => {
  try {
    console.log('=== sendTotalRecruitments API 호출 시작 ===');
    console.log('전송할 recruitmentIds:', recruitmentIds);
    console.log('전송할 데이터 형식:', {
      recruitmentIds: recruitmentIds.filter(id => id)
    });
    
    const response = await axios.post('/recruitment/total', {
      recruitmentIds: recruitmentIds.filter(id => id)
    });
    
    console.log('API 응답:', response);
    console.log('=== sendTotalRecruitments API 호출 완료 ===');
    return response.data;
  } catch (error) {
    console.error('=== sendTotalRecruitments API 에러 발생 ===');
    console.error('에러 메시지:', error.message);
    console.error('에러 응답:', error.response?.data);
    console.error('에러 상태:', error.response?.status);
    console.error('에러 설정:', error.config);
    throw error;
  }
};
