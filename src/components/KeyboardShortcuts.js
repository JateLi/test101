import React, { useState, useEffect } from 'react';
import './KeyboardShortcuts.css';

function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(false);

  const shortcuts = [
    { keys: ['Ctrl', 'K'], description: '打开搜索' },
    { keys: ['Ctrl', ','], description: '打开设置' },
    { keys: ['Ctrl', 'H'], description: '返回首页' },
    { keys: ['Ctrl', 'B'], description: '返回上页' },
    { keys: ['Alt', '1'], description: '首页' },
    { keys: ['Alt', '2'], description: '仪表板' },
    { keys: ['Alt', '3'], description: '游戏中心' },
    { keys: ['Alt', '4'], description: '工具箱' },
    { keys: ['Alt', '5'], description: '图片库' },
    { keys: ['Alt', '6'], description: '关于页面' },
    { keys: ['?'], description: '显示快捷键' },
    { keys: ['Esc'], description: '关闭弹窗' }
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsVisible(true);
      }
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) {
    return (
      <div className="keyboard-hint">
        <span className="hint-text">按 <kbd>?</kbd> 查看快捷键</span>
      </div>
    );
  }

  return (
    <div className="shortcuts-overlay" onClick={() => setIsVisible(false)}>
      <div className="shortcuts-modal" onClick={e => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h2>⌨️ 键盘快捷键</h2>
          <button
            className="shortcuts-close"
            onClick={() => setIsVisible(false)}
          >
            ×
          </button>
        </div>

        <div className="shortcuts-content">
          <div className="shortcuts-grid">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="shortcut-item">
                <div className="shortcut-keys">
                  {shortcut.keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <kbd className="shortcut-key">{key}</kbd>
                      {keyIndex < shortcut.keys.length - 1 && (
                        <span className="key-separator">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <span className="shortcut-description">{shortcut.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="shortcuts-footer">
          <p>💡 提示：大部分快捷键在任何页面都可使用</p>
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcuts;