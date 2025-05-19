import logo from './logo.svg'
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { defineConfig } from '@chakra-ui/react'
import Jop from './pages/Jop'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import DefaultLayout from './layouts/DefaultLayout'
import MainDetail from './pages/Jop/detail/MainDetail'

const config = defineConfig({
  initialColorMode: 'light',
  useSystemColorMode: false,
});

function App() {
  return (
  
      <BrowserRouter>
        <DefaultLayout>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/Jop" element={<Jop />} />
            <Route path="/Jop/Detail" element={<MainDetail />} />
            <Route path="*"  element={<NotFound />} />
          </Routes>
        </DefaultLayout>
        </BrowserRouter>
  );
}

export default App;
