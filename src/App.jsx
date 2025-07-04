import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Login from './pages/Users/login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import FavoriteRecruitments from './pages/recruitment/FavoriteRecruitments';
import CommunityPage from './pages/Community';
import CreatePost from './pages/Community/CreatePost';
import PostDetail from './pages/Community/PostDetail';
import Talk from './pages/Talk';
import Play from './pages/Play';
import Story from './pages/Story';
import NotFound from './pages/NotFound';
import Recruitment from './pages/recruitment';
import MainDetail from './pages/recruitment/detail/MainDetail';
import OauthConsent from './pages/Users/OauthConsent';
import OauthSuccess from './pages/Users/OauthSuccess';
import TeacherCertification from './pages/Certification/TeacherCertification';
import ScrollToTop from './components/common/ScrollToTop';
import MyProfile from './pages/MyProfile';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/oauth-success" element={<OauthSuccess />} />
        <Route path="/oauth-consent" element={<OauthConsent />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <DefaultLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/recruitment/detail/:id" element={<MainDetail />} />
                <Route path="/recruitment/favorites" element={<FavoriteRecruitments />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/community/create" element={<CreatePost />} />
                <Route path="/community/post/:postId" element={<PostDetail />} />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/talk" element={<Talk />} />
                <Route path="/play" element={<Play />} />
                <Route path="/story" element={<Story />} />
                <Route path="/certification/teacher" element={<TeacherCertification />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DefaultLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App; 