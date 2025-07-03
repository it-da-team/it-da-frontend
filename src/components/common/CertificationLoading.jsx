import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const messages = [
  '교사 인증 요청하는 중',
  '인증까지 최소 하루에서 일주일 소요됩니다',
  '인증과 동시에 사진 파일은 삭제됩니다.',
  '인증 후 기관 평가도 참여해보세요.'
];

const CertificationLoading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320
    }}>
      <DotLottieReact
        src="https://lottie.host/b2091e17-6a62-4f8b-94bf-ff8fa52d27fb/4BYSymunKy.lottie"
        loop
        autoplay
        style={{ width: 120, height: 120, marginBottom: 32 }}
      />
      <div style={{ position: 'relative', height: 32, width: 260, overflow: 'hidden', marginTop: 8 }}>
        {messages.map((msg, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              opacity: index === i ? 1 : 0,
              transform: `translateY(${index === i ? 0 : i < index ? -30 : 30}px)`,
              transition: 'opacity 0.5s, transform 0.5s',
              fontSize: '0.98rem',
              color: '#888',
              textAlign: 'center',
              width: '100%',
              fontWeight: 500
            }}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CertificationLoading; 