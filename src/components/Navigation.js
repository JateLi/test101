import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchModal from './SearchModal';
import SettingsPanel from './SettingsPanel';
import DataExportPanel from './DataExportPanel';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/dashboard', label: '仪表板', icon: '📊' },
    { path: '/games', label: '游戏中心', icon: '🎮' },
    { path: '/tools', label: '工具箱', icon: '🛠️' },
    { path: '/gallery', label: '图片库', icon: '🖼️' },
    { path: '/about', label: '关于', icon: 'ℹ️' }
  ];

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K 打开搜索
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      // Ctrl/Cmd + , 打开设置
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        setShowSettings(true);
      }
      // Ctrl/Cmd + E 打开数据导出
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        setShowExport(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <nav className="navigation">
        <div className="nav-brand">
          <span className="nav-logo">⚛️</span>
          <span className="nav-title">React App</span>
        </div>

        <div className="nav-content">
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

          <div className="nav-actions">
            <button
              className="nav-action-btn"
              onClick={() => setShowSearch(true)}
              title="搜索 (Ctrl+K)"
            >
              🔍
            </button>
            <button
              className="nav-action-btn"
              onClick={() => setShowExport(true)}
              title="数据导出 (Ctrl+E)"
            >
              📤
            </button>
            <button
              className="nav-action-btn"
              onClick={() => setShowSettings(true)}
              title="设置 (Ctrl+,)"
            >
              ⚙️
            </button>
          </div>
        </div>
      </nav>

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />
      <DataExportPanel
        isOpen={showExport}
        onClose={() => setShowExport(false)}
      />
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}

export default Navigation;