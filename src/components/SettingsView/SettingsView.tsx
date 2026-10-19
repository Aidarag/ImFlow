import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Clock,
  User,
  Check,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const {
    settings,
    updateSettings,
    exportDataJSON,
    importDataJSON,
    resetAllData
  } = useApp();

  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imflow_aida_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJSON(importJsonText);
    if (ok) {
      setImportStatus('Data successfully restored!');
      setImportJsonText('');
    } else {
      setImportStatus('Error: Invalid JSON format.');
    }
    setTimeout(() => setImportStatus(null), 3000);
  };

  const handleSaveSettings = () => {
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2000);
  };

  return (
    <div className="settings-view animate-fade-in">
      <div className="section-header-row">
        <div>
          <h2 className="section-heading">Preferences & App Foundations</h2>
          <p className="section-caption">
            Private configuration for Aïda Garba • Schedule rules, quiet hours, protected focus, and data export.
          </p>
        </div>
        {saveBanner && (
          <span className="badge badge-tennis" style={{ padding: '8px 14px' }}>
            ✓ Preferences Saved
          </span>
        )}
      </div>

      <div className="settings-cards-stack">
        {/* Profile & Semester Card */}
        <div className="glass-panel settings-card">
          <div className="card-top-row">
            <div className="card-title-group">
              <User size={18} className="text-flow" />
              <h3 className="card-heading">Profile & Academic Semester</h3>
            </div>
            <span className="badge badge-flow">Private Profile</span>
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="input-text"
                value={settings.userName}
                onChange={e => updateSettings({ userName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Active Semester:</label>
              <input
                type="text"
                className="input-text"
                value={settings.semester}
                onChange={e => updateSettings({ semester: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Timezone:</label>
              <input
                type="text"
                className="input-text"
                value={settings.timezone}
                onChange={e => updateSettings({ timezone: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Protected Habits & Study Rules */}
        <div className="glass-panel settings-card">
          <div className="card-top-row">
            <div className="card-title-group">
              <Flame size={18} className="text-python" />
              <h3 className="card-heading">Protected Study & Quiet Hours</h3>
            </div>
            <span className="badge badge-python">Core Habit Policy</span>
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label>Daily Protected Python Practice (Minutes):</label>
              <input
                type="number"
                className="input-text"
                value={settings.protectedPythonMinutes}
                onChange={e =>
                  updateSettings({ protectedPythonMinutes: parseInt(e.target.value) || 30 })
                }
              />
              <span className="form-hint">
                Non-negotiable practice block scheduled around lectures and court practice.
              </span>
            </div>

            <div className="form-group">
              <label>Quiet Hours (Start):</label>
              <input
                type="time"
                className="input-text"
                value={settings.quietHoursStart}
                onChange={e => updateSettings({ quietHoursStart: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Quiet Hours (End / Wake):</label>
              <input
                type="time"
                className="input-text"
                value={settings.quietHoursEnd}
                onChange={e => updateSettings({ quietHoursEnd: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Data Persistence, Export & Restoration */}
        <div className="glass-panel settings-card">
          <div className="card-top-row">
            <div className="card-title-group">
              <Shield size={18} className="text-tennis" />
              <h3 className="card-heading">Data Sovereignty & Backups</h3>
            </div>
            <span className="badge badge-tennis">Full Export</span>
          </div>
          <p className="settings-desc">
            Your data is stored privately in your browser's persistent storage. Download complete backups in JSON anytime.
          </p>

          <div className="export-actions-row">
            <button className="btn btn-secondary" onClick={handleDownloadBackup}>
              <Download size={16} />
              <span>Download Full Backup (JSON)</span>
            </button>
          </div>

          <div className="import-box" style={{ marginTop: '20px' }}>
            <label className="import-label">Restore Data from Backup:</label>
            <textarea
              className="textarea import-textarea"
              placeholder="Paste JSON backup text here..."
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
            />
            <div className="import-actions">
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleImportSubmit}
                disabled={!importJsonText.trim()}
              >
                <Upload size={14} />
                <span>Restore Backup</span>
              </button>
              {importStatus && <span className="status-msg">{importStatus}</span>}
            </div>
          </div>

          {/* Danger Zone: Reset */}
          <div className="danger-zone-box" style={{ marginTop: '30px' }}>
            <div className="danger-text">
              <AlertTriangle size={17} className="text-danger" />
              <span>Reset data to default Aïda starter pack</span>
            </div>
            {!showResetConfirm ? (
              <button
                className="btn btn-sm btn-ghost text-danger"
                onClick={() => setShowResetConfirm(true)}
              >
                Reset All Data
              </button>
            ) : (
              <div className="confirm-buttons-row">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  style={{ background: '#DC2626' }}
                  onClick={() => {
                    resetAllData();
                    setShowResetConfirm(false);
                  }}
                >
                  Confirm Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
