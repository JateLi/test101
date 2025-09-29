# 贡献指南

感谢你对React多功能应用的关注！我们欢迎各种形式的贡献。

## 🤝 如何贡献

### 报告问题

如果你发现了bug或有功能建议：

1. **搜索现有Issues** - 确保问题未被报告
2. **创建新Issue** - 使用合适的模板
3. **提供详细信息** - 包含复现步骤、环境信息等

### 提交代码

1. **Fork仓库**
```bash
git clone https://github.com/yourusername/test101.git
cd test101
```

2. **创建功能分支**
```bash
git checkout -b feature/amazing-feature
```

3. **安装依赖**
```bash
npm install
```

4. **开发和测试**
```bash
npm start  # 启动开发服务器
npm test   # 运行测试
```

5. **提交更改**
```bash
git add .
git commit -m "feat: add amazing feature"
```

6. **推送分支**
```bash
git push origin feature/amazing-feature
```

7. **创建Pull Request**

## 📝 代码规范

### 提交信息格式

使用[Conventional Commits](https://conventionalcommits.org/)格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(dashboard): add real-time weather widget

Add weather information display to dashboard with:
- Current temperature and condition
- Location-based weather data
- Responsive design for mobile devices

Closes #123
```

### 代码风格

1. **JavaScript/React**
   - 使用ES6+语法
   - 函数组件优于类组件
   - 使用Hooks进行状态管理
   - 遵循ESLint规则

2. **CSS**
   - 使用BEM命名规范
   - 移动端优先的响应式设计
   - 使用CSS变量定义主题色彩
   - 避免内联样式

3. **文件组织**
```
src/
├── components/     # 可复用组件
├── pages/         # 页面组件
├── contexts/      # React Context
├── utils/         # 工具函数
├── hooks/         # 自定义Hooks
└── assets/        # 静态资源
```

### 组件开发规范

1. **组件结构**
```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Component.css';

function Component({ prop1, prop2 }) {
  // Hooks
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // handler logic
  };
  
  // Render
  return (
    <div className="component">
      {/* JSX content */}
    </div>
  );
}

Component.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number
};

Component.defaultProps = {
  prop2: 0
};

export default Component;
```

2. **CSS模块化**
```css
/* Component.css */
.component {
  /* 组件根样式 */
}

.component__element {
  /* 元素样式 */
}

.component__element--modifier {
  /* 修饰符样式 */
}
```

## 🧪 测试指南

### 单元测试

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  test('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  test('handles user interaction', () => {
    render(<Component />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Updated Text')).toBeInTheDocument();
  });
});
```

### 集成测试

```javascript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders navigation and routes correctly', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  expect(screen.getByText('首页')).toBeInTheDocument();
  expect(screen.getByText('仪表板')).toBeInTheDocument();
});
```

## 🎨 设计指南

### 视觉设计原则

1. **一致性** - 统一的颜色、字体、间距
2. **简洁性** - 清晰的信息层次
3. **可访问性** - 支持键盘导航和屏幕阅读器
4. **响应式** - 适配各种设备尺寸

### 颜色系统

```css
:root {
  --primary-color: #4fc3f7;
  --secondary-color: #4CAF50;
  --accent-color: #ff6b6b;
  --text-primary: #333333;
  --text-secondary: rgba(0, 0, 0, 0.7);
  --background-primary: #ffffff;
  --background-secondary: #f8f9fa;
}
```

### 间距系统

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
}
```

## 📚 文档贡献

### 文档类型

1. **API文档** - 组件props和方法说明
2. **使用指南** - 功能使用教程
3. **开发文档** - 开发环境配置和流程
4. **部署文档** - 部署和运维指南

### 文档格式

使用Markdown格式，包含：
- 清晰的标题层次
- 代码示例
- 截图说明
- 相关链接

## 🔍 代码审查

### 审查清单

- [ ] 代码符合项目规范
- [ ] 功能正常工作
- [ ] 包含适当的测试
- [ ] 文档已更新
- [ ] 性能影响可接受
- [ ] 无安全隐患
- [ ] 向后兼容

### 审查流程

1. **自我审查** - 提交前自己检查代码
2. **同行审查** - 至少一个维护者审查
3. **测试验证** - 确保所有测试通过
4. **合并代码** - 审查通过后合并

## 🏆 贡献者认可

我们重视每一个贡献者的努力：

- **代码贡献者** - 在README中列出
- **问题报告者** - 在Issue中感谢
- **文档贡献者** - 在文档中署名
- **设计贡献者** - 在设计文件中标注

## 📞 联系方式

如有疑问，可以通过以下方式联系：

- **GitHub Issues** - 技术问题和功能建议
- **GitHub Discussions** - 一般讨论和问答
- **Email** - example@email.com

## 📄 许可证

通过贡献代码，你同意你的贡献将在MIT许可证下发布。

---

**感谢你的贡献！** 🙏