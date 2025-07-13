import logo from './logo.svg'
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { defineConfig } from '@chakra-ui/react'
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

const config = defineConfig({
  initialColorMode: 'light',
  useSystemColorMode: false,
});

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/recruitment/detail/:id" element={<MainDetail />} />
          <Route path="/story" element={<Story />} />
          <Route path="/talk" element={<Talk />} />
          <Route path="/talk/:id" element={<TalkDetail />} />
          <Route path="/play" element={<Play />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth-success" element={<OauthSuccess />} />
          <Route path="/oauth-consent" element={<OauthConsent />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/create" element={<CreatePost />} />
          <Route path="/community/post/:postId" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
