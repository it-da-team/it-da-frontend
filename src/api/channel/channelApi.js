import recruitmentClient from '../instances/recruitmentClient';

// 채널 생성
export const createChannel = async (channelData, token) => {
  try {
    const response = await recruitmentClient.post('/channels', channelData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '채널 생성에 실패했습니다.');
  }
};

// 채널 목록 조회
export const getChannelList = async (token) => {
  try {
    const response = await recruitmentClient.get('/channels', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '채널 목록 조회에 실패했습니다.');
  }
};

// 내가 만든 채널 목록 조회
export const getMyChannelList = async (token) => {
  try {
    const response = await recruitmentClient.get('/channels/my', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '내 채널 목록 조회에 실패했습니다.');
  }
};

// 구독한 채널 목록 조회
export const getSubscribedChannelList = async (token) => {
  try {
    const response = await recruitmentClient.get('/channels/subscribed', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '구독 채널 목록 조회에 실패했습니다.');
  }
};

// 채널 상세 정보 조회
export const getChannelDetail = async (channelId, token) => {
  try {
    const response = await recruitmentClient.get(`/channels/${channelId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '채널 정보 조회에 실패했습니다.');
  }
};

// 채널 수정
export const updateChannel = async (channelId, channelData, token) => {
  try {
    const response = await recruitmentClient.put(`/channels/${channelId}`, channelData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '채널 수정에 실패했습니다.');
  }
};

// 채널 삭제
export const deleteChannel = async (channelId, token) => {
  try {
    const response = await recruitmentClient.delete(`/channels/${channelId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '채널 삭제에 실패했습니다.');
  }
};

// 채널 구독
export const subscribeChannel = async (channelId, token) => {
  try {
    const response = await recruitmentClient.post(`/channels/${channelId}/subscribe`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '채널 구독에 실패했습니다.');
  }
};

// 채널 구독 해제
export const unsubscribeChannel = async (channelId, token) => {
  try {
    const response = await recruitmentClient.delete(`/channels/${channelId}/subscribe`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '채널 구독 해제에 실패했습니다.');
  }
}; 