import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Login from './pages/Users/login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import './App.css';
import FavoriteRecruitments from './pages/recruitment/FavoriteRecruitments';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CommunityPage from './pages/Community';
import CreatePost from './pages/Community/CreatePost';
import PostDetail from './pages/Community/PostDetail';
import Talk from './pages/Talk';
import Play from './pages/Play';
import Story from './pages/Story';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/*"
            element={
              <ProtectedRoute>
                <DefaultLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/community/create" element={<CreatePost />} />
                    <Route path="/community/post/:postId" element={<PostDetail />} />
                    <Route path="/talk" element={<Talk />} />
                    <Route path="/play" element={<Play />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </DefaultLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App; 