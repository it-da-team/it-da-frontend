import logo from './logo.svg'
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { defineConfig } from '@chakra-ui/react'
import { useEffect } from 'react'
import Recruitment from './pages/recruitment'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import DefaultLayout from './layouts/DefaultLayout'
import MainDetail from './pages/recruitment/detail/MainDetail'
import ScrollToTop from './components/common/ScrollToTop';
import Story from './pages/Story';
import Talk from './pages/Talk';
import Play from './pages/Play';
import Login from './pages/Users/login';
import CommunityPage from './pages/Community/index.jsx'
import CreatePost from './pages/Community/CreatePost.jsx';
import PostDetail from './pages/Community/PostDetail.jsx';
import TalkDetail from './pages/Talk/Detail.jsx';
import OauthConsent from './pages/Users/OauthConsent';
import OauthSuccess from './pages/Users/OauthSuccess';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RegionSearchMobile from './pages/RegionSearchMobile';

const config = defineConfig({
  initialColorMode: 'light',
  useSystemColorMode: false,
});

function App() {
  // iOS Safari 뷰포트 높이 보정
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    // 초기 설정
    setVH();

    // 리사이즈 시 업데이트 (throttling 적용)
    let ticking = false;
    const handleResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVH();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    // iOS에서 orientation 변경 시에도 대응
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route element={<DefaultLayout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/region" element={<RegionSearchMobile />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/recruitment/detail/:id" element={<MainDetail />} />
          <Route path="/story" element={<Story />} />
          <Route path="/talk" element={<Talk />} />
          <Route path="/talk/:id" element={<TalkDetail />} />
          <Route path="/play" element={<Play />} />
          <Route path="/oauth-success" element={<OauthSuccess />} />
          <Route path="/oauth-consent" element={<OauthConsent />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/create" element={<CreatePost />} />
          <Route path="/community/post/:postId" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
