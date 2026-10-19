import React from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import { CanvasDashboard } from './components/CanvasDashboard/CanvasDashboard';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { TodayView } from './components/TodayView/TodayView';
import { InboxView } from './components/InboxView/InboxView';
import { CalendarView } from './components/CalendarView/CalendarView';
import { SpacesView } from './components/SpacesView/SpacesView';
import { SundayResetView } from './components/SundayResetView/SundayResetView';
import { SettingsView } from './components/SettingsView/SettingsView';
import { QuickCaptureModal } from './components/QuickCaptureModal';
import { TaskCard } from './components/TaskCard';

const DashboardSwitch: React.FC = () => {
  const { activeTab, setActiveTab, searchQuery, tasks, courses, projects } = useApp();

  // If search query is present, show instant global search results
  if (searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase();
    const matchedTasks = tasks.filter(
      t =>
        t.title.toLowerCase().includes(q) ||
        t.courseOrProjectName?.toLowerCase().includes(q) ||
        t.nextStep?.toLowerCase().includes(q) ||
        t.notes?.toLowerCase().includes(q)
    );
    const matchedCourses = courses.filter(
      c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
    const matchedProjects = projects.filter(
      p => p.name.toLowerCase().includes(q) || p.goal.toLowerCase().includes(q)
    );

    return (
      <div className="canvas-dashboard-layout">
        <main className="canvas-main-viewport" style={{ padding: '32px' }}>
          <div className="canvas-dashboard-header">
            <div>
              <h2 className="canvas-main-title">Search Results for "{searchQuery}"</h2>
              <p className="section-caption">
                Found {matchedTasks.length} tasks, {matchedCourses.length} courses, {matchedProjects.length} projects
              </p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveTab('today')}
            >
              Back to Dashboard
            </button>
          </div>

          {matchedCourses.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 className="section-subheading">Courses</h3>
              <div className="canvas-three-column-grid">
                {matchedCourses.map(c => (
                  <div key={c.id} className="canvas-course-card" style={{ padding: '16px' }}>
                    <span className="badge badge-school" style={{ width: 'fit-content' }}>{c.code}</span>
                    <h4 className="card-course-title" style={{ marginTop: '8px' }}>{c.name}</h4>
                    <p className="card-course-code">{c.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h3 className="section-subheading">Tasks & Actions</h3>
          <div className="tasks-list-stack">
            {matchedTasks.map(t => (
              <TaskCard key={t.id} task={t} />
            ))}
            {matchedTasks.length === 0 && matchedCourses.length === 0 && (
              <div className="empty-due-box" style={{ padding: '24px' }}>
                <p>No matches found for "{searchQuery}". Try a different keyword.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Primary Default View: Exact recreation of the laptop screen dashboard!
  if (activeTab === 'today') {
    return <CanvasDashboard />;
  }

  // Alternate views (Inbox, Calendar, Spaces, Reset, Settings) with navigation
  return (
    <div className="app-shell">
      <Header />
      <div className="app-layout">
        <Navigation />
        <main className="main-wrapper">
          <div className="page-container">
            {activeTab === 'inbox' && <InboxView />}
            {activeTab === 'calendar' && <CalendarView />}
            {activeTab === 'spaces' && <SpacesView />}
            {activeTab === 'review' && <SundayResetView />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <DashboardSwitch />
      {/* Global Quick Capture Modal accessible via + New Assignment */}
      <QuickCaptureModal />
    </AppProvider>
  );
};

export default App;
