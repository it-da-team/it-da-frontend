import axios from '../instances/recruitmentClient';


export const fetchRecruitmentsByCategory = async (category) => {
    const response = await axios.get(`/recruitment/${category}`);
    return response.data;
  };