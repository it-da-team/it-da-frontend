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
            <Route path="/"  element={<Home />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/recruitment/detail/:id" element={<MainDetail />} />
            <Route path="*"  element={<NotFound />} />
          </Routes>
        </DefaultLayout>
        </BrowserRouter>
  );
}

export default App;
