import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/dashboard', label: '仪表板', icon: '📊' },
    { path: '/games', label: '游戏中心', icon: '🎮' },
    { path: '/tools', label: '工具箱', icon: '🛠️' },
    { path: '/gallery', label: '图片库', icon: '🖼️' },
    { path: '/about', label: '关于', icon: 'ℹ️' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="nav-logo">⚛️</span>
        <span className="nav-title">React App</span>
      </div>

      <ul className="nav-menu">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;