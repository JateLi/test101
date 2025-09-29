# 部署指南

本文档介绍如何将React多功能应用部署到各种平台。

## 🚀 快速部署

### Vercel (推荐)

1. **安装Vercel CLI**
```bash
npm i -g vercel
```

2. **登录并部署**
```bash
vercel login
vercel --prod
```

3. **自动部署设置**
- 连接GitHub仓库
- 每次推送自动部署
- 预览部署功能

### Netlify

1. **构建项目**
```bash
npm run build
```

2. **拖拽部署**
- 访问 [netlify.com](https://netlify.com)
- 拖拽 `build` 文件夹到部署区域

3. **Git集成部署**
- 连接GitHub仓库
- 设置构建命令: `npm run build`
- 设置发布目录: `build`

### GitHub Pages

1. **安装gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **添加部署脚本到package.json**
```json
{
  "homepage": "https://yourusername.github.io/test101",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **部署**
```bash
npm run deploy
```

### Firebase Hosting

1. **安装Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **初始化项目**
```bash
firebase login
firebase init hosting
```

3. **构建并部署**
```bash
npm run build
firebase deploy
```

## 🔧 环境配置

### 环境变量

创建 `.env` 文件：
```env
REACT_APP_VERSION=1.0.0
REACT_APP_API_URL=https://api.example.com
REACT_APP_ANALYTICS_ID=your-analytics-id
```

### 生产优化

1. **代码分割**
```javascript
// 懒加载组件
const LazyComponent = React.lazy(() => import('./Component'));
```

2. **Bundle分析**
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

3. **性能监控**
```javascript
// 添加到index.js
import { reportWebVitals } from './utils/performance';
reportWebVitals(console.log);
```

## 📊 监控和分析

### Google Analytics

1. **添加跟踪代码**
```html
<!-- 在public/index.html中添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 错误监控

1. **Sentry集成**
```bash
npm install @sentry/react @sentry/tracing
```

2. **配置Sentry**
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN_HERE",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## 🔒 安全配置

### Content Security Policy

在 `public/index.html` 添加：
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

### HTTPS重定向

在 `public/_redirects` (Netlify) 或 `vercel.json` (Vercel) 中配置HTTPS重定向。

## 📱 PWA配置

### Service Worker

1. **启用PWA**
```javascript
// 在src/index.js中
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();
```

2. **自定义manifest.json**
```json
{
  "short_name": "React App",
  "name": "React 多功能应用",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

## 🚀 性能优化

### 构建优化

1. **代码压缩**
```bash
# 已在react-scripts中内置
npm run build
```

2. **图片优化**
- 使用WebP格式
- 实现懒加载
- 压缩图片资源

3. **缓存策略**
```javascript
// 在service worker中配置缓存
const CACHE_NAME = 'react-app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];
```

## 📈 SEO优化

### Meta标签

```html
<meta name="description" content="React多功能网页应用">
<meta name="keywords" content="React, 工具, 游戏, 应用">
<meta property="og:title" content="React 多功能应用">
<meta property="og:description" content="现代化的React多功能网页应用">
<meta property="og:image" content="/og-image.png">
```

### 结构化数据

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "React 多功能应用",
  "description": "集成实用工具和娱乐功能的React应用"
}
</script>
```

## 🔍 故障排除

### 常见问题

1. **路由404错误**
   - 配置服务器重定向到index.html
   - 使用HashRouter作为备选方案

2. **构建失败**
   - 检查Node.js版本兼容性
   - 清除node_modules重新安装

3. **性能问题**
   - 使用React DevTools Profiler
   - 检查不必要的重渲染

### 调试工具

```bash
# 开发环境调试
npm start

# 生产环境本地测试
npm run build
npx serve -s build
```

## 📞 支持

如果遇到部署问题，请：
1. 检查控制台错误信息
2. 查看部署平台的日志
3. 参考官方文档
4. 在GitHub Issues中提问

---

**祝你部署顺利！** 🎉