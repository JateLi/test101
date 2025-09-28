import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>欢迎使用 React.js</h1>
        <p>这是一个简单的React网页应用</p>

        <div className="counter-section">
          <h2>计数器示例</h2>
          <p>当前计数: {count}</p>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)}>
              增加 +1
            </button>
            <button onClick={() => setCount(count - 1)}>
              减少 -1
            </button>
            <button onClick={() => setCount(0)}>
              重置
            </button>
          </div>
        </div>

        <div className="info-section">
          <h2>React 特性</h2>
          <ul>
            <li>组件化开发</li>
            <li>虚拟DOM</li>
            <li>状态管理</li>
            <li>响应式更新</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;