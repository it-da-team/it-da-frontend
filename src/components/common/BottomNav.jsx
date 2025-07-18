import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaComments, FaUser } from 'react-icons/fa';

function BottomNav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { to: '/', label: '홈', icon: <FaHome size={22} /> },
    { to: '/recruitment', label: '채용 공고', icon: <FaUser size={22} /> },
    { to: '/region', label: '지역검색', icon: <FaMapMarkerAlt size={22} /> },
    { to: '/community', label: '커뮤니티', icon: <FaComments size={22} /> },
    
  ];

  return (
    <nav style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      height: 64,
      background: '#fff',
      borderTop: '1.5px solid #eee',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 2000,
      boxShadow: '0 -4px 16px rgba(0,0,0,0.07)',
      padding: '0 2vw',
      touchAction: 'manipulation',
    }}>
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            color: isActive ? '#FFB300' : '#888',
            textDecoration: 'none',
            fontWeight: isActive ? 700 : 400,
            fontSize: 13,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            flex: 1,
            minWidth: 60,
            minHeight: 56,
            justifyContent: 'center',
            borderRadius: 12,
            background: isActive ? 'rgba(255, 236, 179, 0.5)' : 'transparent',
            transition: 'background 0.15s, color 0.15s',
            padding: '4px 0',
            WebkitTapHighlightColor: 'transparent',
          })}
        >
          {item.icon}
          <span style={{ fontSize: 12, marginTop: 2 }}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav; 