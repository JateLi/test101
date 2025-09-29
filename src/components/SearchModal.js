import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchModal.css';

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const searchData = [
    { title: '首页', path: '/', description: '应用概览和介绍', icon: '🏠', keywords: ['home', 'index', '首页', '主页'] },
    { title: '仪表板', path: '/dashboard', description: '实时数据和工具集合', icon: '📊', keywords: ['dashboard', '仪表板', '工具', '计数器', '时钟'] },
    { title: '游戏中心', path: '/games', description: '休闲小游戏集合', icon: '🎮', keywords: ['games', '游戏', '娱乐', '猜数字', '记忆'] },
    { title: '工具箱', path: '/tools', description: '实用工具集合', icon: '🛠️', keywords: ['tools', '工具', '颜色', '文本', '转换'] },
    { title: '图片库', path: '/gallery', description: '精美图片展示', icon: '🖼️', keywords: ['gallery', '图片', '相册', '照片'] },
    { title: '关于', path: '/about', description: '项目介绍和技术栈', icon: 'ℹ️', keywords: ['about', '关于', '介绍', '技术'] },

    // 功能搜索
    { title: '智能计数器', path: '/dashboard', description: '数字计数功能', icon: '🔢', keywords: ['counter', '计数器', '数字'] },
    { title: '待办事项', path: '/dashboard', description: '任务管理功能', icon: '📝', keywords: ['todo', '待办', '任务', '清单'] },
    { title: '计算器', path: '/dashboard', description: '基础计算功能', icon: '🧮', keywords: ['calculator', '计算器', '计算'] },
    { title: '颜色选择器', path: '/tools', description: '颜色选择和复制', icon: '🎨', keywords: ['color', '颜色', '调色板'] },
    { title: '文本分析器', path: '/tools', description: '文本统计分析', icon: '📄', keywords: ['text', '文本', '分析', '统计'] },
    { title: '猜数字游戏', path: '/games', description: '数字猜测挑战', icon: '🎯', keywords: ['guess', '猜数字', '游戏'] },
    { title: '记忆游戏', path: '/games', description: '颜色序列记忆', icon: '🧠', keywords: ['memory', '记忆', '颜色'] }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter(item => {
        const searchText = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(searchText))
        );
      });
      setResults(filtered.slice(0, 8)); // 限制结果数量
    } else {
      setResults([]);
    }
  }, [query]);

  const handleItemClick = (path) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && results.length > 0) {
      handleItemClick(results[0].path);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索页面和功能..."
              className="search-input"
            />
            <button className="search-close" onClick={onClose}>×</button>
          </div>
        </div>

        <div className="search-results">
          {query.trim() && results.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <p>未找到相关结果</p>
              <small>尝试使用不同的关键词</small>
            </div>
          )}

          {results.map((item, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={() => handleItemClick(item.path)}
            >
              <span className="result-icon">{item.icon}</span>
              <div className="result-content">
                <h3 className="result-title">{item.title}</h3>
                <p className="result-description">{item.description}</p>
              </div>
              <span className="result-arrow">→</span>
            </div>
          ))}
        </div>

        <div className="search-footer">
          <div className="search-tips">
            <span className="tip">
              <kbd>↵</kbd> 选择
            </span>
            <span className="tip">
              <kbd>Esc</kbd> 关闭
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;