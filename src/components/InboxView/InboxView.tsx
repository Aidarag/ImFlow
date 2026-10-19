import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Check,
  X,
  Trash2,
  Clock,
  Layers,
  Send,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrainDumpSuggestion, SpaceId, TaskPriority } from '../../types';

export const InboxView: React.FC = () => {
  const {
    processBrainDumpWithAI,
    applyBrainDumpSuggestions,
    tasks,
    deleteTask,
    addTask
  } = useApp();

  const [rawText, setRawText] = useState('');
  const [suggestions, setSuggestions] = useState<BrainDumpSuggestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const inboxTasks = tasks.filter(t => t.spaceId === 'inbox' && t.status !== 'completed');

  const handleRunAISorter = () => {
    if (!rawText.trim()) return;
    setIsProcessing(true);
    setHasApplied(false);

    setTimeout(() => {
      const generated = processBrainDumpWithAI(rawText);
      setSuggestions(generated);
      setIsProcessing(false);
    }, 450);
  };

  const handleUpdateSuggestion = (id: string, updates: Partial<BrainDumpSuggestion>) => {
    setSuggestions(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handleToggleAccept = (id: string) => {
    setSuggestions(prev =>
      prev.map(s => (s.id === id ? { ...s, accepted: !s.accepted } : s))
    );
  };

  const handleApplyAll = () => {
    applyBrainDumpSuggestions(suggestions);
    setHasApplied(true);
    setRawText('');
  };

  const spaceOptions: { id: SpaceId; label: string }[] = [
    { id: 'school', label: 'School' },
    { id: 'learning', label: 'Learning' },
    { id: 'tennis', label: 'Tennis' },
    { id: 'projects', label: 'Projects' },
    { id: 'content', label: 'Content' },
    { id: 'life', label: 'Life' }
  ];

  return (
    <div className="inbox-view animate-fade-in">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <h2 className="section-heading">Inbox & Brain Dump</h2>
          <p className="section-caption">
            Capture first and organize later. Dump thoughts, assignments, tennis notes, or chores in raw text.
          </p>
        </div>
      </div>

      {/* Raw Brain Dump Input Card */}
      <div className="glass-panel brain-dump-input-card">
        <div className="card-top-row">
          <label className="input-card-label">Enter raw thoughts or mixed brain dump:</label>
          <span className="badge badge-low-energy">Instant Auto-Save</span>
        </div>
        <textarea
          className="textarea brain-dump-textarea"
          value={rawText}
          onChange={e => setRawText(e.target.value)}
          placeholder="e.g. Finish my analytics assignment, practice Python for 45 min, check tennis racket grip, buy laundry detergent and call family..."
        />
        <div className="brain-dump-actions">
          <div className="hint-text">
            💡 AI respects personal rules: assignments come first, Python is protected, and no deadlines are invented.
          </div>
          <button
            className="btn btn-primary"
            onClick={handleRunAISorter}
            disabled={!rawText.trim() || isProcessing}
          >
            <Sparkles size={16} />
            <span>{isProcessing ? 'Analyzing thoughts…' : 'AI Smart Sort & Suggest'}</span>
          </button>
        </div>
      </div>

      {/* AI Sorting Preview & Approval Panel */}
      {suggestions.length > 0 && (
        <div className="glass-panel-elevated suggestions-preview-card animate-fade-in">
          <div className="suggestions-header">
            <div>
              <div className="pill-row">
                <span className="badge badge-flow">AI Proposed Organization</span>
                <span className="text-secondary" style={{ fontSize: '0.85rem' }}>
                  {suggestions.filter(s => s.accepted).length} of {suggestions.length} items accepted
                </span>
              </div>
              <h3 className="preview-heading">Review & Edit Suggestions</h3>
              <p className="preview-desc">
                Review proposed spaces and concrete starting steps. Uncheck any item you don't want to add.
              </p>
            </div>
            {!hasApplied ? (
              <button className="btn btn-tennis" onClick={handleApplyAll}>
                <Check size={16} />
                <span>Apply to My Plan</span>
              </button>
            ) : (
              <span className="badge badge-tennis" style={{ padding: '8px 14px' }}>
                ✓ Successfully Added to Plan
              </span>
            )}
          </div>

          <div className="suggestions-list-stack">
            {suggestions.map(sug => (
              <div
                key={sug.id}
                className={`suggestion-item-card glass-panel ${sug.accepted ? '' : 'discarded'}`}
              >
                <div className="sug-left-col">
                  <input
                    type="checkbox"
                    className="sug-checkbox"
                    checked={sug.accepted !== false}
                    onChange={() => handleToggleAccept(sug.id)}
                  />
                </div>
                <div className="sug-content-col">
                  <div className="sug-title-row">
                    <input
                      type="text"
                      className="sug-input-title"
                      value={sug.suggestedTitle}
                      onChange={e =>
                        handleUpdateSuggestion(sug.id, { suggestedTitle: e.target.value })
                      }
                    />
                  </div>

                  <div className="sug-fields-row">
                    <div className="sug-field">
                      <span className="field-label">Space:</span>
                      <select
                        className="sug-select"
                        value={sug.suggestedSpace}
                        onChange={e =>
                          handleUpdateSuggestion(sug.id, {
                            suggestedSpace: e.target.value as SpaceId
                          })
                        }
                      >
                        {spaceOptions.map(opt => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sug-field">
                      <span className="field-label">Priority:</span>
                      <select
                        className="sug-select"
                        value={sug.suggestedPriority}
                        onChange={e =>
                          handleUpdateSuggestion(sug.id, {
                            suggestedPriority: e.target.value as TaskPriority
                          })
                        }
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>

                    <div className="sug-field">
                      <span className="field-label">Est. Time:</span>
                      <input
                        type="number"
                        className="sug-input-num"
                        value={sug.estimatedMinutes || 30}
                        onChange={e =>
                          handleUpdateSuggestion(sug.id, {
                            estimatedMinutes: parseInt(e.target.value) || 15
                          })
                        }
                      />
                      <span className="unit-label">m</span>
                    </div>
                  </div>

                  <div className="sug-next-step-row">
                    <ArrowRight size={13} className="text-secondary" />
                    <input
                      type="text"
                      className="sug-input-next"
                      placeholder="Concrete starting step..."
                      value={sug.suggestedNextStep}
                      onChange={e =>
                        handleUpdateSuggestion(sug.id, { suggestedNextStep: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unsorted Inbox List */}
      <div className="existing-inbox-section">
        <h3 className="section-subheading">Unsorted Thoughts & Notes ({inboxTasks.length})</h3>
        <div className="tasks-list-stack">
          {inboxTasks.map(t => (
            <div key={t.id} className="inbox-item-card glass-panel">
              <div>
                <h4 className="inbox-item-title">{t.title}</h4>
                {t.nextStep && <p className="inbox-item-sub">Next: {t.nextStep}</p>}
              </div>
              <button
                className="btn-icon btn-ghost text-danger"
                onClick={() => deleteTask(t.id)}
                title="Delete from inbox"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {inboxTasks.length === 0 && (
            <div className="empty-inbox-state glass-panel">
              <p>Inbox is clear. Everything has been organized into its respective space.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
