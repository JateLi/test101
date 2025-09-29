import React, { useState } from 'react';
import './Tools.css';

function Tools() {
  const [colorPicker, setColorPicker] = useState('#ff6b6b');
  const [textInput, setTextInput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setTextInput(text);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板！');
  };

  return (
    <div className="tools-page">
      <div className="tools-header">
        <h1>🛠️ 工具箱</h1>
        <p>实用工具集合</p>
      </div>

      <div className="tools-grid">
        {/* 颜色选择器 */}
        <div className="tool-card">
          <div className="tool-header">
            <h2>🎨 颜色选择器</h2>
          </div>
          <div className="tool-content">
            <input
              type="color"
              value={colorPicker}
              onChange={(e) => setColorPicker(e.target.value)}
              className="color-input"
            />
            <div className="color-preview" style={{ backgroundColor: colorPicker }}>
              <span className="color-text">{colorPicker}</span>
            </div>
            <button
              onClick={() => copyToClipboard(colorPicker)}
              className="btn btn-primary"
            >
              📋 复制颜色值
            </button>
          </div>
        </div>

        {/* 文本分析器 */}
        <div className="tool-card">
          <div className="tool-header">
            <h2>📝 文本分析器</h2>
          </div>
          <div className="tool-content">
            <textarea
              value={textInput}
              onChange={handleTextChange}
              placeholder="在这里输入文本..."
              className="text-analyzer"
            />
            <div className="text-stats">
              <div className="stat">
                <span className="stat-label">字符数:</span>
                <span className="stat-value">{charCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">单词数:</span>
                <span className="stat-value">{wordCount}</span>
              </div>
            </div>
            <div className="text-actions">
              <button
                onClick={() => copyToClipboard(textInput.toUpperCase())}
                className="btn btn-secondary"
              >
                复制大写
              </button>
              <button
                onClick={() => copyToClipboard(textInput.toLowerCase())}
                className="btn btn-secondary"
              >
                复制小写
              </button>
            </div>
          </div>
        </div>

        {/* 随机生成器 */}
        <div className="tool-card">
          <div className="tool-header">
            <h2>🎲 随机生成器</h2>
          </div>
          <div className="tool-content">
            <RandomGenerator />
          </div>
        </div>

        {/* 单位转换器 */}
        <div className="tool-card">
          <div className="tool-header">
            <h2>🔄 单位转换器</h2>
          </div>
          <div className="tool-content">
            <UnitConverter />
          </div>
        </div>
      </div>
    </div>
  );
}

function RandomGenerator() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);

  const generateNumber = () => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(num);
  };

  return (
    <div className="random-generator">
      <div className="range-inputs">
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(parseInt(e.target.value) || 0)}
          placeholder="最小值"
        />
        <span>到</span>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value) || 100)}
          placeholder="最大值"
        />
      </div>
      <div className="random-result">
        <span className="random-number">{randomNumber}</span>
      </div>
      <button onClick={generateNumber} className="btn btn-accent">
        生成随机数
      </button>
    </div>
  );
}

function UnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('inch');
  const [result, setResult] = useState('');

  const conversions = {
    cm: { inch: 0.393701, m: 0.01, ft: 0.0328084 },
    inch: { cm: 2.54, m: 0.0254, ft: 0.0833333 },
    m: { cm: 100, inch: 39.3701, ft: 3.28084 },
    ft: { cm: 30.48, inch: 12, m: 0.3048 }
  };

  const convert = () => {
    if (!value || isNaN(value)) return;

    if (fromUnit === toUnit) {
      setResult(value);
      return;
    }

    const converted = parseFloat(value) * conversions[fromUnit][toUnit];
    setResult(converted.toFixed(4));
  };

  return (
    <div className="unit-converter">
      <div className="converter-input">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="输入数值"
        />
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          <option value="cm">厘米</option>
          <option value="inch">英寸</option>
          <option value="m">米</option>
          <option value="ft">英尺</option>
        </select>
      </div>
      <div className="converter-arrow">→</div>
      <div className="converter-output">
        <input type="text" value={result} readOnly placeholder="转换结果" />
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          <option value="cm">厘米</option>
          <option value="inch">英寸</option>
          <option value="m">米</option>
          <option value="ft">英尺</option>
        </select>
      </div>
      <button onClick={convert} className="btn btn-primary">
        转换
      </button>
    </div>
  );
}

export default Tools;