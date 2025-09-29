import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-animation">
          <div className="error-code">404</div>
          <div className="error-message">页面未找到</div>
        </div>

        <div className="not-found-content">
          <h2>哎呀！你来到了未知的领域</h2>
          <p>
            看起来你要找的页面不存在，可能是链接错误或者页面已被移动。
            不过别担心，让我们帮你回到正轨！
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              🏠 回到首页
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              📊 访问仪表板
            </Link>
            <button
              className="btn btn-accent"
              onClick={() => window.history.back()}
            >
              ⬅️ 返回上页
            </button>
          </div>

          <div className="helpful-links">
            <h3>你可能在寻找：</h3>
            <div className="links-grid">
              <Link to="/games" className="help-link">
                <span className="link-icon">🎮</span>
                <span>游戏中心</span>
              </Link>
              <Link to="/tools" className="help-link">
                <span className="link-icon">🛠️</span>
                <span>工具箱</span>
              </Link>
              <Link to="/gallery" className="help-link">
                <span className="link-icon">🖼️</span>
                <span>图片库</span>
              </Link>
              <Link to="/about" className="help-link">
                <span className="link-icon">ℹ️</span>
                <span>关于我们</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;