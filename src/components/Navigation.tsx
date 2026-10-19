import React from 'react';
import {
  Sun,
  Inbox,
  Calendar,
  Layers,
  RotateCcw,
  Settings,
  GraduationCap,
  Code2,
  Activity,
  Briefcase,
  Video,
  Heart
} from 'lucide-react';
import { useApp, MainTab } from '../context/AppContext';
import { SpaceId } from '../types';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, activeSpaceTab, setActiveSpaceTab, tasks } = useApp();

  const inboxCount = tasks.filter(t => t.spaceId === 'inbox' && t.status !== 'completed').length;
  const todayCount = tasks.filter(t => t.isChosenPriority && t.status !== 'completed').length;

  const navItems: { id: MainTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'today', label: 'Today', icon: <Sun size={19} />, badge: todayCount },
    { id: 'inbox', label: 'Inbox', icon: <Inbox size={19} />, badge: inboxCount },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={19} /> },
    { id: 'spaces', label: 'Spaces', icon: <Layers size={19} /> },
    { id: 'review', label: 'Reset & Recap', icon: <RotateCcw size={19} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={19} /> }
  ];

  const subSpaces: { id: SpaceId; label: string; icon: React.ReactNode }[] = [
    { id: 'school', label: 'School & Courses', icon: <GraduationCap size={16} /> },
    { id: 'learning', label: 'Python & Skills', icon: <Code2 size={16} /> },
    { id: 'tennis', label: 'Tennis & Movement', icon: <Activity size={16} /> },
    { id: 'projects', label: 'Projects & Career', icon: <Briefcase size={16} /> },
    { id: 'content', label: 'Im’s Adventures', icon: <Video size={16} /> },
    { id: 'life', label: 'Life & Routines', icon: <Heart size={16} /> }
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="app-sidebar">
        <div className="sidebar-nav-list">
          <div className="sidebar-group-label">Daily Loop</div>
          {navItems.slice(0, 3).map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-btn-icon">{item.icon}</span>
              <span className="nav-btn-label">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="nav-btn-badge">{item.badge}</span>
              )}
            </button>
          ))}

          <div className="sidebar-group-label" style={{ marginTop: '24px' }}>
            Life Areas & Spaces
          </div>
          <button
            className={`sidebar-nav-btn ${activeTab === 'spaces' ? 'active' : ''}`}
            onClick={() => setActiveTab('spaces')}
          >
            <span className="nav-btn-icon">
              <Layers size={19} />
            </span>
            <span className="nav-btn-label">All Spaces</span>
          </button>

          {/* Sub-spaces quick links */}
          <div className="sidebar-subspaces-list">
            {subSpaces.map(space => (
              <button
                key={space.id}
                className={`sidebar-subspace-btn ${
                  activeTab === 'spaces' && activeSpaceTab === space.id ? 'active' : ''
                }`}
                onClick={() => {
                  setActiveTab('spaces');
                  setActiveSpaceTab(space.id);
                }}
              >
                <span className="subspace-icon">{space.icon}</span>
                <span className="subspace-label">{space.label}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-group-label" style={{ marginTop: '24px' }}>
            Reflect & Maintain
          </div>
          {navItems.slice(4).map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-btn-icon">{item.icon}</span>
              <span className="nav-btn-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Sidebar Footer Insight */}
        <div className="sidebar-footer-card">
          <div className="footer-card-quote">
            “Discipline over motivation. Protect the practice, let the rest flow.”
          </div>
          <div className="footer-card-author">Aïda’s Flow Principle</div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`mobile-nav-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="mobile-icon-wrapper">
              {item.icon}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="mobile-badge-dot"></span>
              )}
            </span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
