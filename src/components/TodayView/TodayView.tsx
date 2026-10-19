import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Activity,
  Sparkles,
  Droplets,
  BookmarkPlus,
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Zap,
  BatteryCharging
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TaskCard } from '../TaskCard';
import { Task } from '../../types';

export const TodayView: React.FC = () => {
  const {
    tasks,
    fixedCommitments,
    settings,
    toggleLowEnergyMode,
    hydration,
    logHydration,
    undoHydration,
    lastActiveTask,
    routines,
    toggleRoutine,
    setIsQuickCaptureOpen,
    skills,
    recordSkillPracticeSession
  } = useApp();

  const [showMoreTasks, setShowMoreTasks] = useState(false);
  const [activeFocusTask, setActiveFocusTask] = useState<Task | null>(null);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Focus timer interval
  React.useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setFocusSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStartFocus = (task: Task) => {
    setActiveFocusTask(task);
    setFocusSeconds(0);
    setIsTimerRunning(true);
  };

  const handleStopFocus = () => {
    setIsTimerRunning(false);
    if (activeFocusTask && activeFocusTask.spaceId === 'learning') {
      const minutes = Math.max(1, Math.round(focusSeconds / 60));
      const pythonSkill = skills.find(s => s.skillName === 'Python');
      if (pythonSkill) {
        recordSkillPracticeSession(
          pythonSkill.id,
          minutes,
          activeFocusTask.stoppingPoint || 'Session completed',
          activeFocusTask.nextStep || 'Next practice question'
        );
      }
    }
  };

  // Find next upcoming commitment today
  const todayDayIndex = new Date().getDay();
  const nextCommitment = fixedCommitments.find(c => c.daysOfWeek.includes(todayDayIndex)) || fixedCommitments[0];

  // Priorities: up to 3 chosen priorities
  const chosenPriorities = tasks.filter(t => t.isChosenPriority && t.status !== 'completed');
  const otherTasks = tasks.filter(
    t => (!t.isChosenPriority || t.status === 'completed') && t.status !== 'inbox'
  );

  // Low energy view: only essential commitments + 1 single manageable action
  const lowEnergyTask = chosenPriorities[0] || tasks.find(t => t.status !== 'completed') || null;

  return (
    <div className="today-view animate-fade-in">
      {/* Low-Energy Banner (if enabled) */}
      {settings.isLowEnergyMode && (
        <div className="low-energy-banner glass-panel">
          <div className="low-energy-content">
            <BatteryCharging size={20} className="low-energy-icon" />
            <div>
              <h4 className="low-energy-title">Low-Energy View Active</h4>
              <p className="low-energy-desc">
                Everything else is preserved safely. Today is about protecting your rest, your essential commitment, and taking just one small step.
              </p>
            </div>
          </div>
          <button className="btn btn-sm btn-secondary" onClick={toggleLowEnergyMode}>
            Switch to Normal View
          </button>
        </div>
      )}

      {/* Focus Timer Bar (When active) */}
      {activeFocusTask && (
        <div className="focus-session-bar glass-panel-elevated">
          <div className="focus-left">
            <div className="pulse-indicator"></div>
            <div>
              <span className="focus-label">Active Focus Session:</span>
              <span className="focus-title">{activeFocusTask.title}</span>
            </div>
          </div>
          <div className="focus-center">
            <span className="focus-timer-digits">
              {String(Math.floor(focusSeconds / 60)).padStart(2, '0')}:
              {String(focusSeconds % 60).padStart(2, '0')}
            </span>
          </div>
          <div className="focus-actions">
            {isTimerRunning ? (
              <button className="btn btn-sm btn-secondary" onClick={() => setIsTimerRunning(false)}>
                Pause
              </button>
            ) : (
              <button className="btn btn-sm btn-primary" onClick={() => setIsTimerRunning(true)}>
                Resume
              </button>
            )}
            <button className="btn btn-sm btn-tennis" onClick={handleStopFocus}>
              Conclude & Save Session
            </button>
          </div>
        </div>
      )}

      {/* Top Section Grid: Next Fixed Commitment + Returning / Restart Card */}
      <div className="today-top-grid">
        {/* Next Fixed Commitment Card */}
        {nextCommitment && (
          <div className="glass-panel next-commitment-card">
            <div className="card-pill-row">
              <span className="badge badge-tennis">Next Commitment</span>
              <span className="commitment-time">
                <Clock size={13} />
                {nextCommitment.startTime} – {nextCommitment.endTime}
              </span>
            </div>
            <h3 className="commitment-title">{nextCommitment.title}</h3>
            <div className="commitment-meta-row">
              {nextCommitment.location && (
                <span className="meta-sub">📍 {nextCommitment.location}</span>
              )}
              {nextCommitment.prepBufferMinutes && (
                <span className="meta-sub">
                  ⚡ {nextCommitment.prepBufferMinutes}m travel/prep buffer protected
                </span>
              )}
            </div>
          </div>
        )}

        {/* Picking up where you stopped (Interruption Recovery Card) */}
        {lastActiveTask && (
          <div className="glass-panel restart-task-card">
            <div className="card-pill-row">
              <span className="badge badge-python">
                <BookmarkPlus size={12} />
                <span>Picking Up Where You Stopped</span>
              </span>
            </div>
            <h4 className="restart-task-title">{lastActiveTask.title}</h4>
            <div className="stopping-quote-box">
              <span className="quote-label">Saved Stopping Point:</span>
              <p className="quote-text">
                {lastActiveTask.stoppingPoint || 'In progress. Ready to continue next concrete action.'}
              </p>
            </div>
            {lastActiveTask.nextStep && (
              <div className="restart-next-step">
                <span className="next-label">Next Action:</span>
                <span className="next-text">{lastActiveTask.nextStep}</span>
              </div>
            )}
            <div className="restart-actions">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleStartFocus(lastActiveTask)}
              >
                <Play size={14} />
                <span>Resume This Step</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {settings.isLowEnergyMode ? (
        /* Low-Energy Simplified Layout */
        <div className="low-energy-focus-area">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Your One Manageable Action</h2>
              <p className="section-caption">
                No pressure to tackle the whole list. Complete this, hydrate, and rest.
              </p>
            </div>
          </div>
          {lowEnergyTask ? (
            <TaskCard task={lowEnergyTask} onStartFocus={handleStartFocus} />
          ) : (
            <div className="empty-state-card glass-panel">
              <CheckCircle size={28} className="text-tennis" />
              <p>All core actions for today are complete. Take a well-deserved rest!</p>
            </div>
          )}
        </div>
      ) : (
        /* Normal Standard Layout: Top 3 Priorities */
        <div className="today-priorities-section">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Today's Chosen Priorities</h2>
              <p className="section-caption">
                Focused top 3 tasks designed to fit realistically around classes and tennis practice.
              </p>
            </div>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setIsQuickCaptureOpen(true)}
            >
              <Plus size={15} />
              <span>Add Task</span>
            </button>
          </div>

          <div className="tasks-list-stack">
            {chosenPriorities.map(task => (
              <TaskCard key={task.id} task={task} onStartFocus={handleStartFocus} />
            ))}

            {chosenPriorities.length === 0 && (
              <div className="empty-priorities-banner glass-panel">
                <Sparkles size={24} className="sparkle-tint" />
                <div>
                  <h4>No priorities selected for today yet</h4>
                  <p>Choose up to 3 tasks from your spaces or quick capture to protect your focus.</p>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsQuickCaptureOpen(true)}
                >
                  Quick Capture
                </button>
              </div>
            )}
          </div>

          {/* Show More Tasks Accordion */}
          {otherTasks.length > 0 && (
            <div className="show-more-tasks-container">
              <button
                className="btn-toggle-show-more"
                onClick={() => setShowMoreTasks(!showMoreTasks)}
              >
                <span>
                  {showMoreTasks ? 'Hide additional tasks' : `Show more tasks (${otherTasks.length})`}
                </span>
                {showMoreTasks ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showMoreTasks && (
                <div className="tasks-list-stack animate-fade-in" style={{ marginTop: '16px' }}>
                  {otherTasks.map(task => (
                    <TaskCard key={task.id} task={task} onStartFocus={handleStartFocus} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Routine & Hydration Mini Dashboard Grid */}
      <div className="today-bottom-grid">
        {/* Hydration Tracker Card */}
        <div className="glass-panel hydration-card">
          <div className="hydration-header">
            <div className="hydration-title-group">
              <Droplets size={19} className="water-icon" />
              <div>
                <h4 className="card-heading">Hydration Flow</h4>
                <p className="card-sub">
                  {hydration.currentMl} / {hydration.targetMl} ml target
                </p>
              </div>
            </div>
            <button
              className="btn-icon btn-ghost"
              onClick={undoHydration}
              title="Undo last drink"
            >
              <RotateCcw size={15} />
            </button>
          </div>

          {/* Liquid progress bar */}
          <div className="hydration-progress-track">
            <div
              className="hydration-progress-fill"
              style={{
                width: `${Math.min(100, Math.round((hydration.currentMl / hydration.targetMl) * 100))}%`
              }}
            ></div>
          </div>

          <div className="hydration-buttons-row">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => logHydration(250)}
            >
              + Glass (250ml)
            </button>
            <button
              className="btn btn-sm btn-tennis"
              onClick={() => logHydration(500)}
            >
              + Bottle (500ml)
            </button>
          </div>
        </div>

        {/* Daily Routines & Care Checklist */}
        <div className="glass-panel routines-card">
          <div className="routines-header">
            <h4 className="card-heading">Daily Care & Routines</h4>
            <span className="badge badge-low-energy">Gentle habits</span>
          </div>
          <div className="routines-list">
            {routines
              .filter(r => r.frequency === 'daily' || r.category === 'hygiene')
              .slice(0, 3)
              .map(routine => (
                <div
                  key={routine.id}
                  className="routine-item-row"
                  onClick={() => toggleRoutine(routine.id)}
                >
                  <div
                    className={`routine-checkbox ${routine.isCompletedToday ? 'checked' : ''}`}
                  >
                    {routine.isCompletedToday && <CheckCircle size={14} />}
                  </div>
                  <span
                    className={`routine-title ${routine.isCompletedToday ? 'line-through' : ''}`}
                  >
                    {routine.title}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
