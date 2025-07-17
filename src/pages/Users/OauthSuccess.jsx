import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../../utils/localStorage';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OauthSuccess = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchLoginStatus = async () => {
  //     try {
  //       // 1. 백엔드에 로그인 상태 및 토큰 요청 (세션 쿠키 기반)
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_RECRUITMENT_API_BASE_URL}/api/oauth/token`,
  //         {
  //           withCredentials: true, // 세션 쿠키를 보내기 위해 필수
  //         }
  //       );
  //       const { status, token } = response.data;
  //       if (!status || !token) {
  //         throw new Error('서버로부터 유효한 응답을 받지 못했습니다.');
  //       }
  //       // 2. 서버 응답에 따라 분기 처리
  //       if (status === 'login_success') {
  //         // 기존 회원의 경우: 최종 토큰 저장 후 메인으로 이동
  //         saveToken(token);
  //         navigate('/');
  //       } else if (status === 'consent_required') {
  //         // 신규 회원의 경우: 임시 토큰을 가지고 동의 페이지로 이동
  //         // URL이 아닌 navigate state에 담아서 토큰을 안전하게 전달
  //         navigate('/oauth-consent', {
  //           state: { tempToken: token },
  //           replace: true,
  //         });
  //       } else {
  //         throw new Error(`알 수 없는 상태값입니다: ${status}`);
  //       }
  //     } catch (err) {
  //       console.error('로그인 상태 확인 실패:', err);
  //       setError('로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  //     }
  //   };
  //   fetchLoginStatus();
  // }, [navigate]);

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>로그인 실패</h2>
        <p style={{ color: 'red', marginBottom: 20 }}>{error}</p>
        {/* 로그인 페이지로 돌아가기 버튼 제거 */}
      </div>
    );
  }

  return <LoadingSpinner />;
};

export default OauthSuccess; 