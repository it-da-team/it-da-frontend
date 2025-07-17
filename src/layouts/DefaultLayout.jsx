import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BottomNav from "../components/common/BottomNav";
import { useLocation, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DefaultLayout({ children }) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 700);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`layout-container ${isLoginPage ? 'login-page' : ''}`}>
            <Header />
            <main className="layout-main">  
                <Outlet />
            </main>
            {!isMobile && <Footer />}
            {isMobile && <BottomNav />}
        </div>
    );
}

