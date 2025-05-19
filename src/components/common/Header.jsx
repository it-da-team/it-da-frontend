import React from "react";
import { Link } from 'react-router-dom';
import NavBar from "../../pages/Home/NavBar";
import LogoImg from "../../assets/images/icon/image-removebg-preview.png"

function Header() {
    return (
        <header className="header">
            <h1 className="logo">
            <Link to="/">
                <img
                    src={LogoImg}
                    alt="로고"
                    style={{
                    width: '7rem',
                    height: 'auto',
                    padding: '0 2rem', 
                    objectFit: 'contain'
                    }}
                />
            </Link>
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