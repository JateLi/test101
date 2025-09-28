import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState('dark');
  const [weather, setWeather] = useState({ temp: 22, condition: '晴朗' });
  const [quote, setQuote] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcInput, setCalcInput] = useState('');

  // 时钟更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 随机名言
  const quotes = [
    "代码是诗歌，程序员是诗人。",
    "简洁是可靠的先决条件。",
    "程序必须为人而写，机器执行只是附带任务。",
    "最好的代码是没有代码。",
    "调试就像是在一部犯罪电影中当侦探。"
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleCountChange = (newCount) => {
    setIsAnimating(true);
    setCount(newCount);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // 待办事项功能
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date()
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 计算器功能
  const handleCalcClick = (value) => {
    if (value === '=') {
      try {
        const result = eval(calcInput);
        setCalcDisplay(result.toString());
        setCalcInput(result.toString());
      } catch (error) {
        setCalcDisplay('错误');
        setCalcInput('');
      }
    } else if (value === 'C') {
      setCalcDisplay('0');
      setCalcInput('');
    } else {
      const newInput = calcInput + value;
      setCalcInput(newInput);
      setCalcDisplay(newInput);
    }
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
              <span className="subtitle">多功能网页应用</span>
            </h1>
          </div>
          <p className="hero-description">
            体验组件化开发的强大魅力 - 集成多种实用功能
          </p>
        </div>

        <div className="content-grid">
          {/* 时钟和天气卡片 */}
          <div className="card clock-card">
            <div className="card-header">
              <h2>🕐 实时时钟</h2>
            </div>
            <div className="clock-display">
              <div className="time">
                {currentTime.toLocaleTimeString('zh-CN')}
              </div>
              <div className="date">
                {currentTime.toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </div>
            </div>
            <div className="weather-info">
              <div className="weather-temp">{weather.temp}°C</div>
              <div className="weather-condition">{weather.condition}</div>
            </div>
          </div>

          {/* 计数器卡片 */}
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

          {/* 待办事项卡片 */}
          <div className="card todo-card">
            <div className="card-header">
              <h2>📝 待办事项</h2>
            </div>
            <div className="todo-input">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="添加新任务..."
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="todo-input-field"
              />
              <button onClick={addTodo} className="btn btn-primary add-btn">
                ➕
              </button>
            </div>
            <div className="todo-list">
              {todos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{todo.text}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              {todos.length === 0 && (
                <div className="empty-todos">暂无待办事项</div>
              )}
            </div>
          </div>

          {/* 计算器卡片 */}
          <div className="card calculator-card">
            <div className="card-header">
              <h2>🧮 计算器</h2>
              <button
                className="toggle-calc-btn"
                onClick={() => setShowCalculator(!showCalculator)}
              >
                {showCalculator ? '收起' : '展开'}
              </button>
            </div>
            {showCalculator && (
              <div className="calculator">
                <div className="calc-display">{calcDisplay}</div>
                <div className="calc-buttons">
                  {['C', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '+', '1', '2', '3', '=', '0', '0', '.', '='].map((btn, index) => (
                    <button
                      key={index}
                      className={`calc-btn ${btn === '=' ? 'calc-equals' : ''} ${['+', '-', '*', '/', 'C'].includes(btn) ? 'calc-operator' : ''}`}
                      onClick={() => handleCalcClick(btn)}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 名言卡片 */}
          <div className="card quote-card">
            <div className="card-header">
              <h2>💭 每日名言</h2>
            </div>
            <div className="quote-content">
              <p className="quote-text">"{quote}"</p>
              <button
                className="btn btn-accent"
                onClick={() => setQuote(quotes[Math.floor(Math.random() * quotes.length)])}
              >
                🔄 换一句
              </button>
            </div>
          </div>

          {/* React特性卡片 */}
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
            <div className="stat-number">{todos.length}</div>
            <div className="stat-label">待办事项</div>
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