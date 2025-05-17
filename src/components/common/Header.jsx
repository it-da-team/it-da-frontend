import React from "react";
import NavBar from "../../pages/Home/NavBar";
import LogoImg from "../../assets/images/icon/image-removebg-preview.png"

function Header() {
    return (
        <header className="header">
            <h1 className="logo">
                <img 
                    src={LogoImg} 
                    alt="로고" 
                    style={{ 
                        width: '5.5rem', 
                        height: 'auto',
                        objectFit: 'contain'
                    }} 
                />
            </h1>
  
            <NavBar />
  
            <div className="header-buttons">
              <button className="header-button company-button">기업 회원</button>
              <button className="header-button login-button">로그인</button>
            </div>
        </header>
    );
}

export default Header;