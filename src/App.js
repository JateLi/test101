import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCountChange = (newCount) => {
    setIsAnimating(true);
    setCount(newCount);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="App">
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      <header className="App-header">
        <div className="hero-section">
          <div className="logo-container">
            <div className="react-logo">⚛️</div>
            <h1 className="main-title">
              <span className="gradient-text">React.js</span>
              <span className="subtitle">现代化网页应用</span>
            </h1>
          </div>
          <p className="hero-description">
            体验组件化开发的强大魅力
          </p>
        </div>

        <div className="content-grid">
          <div className="card counter-card">
            <div className="card-header">
              <h2>🔢 智能计数器</h2>
            </div>
            <div className="counter-display">
              <div className={`count-number ${isAnimating ? 'animate' : ''}`}>
                {count}
              </div>
              <div className="count-label">当前数值</div>
            </div>
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={() => handleCountChange(count + 1)}
              >
                <span className="btn-icon">➕</span>
                增加
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleCountChange(count - 1)}
              >
                <span className="btn-icon">➖</span>
                减少
              </button>
              <button
                className="btn btn-accent"
                onClick={() => handleCountChange(0)}
              >
                <span className="btn-icon">🔄</span>
                重置
              </button>
            </div>
          </div>

          <div className="card features-card">
            <div className="card-header">
              <h2>✨ React 核心特性</h2>
            </div>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🧩</div>
                <h3>组件化</h3>
                <p>可复用的UI组件</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h3>虚拟DOM</h3>
                <p>高效的渲染机制</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <h3>状态管理</h3>
                <p>响应式数据流</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔄</div>
                <h3>热更新</h3>
                <p>实时开发体验</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">18.2</div>
            <div className="stat-label">React 版本</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{count}</div>
            <div className="stat-label">当前计数</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">响应式</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;