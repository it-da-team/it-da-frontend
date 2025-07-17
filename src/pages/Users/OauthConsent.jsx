import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../../utils/localStorage';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function OauthConsent() {
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [tempToken, setTempToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const token = location.state?.tempToken;
  //   if (token) {
  //     setTempToken(token);
  //     // Decode the JWT to get the email (sub claim)
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       setUserEmail(payload.sub || '');
  //     } catch (e) {
  //       console.error('Failed to decode token:', e);
  //       setError('인증 정보를 확인할 수 없습니다.');
  //     }
  //   } else {
  //     setError('유효하지 않은 접근입니다. 인증 정보가 없습니다.');
  //   }
  // }, [location.state]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!agree || !tempToken) return;
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_RECRUITMENT_API_BASE_URL}/user/oauth/signup`,
  //       { agree: true },
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${tempToken}`,
  //           'Content-Type': 'application/json'
  //         },
  //         withCredentials: true
  //       }
  //     );
  //     if (response.data?.token) {
  //       saveToken(response.data.token);
  //       alert('회원가입이 완료되었습니다!');
  //       navigate('/', { replace: true });
  //     } else {
  //       throw new Error('최종 토큰을 받지 못했습니다.');
  //     }
  //   } catch (err) {
  //     console.error('회원가입 요청 실패:', err);
  //     if (err.response?.status === 401) {
  //       setError('인증이 만료되었습니다. 다시 로그인해 주세요.');
  //       setTimeout(() => navigate('/login', { replace: true }), 2000);
  //     } else {
  //       setError('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>오류</h2>
        <p style={{ color: 'red', marginBottom: 20 }}>{error}</p>
        <button onClick={() => navigate('/login')}>로그인 페이지로 돌아가기</button>
      </div>
    );
  }

  if (!tempToken) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <h2 style={{ marginBottom: 16 }}>[개인정보 수집 및 이용 동의]</h2>
      
      <div style={{ padding: '12px 16px', background: '#f1f3f5', borderRadius: 8, marginBottom: 24 }}>
        <p style={{ margin: 0, fontWeight: 500 }}>
          로그인 계정: <span style={{ color: '#1971c2' }}>{userEmail}</span>
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#555' }}>
          위 계정으로 서비스 이용에 동의하시겠습니까?
        </p>
      </div>

      <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #eee', padding: 16, marginBottom: 24, fontSize: '1rem', lineHeight: 1.7 }}>
        <p>운영자(이하 '운영자')는 "개인정보 보호법"에 따라 회원님의 개인정보를 수집·이용하고자 하며, 다음의 내용을 충분히 숙지하신 후 동의해주시기 바랍니다.</p>
        <ol>
          <li><b>수집 항목</b><br/>
            ① 필수 항목: 닉네임, 이메일 주소, 프로필 사진 (Google, Kakao 로그인 시 자동 제공)<br/>
            ② 커뮤니티 이용 시: 게시글 및 댓글 내용, 접속 IP, 브라우저 및 기기 정보<br/>
            ③ 채용공고/이력서 서비스 이용 시: 사용자가 등록한 이력서 정보: 이름, 전화번호, 이메일, 주소, 이력서 사진 등
          </li>
          <li><b>수집 목적</b><br/>
            - 회원 식별 및 로그인 처리<br/>
            - 커뮤니티 및 게시판 기능 제공<br/>
            - 게시글 및 댓글 작성, 조회, 관리<br/>
            - 부정 이용 방지 및 커뮤니티 질서 유지<br/>
            - 채용공고 서비스 제공 및 이력서 열람 기능 지원
          </li>
          <li><b>보유 및 이용 기간</b><br/>
            - 회원 탈퇴 시, 개인정보는 지체 없이 파기합니다.<br/>
            - 단, 커뮤니티 운영의 안정성과 부정 이용 방지를 위해, 탈퇴 후 최대 1년간 로그인 기록(IP 포함), 게시글 및 댓글 이력을 보관할 수 있습니다.
          </li>
          <li><b>동의 거부 시 불이익</b><br/>
            - 개인정보 수집·이용에 동의하지 않으실 경우, 일부 서비스(커뮤니티, 이력서 등록 등)의 이용이 제한될 수 있습니다.
          </li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, cursor: 'pointer' }}>
          <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
          위 내용을 모두 확인하였으며, 개인정보 수집 및 이용에 동의합니다.
        </label>
        <button type="submit" disabled={!agree || loading} style={{
          marginTop: 20,
          width: '100%',
          padding: '12px 0',
          background: (agree && !loading) ? '#4dabf7' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: (agree && !loading) ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}>
          {loading ? <LoadingSpinner small /> : '동의하고 계속하기'}
        </button>
      </form>
    </div>
  );
} 