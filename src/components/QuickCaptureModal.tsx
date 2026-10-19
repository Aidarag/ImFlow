import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  Calendar,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SpaceId, TaskPriority } from '../types';

export const QuickCaptureModal: React.FC = () => {
  const { isQuickCaptureOpen, setIsQuickCaptureOpen, addTask } = useApp();

  const [title, setTitle] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [spaceId, setSpaceId] = useState<SpaceId>('school');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [deadline, setDeadline] = useState('');
  const [isTopPriority, setIsTopPriority] = useState(false);

  if (!isQuickCaptureOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      nextStep: nextStep.trim() || undefined,
      spaceId,
      priority,
      estimatedMinutes,
      deadline: deadline ? `${deadline}T23:59:00` : undefined,
      status: 'planned',
      isChosenPriority: isTopPriority,
      subtasks: []
    });

    setTitle('');
    setNextStep('');
    setDeadline('');
    setIsQuickCaptureOpen(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card quick-capture-modal glass-panel-elevated animate-fade-in">
        <div className="modal-header-row">
          <div className="modal-title-group">
            <Sparkles size={18} className="sparkle-tint" />
            <h3 className="modal-title">Quick Capture</h3>
          </div>
          <button
            className="btn-icon btn-ghost"
            onClick={() => setIsQuickCaptureOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="quick-capture-form">
          <div className="form-group">
            <label>Actionable Title:</label>
            <input
              type="text"
              autoFocus
              className="input-text"
              placeholder="e.g. Finish predictive analytics question 3..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Concrete First Step (5-minute starter action):</label>
            <input
              type="text"
              className="input-text"
              placeholder="e.g. Open Jupyter notebook and import pandas..."
              value={nextStep}
              onChange={e => setNextStep(e.target.value)}
            />
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label>Space / Life Area:</label>
              <select
                className="input-text"
                value={spaceId}
                onChange={e => setSpaceId(e.target.value as SpaceId)}
              >
                <option value="school">School & Courses</option>
                <option value="learning">Python & Skills</option>
                <option value="tennis">Tennis & Movement</option>
                <option value="projects">Projects & Career</option>
                <option value="content">Im’s Adventures</option>
                <option value="life">Life & Routines</option>
                <option value="inbox">Unsorted Inbox</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estimated Time:</label>
              <input
                type="number"
                className="input-text"
                value={estimatedMinutes}
                onChange={e => setEstimatedMinutes(parseInt(e.target.value) || 15)}
              />
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label>Deadline (Optional):</label>
              <input
                type="date"
                className="input-text"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Priority Level:</label>
              <select
                className="input-text"
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="form-checkbox-row">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={isTopPriority}
                onChange={e => setIsTopPriority(e.target.checked)}
              />
              <span>Pin to Today's Top 3 Priorities</span>
            </label>
          </div>

          <div className="modal-actions" style={{ marginTop: '20px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsQuickCaptureOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              <span>Capture Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
