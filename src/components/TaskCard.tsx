import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  MoreVertical,
  RotateCcw,
  Flag,
  FileCheck,
  ChevronDown,
  ChevronUp,
  BookmarkPlus
} from 'lucide-react';
import { Task } from '../types';
import { useApp } from '../context/AppContext';

interface TaskCardProps {
  task: Task;
  onStartFocus?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStartFocus }) => {
  const {
    completeTask,
    reopenTask,
    updateTask,
    deleteTask,
    breakdownTaskWithAI,
    setTaskStoppingPoint,
    submitAssignment
  } = useApp();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showStoppingModal, setShowStoppingModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [stoppingNote, setStoppingNote] = useState(task.stoppingPoint || '');
  const [nextStepInput, setNextStepInput] = useState(task.nextStep || '');
  const [submissionNote, setSubmissionNote] = useState(task.submissionReceipt || '');

  const isCompleted = task.status === 'completed';

  const handleToggleComplete = () => {
    if (isCompleted) {
      reopenTask(task.id);
    } else {
      completeTask(task.id);
    }
  };

  const handleSaveStopping = () => {
    setTaskStoppingPoint(task.id, stoppingNote, nextStepInput);
    setShowStoppingModal(false);
  };

  const handleSaveSubmission = () => {
    submitAssignment(task.id, submissionNote);
    setShowSubmitModal(false);
  };

  const handleToggleSubtask = (subId: string) => {
    const updated = task.subtasks.map(s =>
      s.id === subId ? { ...s, completed: !s.completed } : s
    );
    updateTask(task.id, { subtasks: updated });
  };

  const getSpaceBadgeClass = (spaceId: string) => {
    switch (spaceId) {
      case 'school':
        return 'badge-school';
      case 'learning':
        return 'badge-python';
      case 'tennis':
        return 'badge-tennis';
      case 'content':
        return 'badge-creative';
      case 'projects':
        return 'badge-flow';
      default:
        return 'badge-low-energy';
    }
  };

  return (
    <div className={`task-card glass-panel ${isCompleted ? 'completed-card' : ''}`}>
      <div className="task-card-header">
        {/* Completion Checkbox */}
        <button
          className="btn-complete-checkbox"
          onClick={handleToggleComplete}
          title={isCompleted ? 'Mark uncompleted' : 'Mark complete'}
        >
          {isCompleted ? (
            <CheckCircle2 size={22} className="check-icon-done" />
          ) : (
            <Circle size={22} className="check-icon-pending" />
          )}
        </button>

        {/* Task Title and Context */}
        <div className="task-title-group" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="task-title-row">
            <h4 className={`task-title ${isCompleted ? 'line-through' : ''}`}>
              {task.title}
            </h4>
            {task.isAssignment && (
              <span
                className={`badge ${task.isSubmitted ? 'badge-tennis' : 'badge-school'}`}
                title="Separate assignment submission tracking"
              >
                {task.isSubmitted ? 'Submitted ✓' : 'Assignment'}
              </span>
            )}
            <span className={`badge ${getSpaceBadgeClass(task.spaceId)}`}>
              {task.courseOrProjectName || task.spaceId}
            </span>
          </div>

          {/* Concrete Next Step */}
          {task.nextStep && !isCompleted && (
            <div className="task-next-step">
              <ArrowRight size={13} className="next-arrow" />
              <span className="next-label">Next step:</span>
              <span className="next-text">{task.nextStep}</span>
            </div>
          )}

          {/* Metadata badges row */}
          <div className="task-meta-row">
            {task.estimatedMinutes && (
              <span className="task-meta-item">
                <Clock size={13} />
                <span>{task.estimatedMinutes}m est.</span>
              </span>
            )}
            {task.deadline && (
              <span className="task-meta-item deadline-item">
                <Calendar size={13} />
                <span>Due {new Date(task.deadline).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
              </span>
            )}
            {task.stoppingPoint && (
              <span className="task-meta-item stopping-tag" title={task.stoppingPoint}>
                <BookmarkPlus size={13} />
                <span>Saved point</span>
              </span>
            )}
            {task.subtasks.length > 0 && (
              <span className="task-meta-item">
                <span>
                  {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Quick Actions and Menu */}
        <div className="task-actions-group">
          {!isCompleted && onStartFocus && (
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => onStartFocus(task)}
              title="Start focused work session"
            >
              Start
            </button>
          )}

          <button
            className="btn-icon btn-ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            title="Expand task details"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <div className="relative-menu-container">
            <button
              className="btn-icon btn-ghost"
              onClick={() => setShowMenu(!showMenu)}
              title="More task options"
            >
              <MoreVertical size={16} />
            </button>

            {showMenu && (
              <div className="task-dropdown-menu glass-panel-elevated">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    breakdownTaskWithAI(task.id);
                    setShowMenu(false);
                    setIsExpanded(true);
                  }}
                >
                  <Sparkles size={14} className="sparkle-tint" />
                  <span>Break down with AI</span>
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setShowStoppingModal(true);
                    setShowMenu(false);
                  }}
                >
                  <BookmarkPlus size={14} />
                  <span>Record stopping note</span>
                </button>
                {task.isAssignment && (
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowSubmitModal(true);
                      setShowMenu(false);
                    }}
                  >
                    <FileCheck size={14} />
                    <span>Record submission receipt</span>
                  </button>
                )}
                <button
                  className="dropdown-item"
                  onClick={() => {
                    updateTask(task.id, { isChosenPriority: !task.isChosenPriority });
                    setShowMenu(false);
                  }}
                >
                  <Flag size={14} />
                  <span>{task.isChosenPriority ? 'Remove from top 3' : 'Pin to Today top 3'}</span>
                </button>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => {
                    deleteTask(task.id);
                    setShowMenu(false);
                  }}
                >
                  <span>Delete task</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details Body */}
      {isExpanded && (
        <div className="task-expanded-body">
          {/* Saved Stopping Point Banner */}
          {task.stoppingPoint && (
            <div className="stopping-point-box">
              <div className="stopping-box-header">
                <BookmarkPlus size={14} />
                <span>Saved stopping point & restart notes</span>
              </div>
              <p className="stopping-box-content">{task.stoppingPoint}</p>
            </div>
          )}

          {/* Subtasks List */}
          <div className="subtasks-container">
            <div className="subtasks-header">
              <span className="subtasks-label">Subtasks & Milestones</span>
              <button
                className="btn-link-action"
                onClick={() => breakdownTaskWithAI(task.id)}
              >
                <Sparkles size={13} />
                <span>AI Breakdown</span>
              </button>
            </div>

            {task.subtasks.map(sub => (
              <div
                key={sub.id}
                className="subtask-row"
                onClick={() => handleToggleSubtask(sub.id)}
              >
                {sub.completed ? (
                  <CheckCircle2 size={16} className="subtask-checked" />
                ) : (
                  <Circle size={16} className="subtask-unchecked" />
                )}
                <span className={`subtask-title ${sub.completed ? 'line-through' : ''}`}>
                  {sub.title}
                </span>
              </div>
            ))}

            {task.subtasks.length === 0 && (
              <div className="empty-subtasks-prompt">
                No subtasks yet. Click "AI Breakdown" to generate manageable steps.
              </div>
            )}
          </div>

          {/* Submission Info for assignments */}
          {task.isAssignment && (
            <div className="assignment-submission-panel">
              <div className="submission-status-row">
                <span className="submission-title">Submission Verification:</span>
                <span className={task.isSubmitted ? 'text-tennis' : 'text-amber'}>
                  {task.isSubmitted ? 'Officially Recorded' : 'Not yet submitted'}
                </span>
              </div>
              {task.submissionReceipt && (
                <div className="submission-receipt-text">
                  Receipt / Note: {task.submissionReceipt}
                </div>
              )}
              <button
                className="btn btn-sm btn-secondary"
                style={{ marginTop: '8px' }}
                onClick={() => setShowSubmitModal(true)}
              >
                <FileCheck size={14} />
                <span>{task.isSubmitted ? 'Edit submission note' : 'Mark as submitted with receipt'}</span>
              </button>
            </div>
          )}

          {/* Stopping Note Record Action */}
          <div className="task-footer-bar">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setShowStoppingModal(true)}
            >
              <BookmarkPlus size={14} />
              <span>Update where I stopped</span>
            </button>
          </div>
        </div>
      )}

      {/* Stopping Point Modal */}
      {showStoppingModal && (
        <div className="modal-backdrop">
          <div className="modal-card glass-panel-elevated">
            <h3 className="modal-title">Record Stopping Point</h3>
            <p className="modal-desc">
              When you take a break, write what you accomplished, what confused you, and what to start next.
            </p>
            <div className="form-group">
              <label>Where you stopped / what you understood:</label>
              <textarea
                className="textarea"
                value={stoppingNote}
                onChange={e => setStoppingNote(e.target.value)}
                placeholder="e.g. Model finished training with 89% precision. Confusion around ROC curve interpretation..."
              />
            </div>
            <div className="form-group">
              <label>Immediate concrete next step:</label>
              <input
                type="text"
                className="input-text"
                value={nextStepInput}
                onChange={e => setNextStepInput(e.target.value)}
                placeholder="e.g. Calculate confusion matrix values and write 2-sentence summary"
              />
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowStoppingModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveStopping}>
                Save Stopping Point
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Submission Modal */}
      {showSubmitModal && (
        <div className="modal-backdrop">
          <div className="modal-card glass-panel-elevated">
            <h3 className="modal-title">Record Assignment Submission</h3>
            <p className="modal-desc">
              Remember: "Finished working" is distinct from "Submitted". Attach your submission timestamp or confirmation receipt.
            </p>
            <div className="form-group">
              <label>Submission confirmation / receipt / link:</label>
              <textarea
                className="textarea"
                value={submissionNote}
                onChange={e => setSubmissionNote(e.target.value)}
                placeholder="e.g. Uploaded to Canvas on 10/19 at 11:42 PM. Confirmation ID #8921-ANLT"
              />
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowSubmitModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-tennis" onClick={handleSaveSubmission}>
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
