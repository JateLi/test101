import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './SettingsPanel.css';

function SettingsPanel({ isOpen, onClose }) {
  const { theme, toggleTheme, accentColor, setAccentColor, currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');

  const accentColors = [
    { name: '天空蓝', value: '#4fc3f7' },
    { name: '翠绿色', value: '#4CAF50' },
    { name: '橙红色', value: '#ff6b6b' },
    { name: '紫罗兰', value: '#9c27b0' },
    { name: '琥珀色', value: '#ff9800' },
    { name: '青色', value: '#00bcd4' },
    { name: '粉红色', value: '#e91e63' },
    { name: '靛蓝色', value: '#3f51b5' }
  ];

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : {
      animations: true,
      sounds: false,
      notifications: true,
      autoSave: true,
      language: 'zh-CN'
    };
  });

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('app-settings', JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    const defaultSettings = {
      animations: true,
      sounds: false,
      notifications: true,
      autoSave: true,
      language: 'zh-CN'
    };
    setSettings(defaultSettings);
    localStorage.setItem('app-settings', JSON.stringify(defaultSettings));
    setAccentColor('#4fc3f7');
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h2>⚙️ 设置</h2>
          <button className="settings-close" onClick={onClose}>×</button>
        </div>

        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            🎨 外观
          </button>
          <button
            className={`tab-btn ${activeTab === 'behavior' ? 'active' : ''}`}
            onClick={() => setActiveTab('behavior')}
          >
            ⚡ 行为
          </button>
          <button
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            ℹ️ 关于
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <div className="setting-group">
                <h3>主题模式</h3>
                <div className="theme-selector">
                  <button
                    className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => theme !== 'dark' && toggleTheme()}
                  >
                    🌙 深色模式
                  </button>
                  <button
                    className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => theme !== 'light' && toggleTheme()}
                  >
                    ☀️ 浅色模式
                  </button>
                </div>
              </div>

              <div className="setting-group">
                <h3>主题色彩</h3>
                <div className="color-grid">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      className={`color-option ${accentColor === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setAccentColor(color.value)}
                      title={color.name}
                    >
                      {accentColor === color.value && '✓'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'behavior' && (
            <div className="settings-section">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>动画效果</h4>
                  <p>启用界面动画和过渡效果</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.animations}
                    onChange={(e) => updateSetting('animations', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>声音提示</h4>
                  <p>启用操作声音反馈</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.sounds}
                    onChange={(e) => updateSetting('sounds', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>通知提醒</h4>
                  <p>显示操作结果通知</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => updateSetting('notifications', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>自动保存</h4>
                  <p>自动保存用户数据和设置</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => updateSetting('autoSave', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-actions">
                <button className="reset-btn" onClick={resetSettings}>
                  🔄 重置设置
                </button>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="settings-section">
              <div className="about-info">
                <div className="app-info">
                  <h3>React 多功能应用</h3>
                  <p className="version">版本 1.0.0</p>
                  <p className="description">
                    一个现代化的React多功能网页应用，集成了实用工具、
                    娱乐游戏、数据展示等多种功能。
                  </p>
                </div>

                <div className="tech-info">
                  <h4>技术栈</h4>
                  <ul>
                    <li>React 18.2.0</li>
                    <li>React Router 6.8.1</li>
                    <li>CSS3 & JavaScript ES6+</li>
                  </ul>
                </div>

                <div className="links-info">
                  <h4>相关链接</h4>
                  <div className="info-links">
                    <a href="https://github.com/JateLi/test101" target="_blank" rel="noopener noreferrer">
                      📂 GitHub 仓库
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      📖 使用文档
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      🐛 反馈问题
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;