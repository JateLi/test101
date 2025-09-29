import React, { useState } from 'react';
import { exportSettings, importSettings, createFullBackup, restoreFromBackup } from '../utils/dataExport';
import Toast from './Toast';
import './DataExportPanel.css';

function DataExportPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('export');
  const [toast, setToast] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportSettings = async () => {
    try {
      setIsProcessing(true);
      exportSettings();
      showToast('设置导出成功！', 'success');
    } catch (error) {
      showToast('导出失败: ' + error.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImportSettings = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      await importSettings(file);
      showToast('设置导入成功！请刷新页面查看效果。', 'success');
    } catch (error) {
      showToast('导入失败: ' + error.message, 'error');
    } finally {
      setIsProcessing(false);
      event.target.value = ''; // 重置文件输入
    }
  };

  const handleCreateBackup = async () => {
    try {
      setIsProcessing(true);
      createFullBackup();
      showToast('完整备份创建成功！', 'success');
    } catch (error) {
      showToast('备份失败: ' + error.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestoreBackup = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      await restoreFromBackup(file);
      showToast('备份恢复成功！请刷新页面查看效果。', 'success');
    } catch (error) {
      showToast('恢复失败: ' + error.message, 'error');
    } finally {
      setIsProcessing(false);
      event.target.value = ''; // 重置文件输入
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('确定要清除所有本地数据吗？此操作不可撤销！')) {
      localStorage.clear();
      showToast('所有数据已清除！请刷新页面。', 'warning');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="export-overlay" onClick={onClose}>
        <div className="export-panel" onClick={e => e.stopPropagation()}>
          <div className="export-header">
            <h2>📤 数据管理</h2>
            <button className="export-close" onClick={onClose}>×</button>
          </div>

          <div className="export-tabs">
            <button
              className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
              onClick={() => setActiveTab('export')}
            >
              📤 导出
            </button>
            <button
              className={`tab-btn ${activeTab === 'import' ? 'active' : ''}`}
              onClick={() => setActiveTab('import')}
            >
              📥 导入
            </button>
            <button
              className={`tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
              onClick={() => setActiveTab('backup')}
            >
              💾 备份
            </button>
          </div>

          <div className="export-content">
            {activeTab === 'export' && (
              <div className="export-section">
                <div className="export-item">
                  <div className="export-info">
                    <h3>⚙️ 应用设置</h3>
                    <p>导出主题、颜色和个人偏好设置</p>
                  </div>
                  <button
                    className="export-btn primary"
                    onClick={handleExportSettings}
                    disabled={isProcessing}
                  >
                    {isProcessing ? '导出中...' : '导出设置'}
                  </button>
                </div>

                <div className="export-item">
                  <div className="export-info">
                    <h3>📊 使用统计</h3>
                    <p>导出应用使用数据和统计信息</p>
                  </div>
                  <button
                    className="export-btn secondary"
                    onClick={() => showToast('功能开发中...', 'info')}
                  >
                    导出统计
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'import' && (
              <div className="import-section">
                <div className="import-item">
                  <div className="import-info">
                    <h3>⚙️ 导入设置</h3>
                    <p>从JSON文件恢复应用设置</p>
                  </div>
                  <label className="file-input-label">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportSettings}
                      disabled={isProcessing}
                      className="file-input"
                    />
                    <span className="file-input-btn">
                      {isProcessing ? '导入中...' : '选择文件'}
                    </span>
                  </label>
                </div>

                <div className="import-warning">
                  <div className="warning-icon">⚠️</div>
                  <div className="warning-text">
                    <strong>注意：</strong>导入设置将覆盖当前配置，建议先备份现有设置。
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="backup-section">
                <div className="backup-item">
                  <div className="backup-info">
                    <h3>💾 创建完整备份</h3>
                    <p>备份所有设置和用户数据</p>
                  </div>
                  <button
                    className="backup-btn primary"
                    onClick={handleCreateBackup}
                    disabled={isProcessing}
                  >
                    {isProcessing ? '备份中...' : '创建备份'}
                  </button>
                </div>

                <div className="backup-item">
                  <div className="backup-info">
                    <h3>📥 恢复备份</h3>
                    <p>从备份文件恢复所有数据</p>
                  </div>
                  <label className="file-input-label">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleRestoreBackup}
                      disabled={isProcessing}
                      className="file-input"
                    />
                    <span className="file-input-btn">
                      {isProcessing ? '恢复中...' : '选择备份'}
                    </span>
                  </label>
                </div>

                <div className="danger-zone">
                  <h3>🚨 危险操作</h3>
                  <div className="danger-item">
                    <div className="danger-info">
                      <h4>清除所有数据</h4>
                      <p>删除所有本地存储的数据和设置</p>
                    </div>
                    <button
                      className="danger-btn"
                      onClick={handleClearAllData}
                    >
                      清除数据
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default DataExportPanel;