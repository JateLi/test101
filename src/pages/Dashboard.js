import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: 22, condition: '晴朗' });
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcInput, setCalcInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCountChange = (newCount) => {
    setIsAnimating(true);
    setCount(newCount);
    setTimeout(() => setIsAnimating(false), 300);
  };

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
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>📊 仪表板</h1>
        <p>实时数据和工具集合</p>
      </div>

      <div className="dashboard-grid">
        {/* 时钟卡片 */}
        <div className="dashboard-card clock-card">
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
        <div className="dashboard-card counter-card">
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
        <div className="dashboard-card todo-card">
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
        <div className="dashboard-card calculator-card">
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
      </div>

      <div className="dashboard-stats">
        <div className="stat-item">
          <div className="stat-number">{count}</div>
          <div className="stat-label">计数器值</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{todos.length}</div>
          <div className="stat-label">待办事项</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{todos.filter(t => t.completed).length}</div>
          <div className="stat-label">已完成</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;