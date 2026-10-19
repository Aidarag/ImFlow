import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Droplets,
  Moon,
  Sun,
  BatteryCharging,
  Plus,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    settings,
    updateSettings,
    hydration,
    logHydration,
    toggleLowEnergyMode,
    setIsQuickCaptureOpen,
    searchQuery,
    setSearchQuery,
    skills
  } = useApp();

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const pythonSkill = skills.find(s => s.skillName === 'Python');
  const pythonPercent = Math.min(
    100,
    Math.round(((pythonSkill?.completedMinutesToday || 0) / (settings.protectedPythonMinutes || 60)) * 100)
  );

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Left: Branding & Greeting */}
        <div className="header-brand-section">
          <div className="brand-logo-container">
            <div className="brand-logo-glow"></div>
            <div className="brand-logo-icon">
              <Sparkles size={20} className="sparkle-svg" />
            </div>
            <div>
              <div className="brand-title-row">
                <h1 className="brand-name">ImFlow</h1>
                <span className="brand-tag">v1.0</span>
              </div>
              <p className="brand-sub">For Aïda Garba • {settings.semester}</p>
            </div>
          </div>
        </div>

        {/* Center: Search & Command Quick Bar */}
        <div className="header-center-section">
          <div className="search-bar-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks, courses, tennis, projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Right: Quick Actions & Status Widgets */}
        <div className="header-actions-section">
          {/* Quick Date/Time */}
          <div className="datetime-badge">
            <span className="date-str">{currentDate}</span>
            <span className="time-str">{currentTime}</span>
          </div>

          {/* Quick Hydration Widget */}
          <div className="quick-widget hydration-widget" title="1-Tap Water Logger">
            <div className="widget-icon-btn" onClick={() => logHydration()}>
              <Droplets size={16} className="water-drop-icon" />
              <span className="widget-value">{hydration.currentMl}ml</span>
            </div>
            <button
              className="quick-water-plus"
              onClick={() => logHydration()}
              title="Add 250ml water"
            >
              +
            </button>
          </div>

          {/* Python Protected Status */}
          <div
            className="quick-widget python-widget"
            title={`Protected Python: ${pythonSkill?.completedMinutesToday || 0}/${settings.protectedPythonMinutes} min`}
          >
            <Flame size={15} className="python-flame-icon" />
            <div className="progress-mini-bar">
              <div
                className="progress-mini-fill"
                style={{ width: `${pythonPercent}%` }}
              ></div>
            </div>
            <span className="widget-value">{pythonSkill?.completedMinutesToday || 0}m</span>
          </div>

          {/* Low Energy Mode Toggle */}
          <button
            className={`btn-toggle-energy ${settings.isLowEnergyMode ? 'active' : ''}`}
            onClick={toggleLowEnergyMode}
            title={
              settings.isLowEnergyMode
                ? 'Low-Energy View Active: showing only essentials & 1 next step'
                : 'Switch to Low-Energy View'
            }
          >
            <BatteryCharging size={16} />
            <span className="toggle-label">
              {settings.isLowEnergyMode ? 'Low-Energy' : 'Normal'}
            </span>
          </button>

          {/* Dark/Light Toggle */}
          <button
            className="btn-theme-toggle"
            onClick={() =>
              updateSettings({
                theme: settings.theme === 'dark' ? 'light' : 'dark'
              })
            }
            title="Toggle Light / Dark mode"
          >
            {settings.theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Quick Capture Button */}
          <button
            className="btn btn-primary btn-quick-capture"
            onClick={() => setIsQuickCaptureOpen(true)}
            title="Quick Capture (Capture thought or brain dump)"
          >
            <Plus size={18} />
            <span className="capture-text">Capture</span>
          </button>
        </div>
      </div>
    </header>
  );
};
