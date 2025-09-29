import React from 'react';
import './About.css';

function About() {
  const features = [
    {
      icon: '⚛️',
      title: 'React 18',
      description: '使用最新的React版本，享受并发特性和性能优化'
    },
    {
      icon: '🎨',
      title: '现代化设计',
      description: '毛玻璃效果、渐变色彩和流畅动画打造视觉盛宴'
    },
    {
      icon: '📱',
      title: '响应式布局',
      description: '完美适配桌面、平板和手机等各种设备'
    },
    {
      icon: '🚀',
      title: '高性能',
      description: '优化的组件结构和状态管理，确保流畅体验'
    },
    {
      icon: '🛠️',
      title: '实用工具',
      description: '集成多种实用工具，提升日常工作效率'
    },
    {
      icon: '🎮',
      title: '娱乐功能',
      description: '内置小游戏，工作之余放松身心'
    }
  ];

  const techStack = [
    { name: 'React', version: '18.2.0', description: '用户界面库' },
    { name: 'React Router', version: '6.8.1', description: '路由管理' },
    { name: 'CSS3', version: 'Latest', description: '样式和动画' },
    { name: 'JavaScript', version: 'ES6+', description: '编程语言' },
    { name: 'HTML5', version: 'Latest', description: '页面结构' }
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>ℹ️ 关于我们</h1>
        <p>了解这个React多功能应用</p>
      </div>

      <div className="about-content">
        <section className="about-intro">
          <div className="intro-card">
            <h2>🌟 项目介绍</h2>
            <p>
              这是一个基于React构建的现代化多功能网页应用，集成了实用工具、
              娱乐游戏、数据展示等多种功能。项目采用组件化开发模式，
              具有优美的界面设计和流畅的用户体验。
            </p>
            <p>
              我们致力于创造一个既实用又有趣的网页应用，让用户在享受
              现代化界面的同时，也能获得实际的功能价值。
            </p>
          </div>
        </section>

        <section className="about-features">
          <h2>✨ 核心特性</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-tech">
          <h2>🔧 技术栈</h2>
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-card">
                <div className="tech-info">
                  <h3>{tech.name}</h3>
                  <span className="tech-version">v{tech.version}</span>
                </div>
                <p>{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-stats">
          <h2>📊 项目统计</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">功能页面</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">组件数量</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">代码行数</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">开源免费</div>
            </div>
          </div>
        </section>

        <section className="about-contact">
          <div className="contact-card">
            <h2>📞 联系我们</h2>
            <p>如果您有任何问题或建议，欢迎与我们联系：</p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>邮箱: example@email.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <span>网站: www.example.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <span>反馈: 欢迎提出改进建议</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;