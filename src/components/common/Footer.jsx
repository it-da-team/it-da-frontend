import React, { useState } from "react";
import "../../assets/css/Footer.css";

function Footer() {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (index) => {
        setActiveSection(activeSection === index ? null : index);
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className={`footer-section ${activeSection === 0 ? 'active' : ''}`}>
                    <h3 onClick={() => toggleSection(0)}>잇-다</h3>
                    <div className="footer-section-content">
                        <p> 당신의 내일을 잇다.</p>
                    </div>
                </div>
                <div className={`footer-section ${activeSection === 1 ? 'active' : ''}`}>
                    <h4 onClick={() => toggleSection(1)}>바로가기</h4>
                    <div className="footer-section-content">
                        <ul>
                            <li><a href="/about">회사소개</a></li>
                            <li><a href="/terms">이용약관</a></li>
                            <li><a href="/privacy">개인정보처리방침</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`footer-section ${activeSection === 2 ? 'active' : ''}`}>
                    <h4 onClick={() => toggleSection(2)}>고객센터</h4>
                    <div className="footer-section-content">
                        <p>이메일: support@it-da.com</p>
                        <p>전화: 02-123-4567</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 잇-다. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;