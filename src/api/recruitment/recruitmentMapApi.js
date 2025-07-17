import axios from '../instances/recruitmentClient';

export const fetchMapRecruitments = async (params) => {
  try {
    const { category, province, city, district } = params;
    // URL에 카테고리 포함
    const url = `/recruitment/map/${category}`;
    const queryParams = {
      province,
      city,
      district
    };
    // 빈 값은 쿼리에서 제외
    Object.keys(queryParams).forEach(key => {
      if (!queryParams[key]) delete queryParams[key];
    });
    const response = await axios.get(url, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendTotalRecruitments = async (recruitmentIds) => {
  try {
    const response = await axios.post('/recruitment/total', {
      recruitmentIds: recruitmentIds.filter(id => id)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
