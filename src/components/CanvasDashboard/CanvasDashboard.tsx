import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { CanvasSidebar } from './CanvasSidebar';
import { CanvasCourseCard, CourseCardData } from './CanvasCourseCard';
import { CanvasTodoPanel } from './CanvasTodoPanel';
import { WidgetModals } from './WidgetModals';
import { useApp } from '../../context/AppContext';

export const CanvasDashboard: React.FC = () => {
  const { setActiveTab, setActiveSpaceTab, setIsQuickCaptureOpen } = useApp();

  const [activeWidgetModal, setActiveWidgetModal] = useState<
    'calculator' | 'timer' | 'music' | 'quotes' | 'notes' | 'checklist' | null
  >(null);

  // Six Imflow courses matching the 3-column 2-row laptop screen structure
  const [coursesData, setCoursesData] = useState<CourseCardData[]>([
    {
      id: 'anlt-410',
      title: 'Predictive Analytics',
      code: 'Fall 2026 ANLT 410-01 • Dr. Vance',
      semester: 'Fall 2026',
      scoreBadge: '94.8%',
      titleColor: '#3730A3',
      bannerGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
      bannerSvgType: 'spectrogram',
      dueItems: [
        { id: 'due-1', title: 'Milestone 2: Model Evaluation', date: '10/23' },
        { id: 'due-2', title: 'Ch 3: Regression Diagnostics Quiz', date: '10/27' },
        { id: 'due-3', title: 'Ch 4: ROC & Precision Curve', date: '11/02' },
        { id: 'due-4', title: 'Ch 5: Final Term Project Draft', date: '11/10' }
      ]
    },
    {
      id: 'cs-python',
      title: 'Python Habit Practice',
      code: 'Fall 2026 CS-Skill • 60m Daily',
      semester: 'Fall 2026',
      scoreBadge: '100% Protected',
      titleColor: '#065F46',
      bannerGradient: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
      bannerSvgType: 'matrix',
      dueItems: [
        { id: 'due-5', title: 'Pandas Groupby & Lambdas', date: 'Today' },
        { id: 'due-6', title: 'Window Functions Challenge', date: 'Tomorrow' },
        { id: 'due-7', title: 'LeetCode Medium #184 Practice', date: '10/24' },
        { id: 'due-8', title: 'Time Series Resampling Lab', date: '10/28' }
      ]
    },
    {
      id: 'tennis',
      title: 'Varsity Tennis Team',
      code: 'Fall 2026 ATHL-Tennis • Court 1 & 2',
      semester: 'Fall 2026',
      scoreBadge: 'Match Ready',
      titleColor: '#047857',
      bannerGradient: 'linear-gradient(135deg, #022C22 0%, #047857 100%)',
      bannerSvgType: 'tennis',
      dueItems: [
        { id: 'due-9', title: 'Team Practice & Match Prep', date: '4:00 PM' },
        { id: 'due-10', title: 'Racket String Tension Check', date: 'Today' },
        { id: 'due-11', title: 'Weekly Match vs State', date: '10/25' },
        { id: 'due-12', title: 'Foam Rolling & Recovery', date: 'Daily' }
      ]
    },
    {
      id: 'busa-380',
      title: 'Business Analytics',
      code: 'Fall 2026 BUSA 380-02 • Prof. Reynolds',
      semester: 'Fall 2026',
      scoreBadge: '96.7%',
      titleColor: '#6B21A8',
      bannerGradient: 'linear-gradient(135deg, #3B0764 0%, #581C87 100%)',
      bannerSvgType: 'architecture',
      dueItems: [
        { id: 'due-13', title: 'Executive KPI Case Study', date: '10/24' },
        { id: 'due-14', title: 'Data Pipeline Architecture Quiz', date: '10/29' },
        { id: 'due-15', title: 'Executive Dashboard Review', date: '11/05' }
      ]
    },
    {
      id: 'is-330',
      title: 'Systems Analysis & Design',
      code: 'Fall 2026 IS 330-01 • Dr. Mensah',
      semester: 'Fall 2026',
      scoreBadge: '91.0%',
      titleColor: '#1E3A8A',
      bannerGradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
      bannerSvgType: 'blueprint',
      dueItems: [
        { id: 'due-16', title: 'Agile Sprint User Stories', date: '10/26' },
        { id: 'due-17', title: 'UML Sequence Diagrams', date: '11/02' },
        { id: 'due-18', title: 'ER Model Normalization', date: '11/08' }
      ]
    },
    {
      id: 'creative',
      title: 'Im’s Adventures & Media',
      code: 'Fall 2026 Creative Lab • Reel & YouTube',
      semester: 'Fall 2026',
      scoreBadge: 'In Production',
      titleColor: '#9F1239',
      bannerGradient: 'linear-gradient(135deg, #881337 0%, #9F1239 100%)',
      bannerSvgType: 'media',
      dueItems: [
        { id: 'due-19', title: 'Campus Tour Reel Voiceover', date: '10/22' },
        { id: 'due-20', title: 'ROC Curves Demystified Draft', date: '10/26' },
        { id: 'due-21', title: 'Student-Athlete Episode Export', date: '10/30' }
      ]
    }
  ]);

  const handleToggleDueItem = (courseId: string, itemId: string) => {
    setCoursesData(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          return {
            ...c,
            dueItems: c.dueItems.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          };
        }
        return c;
      })
    );
  };

  const handleOpenCourse = (courseId: string) => {
    setActiveTab('spaces');
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
    if (nav === 'dashboard') setActiveTab('today');
    else if (nav === 'courses') {
      setActiveTab('spaces');
      setActiveSpaceTab('school');
    } else if (nav === 'calendar') setActiveTab('calendar');
    else if (nav === 'inbox') setActiveTab('inbox');
    else if (nav === 'spaces') setActiveTab('spaces');
    else if (nav === 'settings') setActiveTab('settings');
  };

  return (
    <div className="canvas-dashboard-layout">
      {/* 1. Compact Left Sidebar */}
      <CanvasSidebar
        activeNav="dashboard"
        onOpenWidget={type => setActiveWidgetModal(type)}
        onSelectNav={handleSelectNav}
        onSelectCourse={handleOpenCourse}
      />

      {/* 2. Main Center 3-Column Course Grid Area */}
      <main className="canvas-main-viewport">
        {/* Main Dashboard Header */}
        <div className="canvas-dashboard-header">
          <h2 className="canvas-main-title">Dashboard</h2>
          <button className="canvas-main-menu-btn" title="Dashboard View Options">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* 3-Column x 2-Row Course Cards Grid */}
        <div className="canvas-three-column-grid">
          {coursesData.map(course => (
            <CanvasCourseCard
              key={course.id}
              course={course}
              onOpenDetails={handleOpenCourse}
              onToggleDueItem={handleToggleDueItem}
            />
          ))}
        </div>
      </main>

      {/* 3. Right-Hand To-Do Panel */}
      <CanvasTodoPanel
        onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
        onOpenTimer={() => setActiveWidgetModal('timer')}
        onOpenReminders={() => setActiveWidgetModal('checklist')}
        onOpenMusic={() => setActiveWidgetModal('music')}
      />

      {/* Interactive Widget Modals */}
      <WidgetModals
        type={activeWidgetModal}
        onClose={() => setActiveWidgetModal(null)}
      />
    </div>
  );
};
