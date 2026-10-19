import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Lock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Flame,
  Activity,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FixedCommitment, Task } from '../../types';

export const CalendarView: React.FC = () => {
  const { fixedCommitments, tasks, updateTask, settings } = useApp();

  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [showRescheduleHelper, setShowRescheduleHelper] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState<'tennis_late' | 'missed_study'>('tennis_late');
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);

  const daysOfWeekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = new Date().getDay();

  // Commitments today
  const todaysFixed = fixedCommitments.filter(c => c.daysOfWeek.includes(todayIndex));

  // Planned tasks today
  const plannedTasksToday = tasks.filter(t => t.status !== 'completed' && t.status !== 'inbox');

  // Compute total planned minutes vs available free hours
  const totalPlannedMinutes = plannedTasksToday.reduce(
    (acc, t) => acc + (t.estimatedMinutes || 30),
    0
  );
  // Fixed minutes today:
  const fixedMinutes = todaysFixed.reduce((acc, c) => {
    const [startH, startM] = c.startTime.split(':').map(Number);
    const [endH, endM] = c.endTime.split(':').map(Number);
    const duration = (endH * 60 + endM) - (startH * 60 + startM);
    return acc + Math.max(0, duration) + (c.prepBufferMinutes || 0);
  }, 0);

  // Awake hours: 7:30 to 22:30 = 15 hours = 900 minutes. Free = 900 - fixed
  const availableFreeMinutes = Math.max(0, 900 - fixedMinutes);
  const isOverloaded = totalPlannedMinutes > availableFreeMinutes - 60; // 60 min buffer

  // "Practice ran late" auto-adjustment proposal
  const handleApplyReschedule = () => {
    // Moves lowest priority tasks to tomorrow without changing fixed commitments or deadlines
    const flexibleTasks = plannedTasksToday.filter(
      t => t.priority !== 'high' && !t.title.includes('Python')
    );
    if (flexibleTasks.length > 0) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      updateTask(flexibleTasks[0].id, {
        plannedDate: tomorrowStr,
        notes: `Rescheduled from today because tennis practice ran late. Original deadline preserved.`
      });
    }
    setRescheduleSuccess(true);
    setTimeout(() => {
      setShowRescheduleHelper(false);
      setRescheduleSuccess(false);
    }, 1800);
  };

  return (
    <div className="calendar-view animate-fade-in">
      {/* Top Bar with Mode Switcher & Reschedule Action */}
      <div className="section-header-row">
        <div>
          <h2 className="section-heading">Schedule & Commitments</h2>
          <p className="section-caption">
            Fixed commitments first: Varsity tennis, lectures, and protected Python study blocks.
          </p>
        </div>
        <div className="calendar-header-actions">
          <div className="view-mode-toggle glass-panel">
            <button
              className={`mode-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </button>
            <button
              className={`mode-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowRescheduleHelper(true)}
            title="Practice ran late or missed a study session"
          >
            <RotateCcw size={14} />
            <span>Schedule Shift Assistant</span>
          </button>
        </div>
      </div>

      {/* Overload Warning Notice */}
      {isOverloaded && (
        <div className="glass-panel overload-warning-banner">
          <AlertTriangle size={20} className="warning-icon" />
          <div className="warning-text-group">
            <h4 className="warning-heading">Capacity Alert: Schedule is Overpacked</h4>
            <p className="warning-body">
              You have {Math.round(totalPlannedMinutes / 60)}h of planned work alongside {Math.round(fixedMinutes / 60)}h of fixed classes & tennis. We recommend reducing flexible work or shifting 1 task to avoid burnout.
            </p>
          </div>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowRescheduleHelper(true)}
          >
            Rebalance Today
          </button>
        </div>
      )}

      {/* Reschedule Helper Drawer / Modal */}
      {showRescheduleHelper && (
        <div className="modal-backdrop">
          <div className="modal-card glass-panel-elevated">
            <h3 className="modal-title">Schedule Shift Assistant</h3>
            <p className="modal-desc">
              When tennis runs late or energy fluctuates, adjust flexible tasks without touching fixed appointments or assignment deadlines.
            </p>

            <div className="reschedule-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="reason"
                  checked={rescheduleReason === 'tennis_late'}
                  onChange={() => setRescheduleReason('tennis_late')}
                />
                <div>
                  <strong>Tennis practice / match ran late (+45 min)</strong>
                  <p className="text-secondary" style={{ fontSize: '0.82rem' }}>
                    Protects rest and moves 1 flexible task to tomorrow. Keeps assignment deadlines intact.
                  </p>
                </div>
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  name="reason"
                  checked={rescheduleReason === 'missed_study'}
                  onChange={() => setRescheduleReason('missed_study')}
                />
                <div>
                  <strong>Missed study session / need recovery break</strong>
                  <p className="text-secondary" style={{ fontSize: '0.82rem' }}>
                    Re-slots protected Python time to the evening quiet window.
                  </p>
                </div>
              </label>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowRescheduleHelper(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleApplyReschedule}>
                {rescheduleSuccess ? (
                  <>
                    <Check size={16} />
                    <span>Plan Adjusted Safely!</span>
                  </>
                ) : (
                  <span>Propose & Apply Safe Shift</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Day View */}
      {viewMode === 'day' ? (
        <div className="day-schedule-layout">
          {/* Left Column: Fixed Commitments Locked Schedule */}
          <div className="schedule-column">
            <div className="column-header">
              <h3 className="column-title">Fixed Commitments Today</h3>
              <span className="badge badge-tennis">Protected Blocks</span>
            </div>

            <div className="timeline-stack">
              {todaysFixed.map(fix => (
                <div
                  key={fix.id}
                  className={`timeline-block glass-panel ${
                    fix.type === 'tennis' ? 'tennis-block' : 'class-block'
                  }`}
                >
                  <div className="block-time-badge">
                    <Clock size={13} />
                    <span>
                      {fix.startTime} – {fix.endTime}
                    </span>
                  </div>
                  <div className="block-details">
                    <div className="block-title-row">
                      <h4 className="block-title">{fix.title}</h4>
                      {fix.isLocked && (
                        <span title="Locked commitment">
                          <Lock size={14} className="lock-icon" />
                        </span>
                      )}
                    </div>
                    {fix.location && (
                      <p className="block-location">📍 {fix.location}</p>
                    )}
                    {fix.prepBufferMinutes && (
                      <p className="block-buffer">
                        Buffer: {fix.prepBufferMinutes}m travel & gear prep
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Protected Python Habit Slot */}
              <div className="timeline-block glass-panel python-protected-block">
                <div className="block-time-badge">
                  <Flame size={13} className="text-python" />
                  <span>11:45 – 12:45</span>
                </div>
                <div className="block-details">
                  <div className="block-title-row">
                    <h4 className="block-title">Protected Python Learning Block</h4>
                    <span className="badge badge-python">60m Protected</span>
                  </div>
                  <p className="block-location">Quiet Library Study / Dorm Desk</p>
                  <p className="block-buffer">Non-negotiable skill practice time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Planned Tasks Squeezed Around Commitments */}
          <div className="schedule-column">
            <div className="column-header">
              <h3 className="column-title">Flexible Tasks Squeezed In</h3>
              <span className="badge badge-flow">Adaptive Flow</span>
            </div>

            <div className="timeline-stack">
              {plannedTasksToday.map(task => (
                <div key={task.id} className="timeline-block glass-panel task-timeline-card">
                  <div className="block-time-badge">
                    <Clock size={13} />
                    <span>{task.plannedTime || 'Flexible'} • {task.estimatedMinutes || 30}m</span>
                  </div>
                  <div className="block-details">
                    <h4 className="block-title">{task.title}</h4>
                    {task.nextStep && (
                      <p className="block-location">Step: {task.nextStep}</p>
                    )}
                    {task.deadline && (
                      <span className="badge badge-school" style={{ marginTop: '6px' }}>
                        Deadline: {new Date(task.deadline).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Week View Grid */
        <div className="week-grid-container glass-panel">
          <div className="week-columns-row">
            {daysOfWeekLabels.map((dayLabel, idx) => {
              const isToday = idx === todayIndex;
              const dayFixed = fixedCommitments.filter(c => c.daysOfWeek.includes(idx));

              return (
                <div key={dayLabel} className={`week-day-col ${isToday ? 'current-day' : ''}`}>
                  <div className="week-col-header">
                    <span className="day-name">{dayLabel}</span>
                    {isToday && <span className="today-dot"></span>}
                  </div>
                  <div className="week-events-list">
                    {dayFixed.map(fix => (
                      <div
                        key={fix.id}
                        className={`week-event-pill ${
                          fix.type === 'tennis' ? 'pill-tennis' : 'pill-class'
                        }`}
                        title={`${fix.title} (${fix.startTime} - ${fix.endTime})`}
                      >
                        <span className="pill-time">{fix.startTime}</span>
                        <span className="pill-title">{fix.title}</span>
                      </div>
                    ))}

                    {/* Python reminder on weekdays */}
                    {idx >= 1 && idx <= 5 && (
                      <div className="week-event-pill pill-python" title="Protected Python (60m)">
                        <span className="pill-time">Study</span>
                        <span className="pill-title">Python 60m</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
