import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from "../../pages/Home/NavBar";
import LogoImg from "../../assets/images/icon/image-removebg-preview.png"
import LogoutModal from './LogoutModal';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    // 모바일만 따로 처리 (태블릿은 데스크톱과 동일하게)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const navigate = useNavigate();

    // useEffect(() => {
    //     // 로그인 상태 확인
    //     const checkLoginStatus = () => {
    //         const token = localStorage.getItem('accessToken');
    //         const loginStatus = localStorage.getItem('isLoggedIn');
    //         setIsLoggedIn(!!(token && loginStatus === 'true'));
    //     };
    //     // 초기 로그인 상태 확인
    //     checkLoginStatus();
    //     // 로그인 상태 변경 감지를 위한 이벤트 리스너
    //     window.addEventListener('storage', checkLoginStatus);
    //     return () => {
    //         window.removeEventListener('storage', checkLoginStatus);
    //     };
    // }, []);

    // 모바일 여부 감지
    useEffect(() => {
        let ticking = false;
        
        const handleResize = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsMobile(window.innerWidth <= 700);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // const handleLogoutClick = () => {
    //     setIsLogoutModalOpen(true);
    // };

    // const handleLogoutConfirm = () => {
    //     // 로컬 스토리지에서 토큰과 로그인 상태 제거
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('isLoggedIn');
    //     // 로그인 상태 업데이트
    //     setIsLoggedIn(false);
    //     // 모달 닫기
    //     setIsLogoutModalOpen(false);
    //     // 로그인 페이지로 리다이렉트
    //     navigate('/login');
    // };

    return (
        <>
            <header 
                className="header"
                style={{
                    paddingTop: 'max(1rem, env(safe-area-inset-top))',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform'
                }}
            >
                <h1 
                    className="logo"
                    style={{
                        transform: 'translateY(-0.8rem)',
                        position: 'relative'
                    }}
                >
                    <Link to="/">
                        <img
                            src={LogoImg}
                            alt="잇다 로고 - 영유아 교사 채용 플랫폼"
                            loading="lazy"
                            decoding="async"
                        />
                    </Link>
                </h1>
                
                {/* 모바일에서만 NavBar 숨김, 태블릿/데스크톱에서는 헤더 위에 인라인으로 표시 (사이드바 아님) */}
                {!isMobile && (
                    <div style={{ transform: 'translateY(-0.8rem)', position: 'relative' }}>
                        <NavBar isOpen={false} />
                    </div>
                )}
                
                {/* <button 
                    className="menu-toggle" 
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                    aria-expanded={isMenuOpen}
                    style={{
                        transform: 'translateY(-0.8rem)',
                        position: 'relative'
                    }}
                >
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                </button> */}
            
            </header>

            <LogoutModal 
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={() => {}}
            />
        </>
    );
}

export default Header;