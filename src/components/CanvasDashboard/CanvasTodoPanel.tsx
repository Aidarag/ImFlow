import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Bell,
  Clock,
  Volume2,
  Plus,
  CheckCircle2,
  Circle,
  MoreVertical,
  Calendar as CalIcon,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Task } from '../../types';

interface CanvasTodoPanelProps {
  onOpenQuickCapture: () => void;
  onOpenTimer: () => void;
  onOpenReminders: () => void;
  onOpenMusic: () => void;
}

export const CanvasTodoPanel: React.FC<CanvasTodoPanelProps> = ({
  onOpenQuickCapture,
  onOpenTimer,
  onOpenReminders,
  onOpenMusic
}) => {
  const { tasks, completeTask, reopenTask, logHydration } = useApp();

  const [periodTab, setPeriodTab] = useState<'day' | 'week' | 'month'>('week');
  const [isSectionOpen, setIsSectionOpen] = useState(true);

  // Week range label
  const [currentWeekLabel, setCurrentWeekLabel] = useState('October 19 – October 25');

  // Filter tasks for this week
  const activeTasks = tasks.filter(t => t.status !== 'inbox');
  const completedCount = activeTasks.filter(t => t.status === 'completed').length;
  const totalCount = activeTasks.length || 5;
  const progressPercent = Math.min(100, Math.round((completedCount / totalCount) * 100)) || 80;

  // SVG circular ring calculations
  const strokeWidth = 10;
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const dueThisWeekTasks = activeTasks.filter(t => t.status !== 'completed').slice(0, 4);

  return (
    <aside className="canvas-todo-panel">
      {/* Header: Todo Title & 3-dot menu */}
      <div className="todo-panel-header">
        <h3 className="todo-heading">Todo</h3>
        <button className="todo-header-menu-btn" title="Todo Settings">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Segmented Period Switcher (Day / Week / Month) */}
      <div className="todo-period-tabs">
        <button
          className={`period-tab-btn ${periodTab === 'day' ? 'active' : ''}`}
          onClick={() => setPeriodTab('day')}
        >
          Day
        </button>
        <button
          className={`period-tab-btn ${periodTab === 'week' ? 'active' : ''}`}
          onClick={() => setPeriodTab('week')}
        >
          Week
        </button>
        <button
          className={`period-tab-btn ${periodTab === 'month' ? 'active' : ''}`}
          onClick={() => setPeriodTab('month')}
        >
          Month
        </button>
      </div>

      {/* Date Range Navigation Row (< Week >) */}
      <div className="todo-date-nav-row">
        <button className="date-nav-chevron-btn" title="Previous Week">
          <ChevronLeft size={16} />
        </button>
        <span className="date-range-text">{currentWeekLabel}</span>
        <button className="date-nav-chevron-btn" title="Next Week">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Course Filter Dropdown Row */}
      <div className="todo-filter-row">
        <span className="filter-label">All Courses</span>
        <ChevronRight size={14} className="filter-chevron" />
      </div>

      {/* Large Circular Progress Ring Widget */}
      {/* Concentric Progress Ring Widget matching laptop photo */}
      <div className="todo-progress-ring-card">
        <div className="svg-ring-container">
          <svg className="progress-ring-svg" width="144" height="144">
            {/* Outer concentric track */}
            <circle
              className="ring-track-circle"
              stroke="#F1F1F5"
              strokeWidth={8}
              fill="transparent"
              r={58}
              cx="72"
              cy="72"
            />
            {/* Outer Lime progress stroke */}
            <circle
              className="ring-progress-circle-outer"
              stroke="#E9FFA3"
              strokeWidth={8}
              strokeDasharray={2 * Math.PI * 58}
              strokeDashoffset={2 * Math.PI * 58 - (progressPercent / 100) * 2 * Math.PI * 58}
              strokeLinecap="round"
              fill="transparent"
              r={58}
              cx="72"
              cy="72"
            />

            {/* Inner concentric track */}
            <circle
              className="ring-track-circle-inner"
              stroke="#F4F4F8"
              strokeWidth={6}
              fill="transparent"
              r={44}
              cx="72"
              cy="72"
            />
            {/* Inner Lavender habit/focus progress stroke */}
            <circle
              className="ring-progress-circle-inner"
              stroke="#C5B2DC"
              strokeWidth={6}
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * 0.25}
              strokeLinecap="round"
              fill="transparent"
              r={44}
              cx="72"
              cy="72"
            />
          </svg>

          {/* Center text matching photo */}
          <div className="ring-center-content">
            <span className="ring-percentage">{progressPercent}%</span>
            <span className="ring-fraction">
              {completedCount || 4}/{totalCount || 5}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Quick Action Widget Buttons Below Progress Ring */}
      <div className="todo-quick-actions-row">
        <button
          className="todo-action-circle-btn"
          onClick={onOpenReminders}
          title="Notification Reminders"
        >
          <Bell size={16} />
        </button>
        <button
          className="todo-action-circle-btn"
          onClick={onOpenTimer}
          title="Start Focus Timer"
        >
          <Clock size={16} />
        </button>
        <button
          className="todo-action-circle-btn"
          onClick={onOpenMusic}
          title="Study Audio & Music"
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* Due This Week Section Accordion */}
      <div className="due-section-container">
        <div
          className="due-section-toggle-header"
          onClick={() => setIsSectionOpen(!isSectionOpen)}
        >
          <span className="due-section-title">
            Due this week ({dueThisWeekTasks.length})
          </span>
          {isSectionOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>

        {isSectionOpen && (
          <div className="due-tasks-stack">
            {dueThisWeekTasks.map(task => (
              <div key={task.id} className="due-task-card">
                <div className="due-task-top-tag">
                  <span className="course-code-pill">
                    {task.courseOrProjectName || 'ANLT-410'}
                  </span>
                </div>
                <div className="due-task-body">
                  <h5 className="due-task-title">{task.title}</h5>
                  <p className="due-task-time">
                    {task.deadline
                      ? `Due ${new Date(task.deadline).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric'
                        })} at 11:59pm (in 4 days)`
                      : 'Due this Friday at 11:59pm'}
                  </p>
                </div>
                <button
                  className="btn-task-check"
                  onClick={() => completeTask(task.id)}
                  title="Mark Complete"
                >
                  <CheckCircle2 size={16} />
                </button>
              </div>
            ))}

            {dueThisWeekTasks.length === 0 && (
              <div className="empty-due-box">
                <span>All assignments for this week are completed!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* + New Assignment Button matching photo */}
      <div className="new-assignment-btn-container">
        <button className="btn-new-assignment" onClick={onOpenQuickCapture}>
          <Plus size={15} />
          <span>+ New Assignment</span>
        </button>
      </div>

      {/* University Seal / Imflow Brand Badge matching photo */}
      <div className="todo-university-seal-badge">
        <div className="seal-tree-crest">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2">
            <path d="M12 2L4 7v6c0 5 3.5 9.5 8 10.5 4.5-1 8-5.5 8-10.5V7l-8-5z" fill="#E9FFA3" fillOpacity="0.4" />
            <path d="M12 7v10M9 11h6" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2" fill="#C5B2DC" />
          </svg>
        </div>
        <div className="seal-text-col">
          <span className="seal-univ-name">CAL STATE FULLERTON</span>
          <span className="seal-dept-name">IMFLOW • STUDENT-ATHLETE</span>
        </div>
      </div>

      {/* Recent Feedback Section matching photo */}
      <div className="recent-feedback-section">
        <div className="feedback-header">
          <MessageSquare size={13} className="feedback-icon" />
          <span className="feedback-label">Recent Feedback</span>
        </div>
        <div className="feedback-content-card">
          <p className="feedback-text">
            “Strong ROC curve & precision matrix on Milestone 1. Keep this methodology for Milestone 2.”
          </p>
          <span className="feedback-author">Dr. Vance • Predictive Analytics</span>
        </div>
      </div>
    </aside>
  );
};
