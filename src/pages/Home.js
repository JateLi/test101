import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState('');

  const quotes = [
    "代码是诗歌，程序员是诗人。",
    "简洁是可靠的先决条件。",
    "程序必须为人而写，机器执行只是附带任务。",
    "最好的代码是没有代码。",
    "调试就像是在一部犯罪电影中当侦探。"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="home-page">
      <div className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">欢迎来到</span>
            <span className="hero-subtitle">React 多功能应用</span>
          </h1>
          <p className="hero-description">
            探索现代化的网页应用，体验丰富的功能和优美的界面设计
          </p>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">功能页面</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">可能性</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">响应式</div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>仪表板</h3>
            <p>实时数据展示，包含计数器、时钟、待办事项等实用工具</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>游戏中心</h3>
            <p>休闲小游戏集合，包含猜数字、记忆游戏等趣味内容</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛠️</div>
            <h3>工具箱</h3>
            <p>实用工具集合，计算器、颜色选择器、文本工具等</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🖼️</div>
            <h3>图片库</h3>
            <p>精美图片展示，支持预览、筛选和响应式布局</p>
          </div>
        </div>
      </div>

      <div className="home-quote">
        <div className="quote-container">
          <blockquote className="quote-text">"{quote}"</blockquote>
          <button
            className="quote-refresh"
            onClick={() => setQuote(quotes[Math.floor(Math.random() * quotes.length)])}
          >
            🔄 换一句
          </button>
        </div>
      </div>

      <div className="home-clock">
        <div className="clock-display">
          <div className="current-time">
            {currentTime.toLocaleTimeString('zh-CN')}
          </div>
          <div className="current-date">
            {currentTime.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;