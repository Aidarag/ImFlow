import React, { useState } from 'react';
import './App.css';
import { AppProvider, useApp, MainTab } from './context/AppContext';
import { CanvasSidebar } from './components/CanvasDashboard/CanvasSidebar';
import { PersonalSpaceView } from './components/PersonalSpaceView/PersonalSpaceView';
import { CanvasDashboard } from './components/CanvasDashboard/CanvasDashboard';
import { InboxView } from './components/InboxView/InboxView';
import { CalendarView } from './components/CalendarView/CalendarView';
import { SpacesView } from './components/SpacesView/SpacesView';
import { SundayResetView } from './components/SundayResetView/SundayResetView';
import { SettingsView } from './components/SettingsView/SettingsView';
import { WidgetModals } from './components/CanvasDashboard/WidgetModals';
import { QuickCaptureModal } from './components/QuickCaptureModal';
import { TaskCard } from './components/TaskCard';

const DashboardSwitch: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setActiveSpaceTab,
    searchQuery,
    setSearchQuery,
    tasks,
    courses,
    projects,
    setIsQuickCaptureOpen
  } = useApp();

  const [activeWidgetModal, setActiveWidgetModal] = useState<
    'calculator' | 'timer' | 'music' | 'quotes' | 'notes' | 'checklist' | null
  >(null);

  const handleOpenCourse = (courseId: string) => {
    setActiveTab('learning');
    if (courseId === 'anlt-410' || courseId === 'busa-380' || courseId === 'is-330') {
      setActiveSpaceTab('school');
    } else if (courseId === 'cs-python') {
      setActiveSpaceTab('learning');
    } else if (courseId === 'tennis') {
      setActiveSpaceTab('tennis');
    } else if (courseId === 'creative') {
      setActiveSpaceTab('content');
    }
  };

  const handleSelectNav = (nav: string) => {
    if (nav === 'today' || nav === 'dashboard') setActiveTab('today');
    else if (nav === 'learning' || nav === 'courses') setActiveTab('learning');
    else if (nav === 'calendar') setActiveTab('calendar');
    else if (nav === 'inbox') setActiveTab('inbox');
    else if (nav === 'spaces') setActiveTab('spaces');
    else if (nav === 'review') setActiveTab('review');
    else if (nav === 'settings') setActiveTab('settings');
  };

  return (
    <div className="canvas-dashboard-layout">
      {/* 1. Persistent Compact Left Sidebar with 3x2 Widget Grid */}
      <CanvasSidebar
        activeNav={activeTab}
        onOpenWidget={type => setActiveWidgetModal(type)}
        onSelectNav={handleSelectNav}
        onSelectCourse={handleOpenCourse}
      />

      {/* 2. Main View Body */}
      {searchQuery.trim().length > 0 ? (
        <main className="canvas-main-viewport" style={{ padding: '32px' }}>
          <div className="canvas-dashboard-header">
            <div>
              <h2 className="canvas-main-title">Search Results for "{searchQuery}"</h2>
              <p className="section-caption">
                Found {tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).length} tasks,{' '}
                {courses.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).length} courses
              </p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </button>
          </div>

          <div className="tasks-list-stack">
            {tasks
              .filter(
                t =>
                  t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.courseOrProjectName?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(t => (
                <TaskCard key={t.id} task={t} />
              ))}
          </div>
        </main>
      ) : activeTab === 'today' ? (
        /* Primary Homepage: Aïda's Personal Life Space matching user's new reference! */
        <PersonalSpaceView
          onNavigateToCourses={() => setActiveTab('learning')}
          onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
          onOpenNotes={() => setActiveWidgetModal('notes')}
        />
      ) : activeTab === 'learning' ? (
        /* Courses LMS View: 3-column Course Cards + Right-Hand To-Do Panel */
        <CanvasDashboard
          hideSidebar={true}
          onOpenWidgetModal={type => setActiveWidgetModal(type)}
        />
      ) : activeTab === 'calendar' ? (
        <main className="canvas-main-viewport">
          <CalendarView />
        </main>
      ) : activeTab === 'inbox' ? (
        <main className="canvas-main-viewport">
          <InboxView />
        </main>
      ) : activeTab === 'spaces' ? (
        <main className="canvas-main-viewport">
          <SpacesView />
        </main>
      ) : activeTab === 'review' ? (
        <main className="canvas-main-viewport">
          <SundayResetView />
        </main>
      ) : activeTab === 'settings' ? (
        <main className="canvas-main-viewport">
          <SettingsView />
        </main>
      ) : (
        <PersonalSpaceView
          onNavigateToCourses={() => setActiveTab('learning')}
          onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
          onOpenNotes={() => setActiveWidgetModal('notes')}
        />
      )}

      {/* Global Interactive Widget Modals */}
      <WidgetModals
        type={activeWidgetModal}
        onClose={() => setActiveWidgetModal(null)}
      />

      {/* Global Quick Capture Modal */}
      <QuickCaptureModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <DashboardSwitch />
    </AppProvider>
  );
};

export default App;
