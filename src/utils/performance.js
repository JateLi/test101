// 性能监控工具
export const measurePerformance = (name, fn) => {
  return (...args) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();

    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${name} 执行时间: ${(end - start).toFixed(2)}ms`);
    }

    return result;
  };
};

// 页面加载性能监控
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// 内存使用监控
export const logMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memory = performance.memory;
    console.log('📊 内存使用情况:', {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`
    });
  }
};

// 组件渲染性能监控
export const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  return function PerformanceMonitoredComponent(props) {
    const renderStart = performance.now();

    React.useEffect(() => {
      const renderEnd = performance.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`🎨 ${componentName} 渲染时间: ${(renderEnd - renderStart).toFixed(2)}ms`);
      }
    });

    return React.createElement(WrappedComponent, props);
  };
};