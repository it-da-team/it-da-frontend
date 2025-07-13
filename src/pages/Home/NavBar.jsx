import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../App.css"

function NavBar({ isOpen }) {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({});

    // 현재 경로에 따라 활성 메뉴 인덱스 설정
    useEffect(() => {
        const path = location.pathname;
        let index = 0;
        
        switch(path) {
            case '/':
                index = 0; // 채용 공고
                break;
            case '/community':
                index = 1; // 온담(溫談)
                break;
            case '/talk':
                index = 2; // 선배 톡톡
                break;
            case '/play':
                index = 3; // 요즘 놀이
                break;
            default:
                index = 0;
        }
        
        setActiveIndex(index);
        
        // DOM이 렌더링된 후 인디케이터 위치 설정
        setTimeout(() => {
            updateIndicator(index);
        }, 100);
    }, [location.pathname]);

    // 컴포넌트 마운트 시 초기 인디케이터 위치 설정
    useEffect(() => {
        setTimeout(() => {
            updateIndicator(activeIndex);
        }, 100);
    }, []);

    // 인디케이터 위치 업데이트 (더 길게, 위치 조정)
    const updateIndicator = (index) => {
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[index]) {
            const item = navItems[index];
            const rect = item.getBoundingClientRect();
            const navBar = document.querySelector('.nav-bar');
            const navRect = navBar.getBoundingClientRect();
            
            const extra = rect.width * 0.1; // 양쪽 10%씩 더 넓게
            const targetLeft = rect.left - navRect.left - extra;
            const targetWidth = rect.width + extra * 2;
            
            setIndicatorStyle({
                left: `${targetLeft}px`,
                width: `${targetWidth}px`,
                opacity: 1
            });
        }
    };

    // 메뉴 클릭 핸들러
    const handleMenuClick = (index) => {
        setActiveIndex(index);
        updateIndicator(index);
    };

    return (
        <nav className={`nav-bar ${isOpen ? 'open' : ''}`}>
            <div 
                className="nav-indicator" 
                style={indicatorStyle}
            ></div>
            
            <Link 
                to="/" 
                className={`nav-item ${activeIndex === 0 ? 'active' : ''}`}
                onClick={() => handleMenuClick(0)}
            >
                <h3>채용 공고</h3>
            </Link>
            
            <Link 
                to="/community" 
                className={`nav-item ${activeIndex === 1 ? 'active' : ''}`}
                onClick={() => handleMenuClick(1)}
            >
                <h3>온담(溫談)</h3>
            </Link>
            
            <Link 
                to="/talk" 
                className={`nav-item ${activeIndex === 2 ? 'active' : ''}`}
                onClick={() => handleMenuClick(2)}
            >
                <h3>선배 톡톡</h3>
            </Link>
            
            <Link 
                to="/play" 
                className={`nav-item ${activeIndex === 3 ? 'active' : ''}`}
                onClick={() => handleMenuClick(3)}
            >
                <h3>요즘 놀이</h3>
            </Link>
            
            <Link 
                to="/" 
                className={`nav-item ${activeIndex === 4 ? 'active' : ''}`}
                onClick={() => handleMenuClick(4)}
            >
                <h3>잇다 마켓</h3>
            </Link>
        </nav>
    );
}

export default NavBar;