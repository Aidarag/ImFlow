import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Edit3,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SundayResetView: React.FC = () => {
  const {
    tasks,
    fixedCommitments,
    updateTask,
    generateFiveSentenceRecap,
    skills,
    settings
  } = useApp();

  const [resetStep, setResetStep] = useState(1);
  const [recapSentences, setRecapSentences] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  const unfinishedTasks = tasks.filter(t => t.status !== 'completed' && t.status !== 'inbox');
  const upcomingDeadlines = tasks.filter(t => t.deadline && t.status !== 'completed');

  const handleGenerateRecap = () => {
    const generated = generateFiveSentenceRecap();
    setRecapSentences(generated);
  };

  const handleSentenceChange = (index: number, newText: string) => {
    setRecapSentences(prev => {
      const copy = [...prev];
      copy[index] = newText;
      return copy;
    });
  };

  const handleCopyRecap = () => {
    navigator.clipboard.writeText(recapSentences.join(' '));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetSteps = [
    { num: 1, label: 'Unfinished Tasks' },
    { num: 2, label: 'Classes & Tennis' },
    { num: 3, label: 'Upcoming Deadlines' },
    { num: 4, label: 'Priorities & Python' },
    { num: 5, label: 'Weekly Overview' }
  ];

  return (
    <div className="reset-view animate-fade-in">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <h2 className="section-heading">Sunday Reset & Daily Recaps</h2>
          <p className="section-caption">
            Recharge, align next week's tennis & coursework, and generate your 5-sentence daily learning summary.
          </p>
        </div>
      </div>

      <div className="reset-two-column-grid">
        {/* Left Column: 5-Sentence Daily Learning Recap (Section 05 Requirement) */}
        <div className="glass-panel recap-card">
          <div className="card-top-row">
            <div className="card-title-group">
              <BookOpen size={18} className="text-python" />
              <h3 className="card-heading">5-Sentence Daily Learning Recap</h3>
            </div>
            <span className="badge badge-python">Structured Synthesis</span>
          </div>
          <p className="recap-rule-note">
            Per product requirements: Generates exactly 5 sentences covering topic, main idea, practice, difficulty, and next step based solely on recorded notes.
          </p>

          {recapSentences.length === 0 ? (
            <div className="empty-recap-box">
              <p>Ready to synthesize today's Python and academic sessions?</p>
              <button className="btn btn-primary btn-sm" onClick={handleGenerateRecap}>
                <Sparkles size={14} />
                <span>Generate 5-Sentence Recap</span>
              </button>
            </div>
          ) : (
            <div className="recap-sentences-stack">
              {recapSentences.map((sentence, idx) => (
                <div key={idx} className="sentence-edit-row">
                  <span className="sentence-num">{idx + 1}</span>
                  <textarea
                    className="textarea sentence-textarea"
                    value={sentence}
                    onChange={e => handleSentenceChange(idx, e.target.value)}
                  />
                </div>
              ))}

              <div className="recap-actions-row">
                <button className="btn btn-secondary btn-sm" onClick={handleCopyRecap}>
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{isCopied ? 'Copied to Clipboard' : 'Copy All 5 Sentences'}</span>
                </button>
                <button className="btn btn-ghost btn-sm" onClick={handleGenerateRecap}>
                  Regenerate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Guided Sunday Reset Wizard (Section 04 & 11 Requirement) */}
        <div className="glass-panel-elevated reset-wizard-card">
          <div className="wizard-header">
            <div className="wizard-title-group">
              <RotateCcw size={18} className="text-tennis" />
              <h3 className="card-heading">Sunday Mindful Reset</h3>
            </div>
            <span className="badge badge-tennis">Step {resetStep} of 5</span>
          </div>

          {/* Stepper indicator */}
          <div className="stepper-dots-row">
            {resetSteps.map(step => (
              <div
                key={step.num}
                className={`step-dot-item ${
                  resetStep === step.num
                    ? 'active'
                    : resetStep > step.num
                    ? 'completed'
                    : ''
                }`}
                onClick={() => setResetStep(step.num)}
              >
                <div className="dot"></div>
                <span className="dot-label">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Unfinished Tasks Review */}
          {resetStep === 1 && (
            <div className="step-content animate-fade-in">
              <h4 className="step-title">Review Unfinished Tasks</h4>
              <p className="step-desc">
                Decide what to keep, what to postpone to next week, and what to release without guilt.
              </p>
              <div className="wizard-tasks-list">
                {unfinishedTasks.slice(0, 4).map(t => (
                  <div key={t.id} className="wizard-task-item glass-panel">
                    <span className="task-title">{t.title}</span>
                    <div className="task-actions">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => updateTask(t.id, { isChosenPriority: false })}
                      >
                        Postpone
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Next Week's Classes & Tennis */}
          {resetStep === 2 && (
            <div className="step-content animate-fade-in">
              <h4 className="step-title">Lock Next Week's Schedule</h4>
              <p className="step-desc">
                Verify your varsity tennis practice slots and semester lecture hours before planning flexible study.
              </p>
              <div className="wizard-commitments-list">
                {fixedCommitments.map(c => (
                  <div key={c.id} className="commitment-pill glass-panel">
                    <span className="pill-type">{c.type === 'tennis' ? '🎾 Tennis' : '📚 Lecture'}</span>
                    <span className="pill-title">{c.title}</span>
                    <span className="pill-time">{c.startTime} - {c.endTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Upcoming Deadlines */}
          {resetStep === 3 && (
            <div className="step-content animate-fade-in">
              <h4 className="step-title">Anticipate High-Stakes Deadlines</h4>
              <p className="step-desc">
                Keep major academic milestones visible so they don't surprise you mid-week.
              </p>
              <div className="deadlines-list">
                {upcomingDeadlines.map(t => (
                  <div key={t.id} className="deadline-item glass-panel">
                    <div>
                      <span className="deadline-name">{t.title}</span>
                      <span className="badge badge-school">
                        Due {new Date(t.deadline!).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    {t.nextStep && <p className="deadline-next">Next: {t.nextStep}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Protect Python & Weekly Priorities */}
          {resetStep === 4 && (
            <div className="step-content animate-fade-in">
              <h4 className="step-title">Protect Your Daily Python Time</h4>
              <p className="step-desc">
                Confirm your non-negotiable skill practice habit for the week.
              </p>
              <div className="python-confirm-card glass-panel">
                <ShieldCheck size={28} className="text-python" />
                <div>
                  <h5>{settings.protectedPythonMinutes} Minutes Daily Protected</h5>
                  <p>
                    Scheduled daily at 11:45 AM between morning lectures and afternoon court practice.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Summary & Ready */}
          {resetStep === 5 && (
            <div className="step-content animate-fade-in">
              <h4 className="step-title">Reset Complete! You're Prepared.</h4>
              <p className="step-desc">
                Your upcoming week is aligned with clarity. Tennis is locked, Python is protected, and coursework is segmented into bite-sized actions.
              </p>
              <div className="ready-banner glass-panel">
                <CheckCircle2 size={32} className="text-tennis" />
                <div>
                  <h5>Week is in Flow</h5>
                  <p>Start tomorrow with calm focus and clear stopping points.</p>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer */}
          <div className="wizard-nav-footer">
            <button
              className="btn btn-secondary btn-sm"
              disabled={resetStep === 1}
              onClick={() => setResetStep(prev => Math.max(1, prev - 1))}
            >
              Back
            </button>
            {resetStep < 5 ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setResetStep(prev => Math.min(5, prev + 1))}
              >
                <span>Continue</span>
                <ChevronRight size={15} />
              </button>
            ) : (
              <button
                className="btn btn-tennis btn-sm"
                onClick={() => setResetStep(1)}
              >
                Done (Save Reset)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
