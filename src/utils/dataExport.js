// 数据导出工具函数

export const exportToJSON = (data, filename = 'data') => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadFile(blob, `${filename}.json`);
};

export const exportToCSV = (data, filename = 'data') => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('数据必须是非空数组');
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // 处理包含逗号或引号的值
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, `${filename}.csv`);
};

export const exportToTXT = (data, filename = 'data') => {
  let textContent = '';

  if (typeof data === 'string') {
    textContent = data;
  } else if (Array.isArray(data)) {
    textContent = data.join('\n');
  } else if (typeof data === 'object') {
    textContent = JSON.stringify(data, null, 2);
  } else {
    textContent = String(data);
  }

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
  downloadFile(blob, `${filename}.txt`);
};

export const exportSettings = () => {
  const settings = {
    theme: localStorage.getItem('app-theme') || 'dark',
    accentColor: localStorage.getItem('app-accent-color') || '#4fc3f7',
    appSettings: JSON.parse(localStorage.getItem('app-settings') || '{}'),
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };

  exportToJSON(settings, `react-app-settings-${formatDate(new Date())}`);
};

export const importSettings = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target.result);

        // 验证设置格式
        if (!settings.theme || !settings.accentColor) {
          throw new Error('无效的设置文件格式');
        }

        // 应用设置
        localStorage.setItem('app-theme', settings.theme);
        localStorage.setItem('app-accent-color', settings.accentColor);
        if (settings.appSettings) {
          localStorage.setItem('app-settings', JSON.stringify(settings.appSettings));
        }

        resolve(settings);
      } catch (error) {
        reject(new Error('设置文件解析失败: ' + error.message));
      }
    };

    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
};

export const exportTodoList = (todos) => {
  const todoData = todos.map(todo => ({
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
    createdAt: todo.createdAt ? new Date(todo.createdAt).toISOString() : null,
    completedAt: todo.completed ? new Date().toISOString() : null
  }));

  return {
    exportToJSON: () => exportToJSON(todoData, `todos-${formatDate(new Date())}`),
    exportToCSV: () => exportToCSV(todoData, `todos-${formatDate(new Date())}`),
    exportToTXT: () => {
      const textContent = todos.map(todo =>
        `${todo.completed ? '✓' : '○'} ${todo.text}`
      ).join('\n');
      exportToTXT(textContent, `todos-${formatDate(new Date())}`);
    }
  };
};

export const exportGameStats = (stats) => {
  const gameData = {
    ...stats,
    exportDate: new Date().toISOString(),
    totalGamesPlayed: Object.values(stats).reduce((sum, count) => sum + (count || 0), 0)
  };

  exportToJSON(gameData, `game-stats-${formatDate(new Date())}`);
};

// 辅助函数
const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// 数据备份和恢复
export const createFullBackup = () => {
  const backup = {
    settings: {
      theme: localStorage.getItem('app-theme'),
      accentColor: localStorage.getItem('app-accent-color'),
      appSettings: JSON.parse(localStorage.getItem('app-settings') || '{}')
    },
    userData: {
      // 这里可以添加用户数据，如待办事项、游戏记录等
      // 由于我们使用的是组件内状态，这里暂时为空
      // 在实际应用中，可以从全局状态管理器中获取数据
    },
    metadata: {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      userAgent: navigator.userAgent
    }
  };

  exportToJSON(backup, `react-app-backup-${formatDate(new Date())}`);
};

export const restoreFromBackup = async (file) => {
  try {
    const backup = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          resolve(JSON.parse(e.target.result));
        } catch (error) {
          reject(new Error('备份文件格式错误'));
        }
      };
      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsText(file);
    });

    // 验证备份文件
    if (!backup.settings || !backup.metadata) {
      throw new Error('无效的备份文件');
    }

    // 恢复设置
    if (backup.settings.theme) {
      localStorage.setItem('app-theme', backup.settings.theme);
    }
    if (backup.settings.accentColor) {
      localStorage.setItem('app-accent-color', backup.settings.accentColor);
    }
    if (backup.settings.appSettings) {
      localStorage.setItem('app-settings', JSON.stringify(backup.settings.appSettings));
    }

    return backup;
  } catch (error) {
    throw new Error('备份恢复失败: ' + error.message);
  }
};