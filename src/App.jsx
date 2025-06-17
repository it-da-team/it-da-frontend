import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Login from './pages/Users/login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home/Home';
import './App.css';
import FavoriteRecruitments from './pages/recruitment/FavoriteRecruitments';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/login" element={<Login />} />
          
          {/* 보호된 라우트 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          
          {/* 기타 보호된 라우트들 */}
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <DefaultLayout>
                  {/* 마이페이지 컴포넌트 */}
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          
          {/* 404 페이지 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App; 