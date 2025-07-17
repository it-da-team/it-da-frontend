import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from "../../pages/Home/NavBar";
import LogoImg from "../../assets/images/icon/image-removebg-preview.png"
import LogoutModal from './LogoutModal';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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
            <header className="header">
                <h1 className="logo">
                    <Link to="/">
                        <img
                            src={LogoImg}
                            alt="로고"
                        />
                    </Link>
                </h1>
                
                <NavBar isOpen={isMenuOpen} />
                
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>
            
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