import React from 'react';
import {
  Settings,
  GraduationCap,
  Calendar,
  Inbox,
  Sparkles,
  LayoutDashboard,
  Layers,
  ChevronRight,
  Music,
  Quote,
  Clock,
  Calculator,
  CheckSquare,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CanvasSidebarProps {
  onOpenWidget: (type: 'calculator' | 'timer' | 'music' | 'quotes' | 'notes' | 'checklist') => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const CanvasSidebar: React.FC<CanvasSidebarProps> = ({
  onOpenWidget,
  activeNav,
  onSelectNav,
  onSelectCourse
}) => {
  const { tasks, settings } = useApp();
  const inboxCount = tasks.filter(t => t.spaceId === 'inbox' && t.status !== 'completed').length;

  const coursesList = [
    { id: 'anlt-410', code: 'Fall 2026 ANLT 410', name: 'Predictive Analytics', dotColor: '#C5B2DC' },
    { id: 'cs-python', code: 'Fall 2026 CS-Python', name: 'Python Practice', dotColor: '#E9FFA3' },
    { id: 'tennis', code: 'Fall 2026 ATHL-Tennis', name: 'Varsity Tennis', dotColor: '#10B981' },
    { id: 'busa-380', code: 'Fall 2026 BUSA 380', name: 'Business Analytics', dotColor: '#F59E0B' },
    { id: 'is-330', code: 'Fall 2026 IS 330', name: 'Systems Analysis', dotColor: '#818CF8' },
    { id: 'creative', code: 'Fall 2026 Media Lab', name: 'Im’s Adventures', dotColor: '#F43F5E' }
  ];

  return (
    <aside className="canvas-sidebar">
      {/* Top Header: Brand Logo & User Avatar */}
      <div className="sidebar-top-branding">
        <div className="brand-badge-container">
          <div className="brand-badge-box">
            <span className="brand-monogram">IF</span>
          </div>
          <span className="badge-notification-count">1</span>
        </div>
        <div className="user-avatar-circle" title="Aïda Garba (Fall 2026)">
          <span className="user-initials">AG</span>
        </div>
      </div>

      {/* Widgets Section Header & 2x3 Grid */}
      <div className="sidebar-section-container">
        <div className="sidebar-section-header">
          <span className="section-label">Widgets</span>
          <button
            className="btn-section-icon"
            onClick={() => onOpenWidget('notes')}
            title="Widget Preferences"
          >
            <Settings size={13} />
          </button>
        </div>

        {/* 2x3 Grid matching laptop screen */}
        <div className="sidebar-widgets-grid">
          <button
            className="widget-grid-btn"
            onClick={() => onOpenWidget('calculator')}
            title="Calculator"
          >
            <span className="widget-num-icon">8</span>
          </button>
          <button
            className="widget-grid-btn"
            onClick={() => onOpenWidget('timer')}
            title="Focus Timer"
          >
            <Clock size={16} />
          </button>
          <button
            className="widget-grid-btn"
            onClick={() => onOpenWidget('music')}
            title="Study Soundscapes"
          >
            <Music size={16} />
          </button>
          <button
            className="widget-grid-btn"
            onClick={() => onOpenWidget('quotes')}
            title="Flow Affirmations"
          >
            <Quote size={16} />
          </button>
          <button
            className="widget-grid-btn"
            onClick={() => onOpenWidget('notes')}
            title="Scratchpad Notes"
          >
            <FileText size={16} />
          </button>
          <button
            className="widget-grid-btn"
            onClick={() => onOpenWidget('checklist')}
            title="Daily Habits"
          >
            <CheckSquare size={16} />
          </button>
        </div>
      </div>

      {/* Pages Navigation */}
      <div className="sidebar-section-container">
        <div className="sidebar-section-header">
          <span className="section-label">Pages</span>
        </div>

        <nav className="sidebar-pages-nav">
          <button
            className={`page-nav-pill ${activeNav === 'today' || activeNav === 'dashboard' ? 'active' : ''}`}
            onClick={() => onSelectNav('today')}
            title="Aïda's Personal Life Space"
          >
            <span style={{ fontSize: '0.9rem' }}>🍸</span>
            <span>ay’s space</span>
          </button>

          <button
            className={`page-nav-pill ${activeNav === 'learning' || activeNav === 'courses' ? 'active' : ''}`}
            onClick={() => onSelectNav('learning')}
            title="Courses & Learning LMS"
          >
            <GraduationCap size={15} />
            <span>Courses</span>
          </button>

          <button
            className={`page-nav-pill ${activeNav === 'calendar' ? 'active' : ''}`}
            onClick={() => onSelectNav('calendar')}
          >
            <Calendar size={15} />
            <span>Calendar</span>
          </button>

          <button
            className={`page-nav-pill ${activeNav === 'inbox' ? 'active' : ''}`}
            onClick={() => onSelectNav('inbox')}
          >
            <Inbox size={15} />
            <span>Inbox</span>
            {inboxCount > 0 && <span className="nav-inbox-pill">{inboxCount}</span>}
          </button>

          <button
            className={`page-nav-pill ${activeNav === 'spaces' ? 'active' : ''}`}
            onClick={() => onSelectNav('spaces')}
          >
            <Layers size={15} />
            <span>Spaces</span>
          </button>

          <button
            className={`page-nav-pill ${activeNav === 'review' ? 'active' : ''}`}
            onClick={() => onSelectNav('review')}
            title="Sunday Reset & Weekly Review"
          >
            <Sparkles size={15} />
            <span>Sunday Reset</span>
          </button>

          <button
            className={`page-nav-pill ${activeNav === 'settings' ? 'active' : ''}`}
            onClick={() => onSelectNav('settings')}
          >
            <Settings size={15} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Courses List Section */}
      <div className="sidebar-section-container sidebar-courses-section">
        <div className="sidebar-section-header">
          <span className="section-label">Courses</span>
          <ChevronRight size={13} className="header-chevron" />
        </div>

        <div className="sidebar-courses-list">
          {coursesList.map(course => (
            <button
              key={course.id}
              className="course-list-row"
              onClick={() => onSelectCourse(course.id)}
            >
              <div className="course-code-wrap">
                <span
                  className="course-dot-indicator"
                  style={{ backgroundColor: course.dotColor }}
                ></span>
                <span className="course-code-text">{course.code}</span>
              </div>
              <ChevronRight size={12} className="course-row-chevron" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
