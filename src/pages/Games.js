import React, { useState, useEffect } from 'react';
import './Games.css';

function Games() {
  // 猜数字游戏
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('猜一个1-100之间的数字！');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // 记忆游戏
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showingSequence, setShowingSequence] = useState(false);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  // 反应时间游戏
  const [reactionStart, setReactionStart] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [waitingForClick, setWaitingForClick] = useState(false);
  const [reactionMessage, setReactionMessage] = useState('点击开始测试反应时间');

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('请输入1-100之间的有效数字！');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === targetNumber) {
      setMessage(`🎉 恭喜！你用${newAttempts}次猜中了数字${targetNumber}！`);
      setGameWon(true);
    } else if (num < targetNumber) {
      setMessage(`太小了！再试试更大的数字。(第${newAttempts}次尝试)`);
    } else {
      setMessage(`太大了！再试试更小的数字。(第${newAttempts}次尝试)`);
    }
    setGuess('');
  };

  const resetGuessGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('猜一个1-100之间的数字！');
    setAttempts(0);
    setGameWon(false);
  };

  // 记忆游戏逻辑
  const colors = ['red', 'blue', 'green', 'yellow'];

  const startMemoryGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameActive(true);
    addToSequence();
  };

  const addToSequence = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    showSequence(newSequence);
  };

  const showSequence = (seq) => {
    setShowingSequence(true);
    setPlayerSequence([]);

    seq.forEach((color, index) => {
      setTimeout(() => {
        // 这里应该高亮显示颜色
        if (index === seq.length - 1) {
          setTimeout(() => setShowingSequence(false), 600);
        }
      }, (index + 1) * 600);
    });
  };

  const handleColorClick = (color) => {
    if (showingSequence || !gameActive) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameActive(false);
      alert(`游戏结束！最终得分：${score}`);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 1);
      setTimeout(() => addToSequence(), 1000);
    }
  };

  // 反应时间游戏
  const startReactionTest = () => {
    setReactionMessage('等待绿色出现...');
    setWaitingForClick(false);
    setReactionTime(null);

    const delay = Math.random() * 3000 + 1000; // 1-4秒随机延迟
    setTimeout(() => {
      setReactionMessage('现在点击！');
      setWaitingForClick(true);
      setReactionStart(Date.now());
    }, delay);
  };

  const handleReactionClick = () => {
    if (!waitingForClick) {
      setReactionMessage('太早了！点击重新开始');
      return;
    }

    const time = Date.now() - reactionStart;
    setReactionTime(time);
    setWaitingForClick(false);
    setReactionMessage(`你的反应时间：${time}ms`);
  };

  return (
    <div className="games-page">
      <div className="games-header">
        <h1>🎮 游戏中心</h1>
        <p>休闲小游戏，放松一下吧！</p>
      </div>

      <div className="games-grid">
        {/* 猜数字游戏 */}
        <div className="game-card">
          <div className="game-header">
            <h2>🎯 猜数字游戏</h2>
          </div>
          <div className="game-content">
            <p className="game-message">{message}</p>
            <div className="game-stats">
              <span>尝试次数: {attempts}</span>
            </div>
            {!gameWon && (
              <div className="guess-input">
                <input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="输入你的猜测"
                  min="1"
                  max="100"
                  onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                />
                <button onClick={handleGuess} className="btn btn-primary">
                  猜测
                </button>
              </div>
            )}
            <button onClick={resetGuessGame} className="btn btn-secondary">
              {gameWon ? '再玩一次' : '重新开始'}
            </button>
          </div>
        </div>

        {/* 记忆游戏 */}
        <div className="game-card">
          <div className="game-header">
            <h2>🧠 记忆游戏</h2>
          </div>
          <div className="game-content">
            <p>记住颜色序列并重复它们</p>
            <div className="game-stats">
              <span>得分: {score}</span>
            </div>
            <div className="color-buttons">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${color}`}
                  onClick={() => handleColorClick(color)}
                  disabled={showingSequence}
                >
                </button>
              ))}
            </div>
            <button
              onClick={startMemoryGame}
              className="btn btn-primary"
              disabled={gameActive}
            >
              {gameActive ? '游戏进行中...' : '开始游戏'}
            </button>
          </div>
        </div>

        {/* 反应时间测试 */}
        <div className="game-card">
          <div className="game-header">
            <h2>⚡ 反应时间测试</h2>
          </div>
          <div className="game-content">
            <div
              className={`reaction-area ${waitingForClick ? 'active' : ''}`}
              onClick={handleReactionClick}
            >
              <p className="reaction-message">{reactionMessage}</p>
              {reactionTime && (
                <div className="reaction-result">
                  <p>反应时间: <strong>{reactionTime}ms</strong></p>
                  <p className="reaction-rating">
                    {reactionTime < 200 ? '🚀 超快!' :
                      reactionTime < 300 ? '⚡ 很快!' :
                        reactionTime < 400 ? '👍 不错!' : '🐌 需要练习'}
                  </p>
                </div>
              )}
            </div>
            <button onClick={startReactionTest} className="btn btn-accent">
              开始测试
            </button>
          </div>
        </div>

        {/* 简单的点击游戏 */}
        <div className="game-card">
          <div className="game-header">
            <h2>🖱️ 点击挑战</h2>
          </div>
          <div className="game-content">
            <p>10秒内尽可能多地点击按钮！</p>
            <ClickGame />
          </div>
        </div>
      </div>
    </div>
  );
}

// 点击游戏组件
function ClickGame() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [bestScore, setBestScore] = useState(localStorage.getItem('clickGameBest') || 0);

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      if (clicks > bestScore) {
        setBestScore(clicks);
        localStorage.setItem('clickGameBest', clicks);
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive, clicks, bestScore]);

  const startGame = () => {
    setClicks(0);
    setTimeLeft(10);
    setGameActive(true);
  };

  const handleClick = () => {
    if (gameActive) {
      setClicks(clicks + 1);
    }
  };

  return (
    <div className="click-game">
      <div className="click-stats">
        <div>点击次数: {clicks}</div>
        <div>剩余时间: {timeLeft}s</div>
        <div>最佳记录: {bestScore}</div>
      </div>
      <button
        className={`click-target ${gameActive ? 'active' : ''}`}
        onClick={handleClick}
        disabled={!gameActive}
      >
        {gameActive ? '点击我！' : timeLeft === 0 ? `游戏结束！得分：${clicks}` : '准备开始'}
      </button>
      <button onClick={startGame} className="btn btn-primary">
        {gameActive ? '游戏进行中...' : '开始游戏'}
      </button>
    </div>
  );
}

export default Games;