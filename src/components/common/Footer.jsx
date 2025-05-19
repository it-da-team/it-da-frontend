import React from "react";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>잇-다</h3>
                    <p> 당신의 내일을 잇다.</p>
                </div>
                <div className="footer-section">
                    <h4>바로가기</h4>
                    <ul>
                        <li><a href="/about">회사소개</a></li>
                        <li><a href="/terms">이용약관</a></li>
                        <li><a href="/privacy">개인정보처리방침</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>고객센터</h4>
                    <p>이메일: support@it-da.com</p>
                    <p>전화: 02-123-4567</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 잇-다. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;