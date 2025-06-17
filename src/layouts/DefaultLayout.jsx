import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useLocation } from "react-router-dom";

export default function DefaultLayout({ children }) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div className={isLoginPage ? 'login-page' : ''}>
            <Header />
            <main>  
                {children}
            </main>
            <Footer />
        </div>
    );
}

