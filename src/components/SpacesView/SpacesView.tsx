import React, { useState } from 'react';
import {
  GraduationCap,
  Code2,
  Activity,
  Briefcase,
  Video,
  Heart,
  Plus,
  Sparkles,
  BookmarkPlus,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Flame,
  DollarSign,
  ShoppingCart,
  PhoneCall,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SpaceId, Task, TennisJournalEntry, Project, InternshipApp, ContentItem, ContentStage, RoutineItem } from '../../types';
import { TaskCard } from '../TaskCard';

export const SpacesView: React.FC = () => {
  const {
    activeSpaceTab,
    setActiveSpaceTab,
    courses,
    skills,
    tasks,
    tennisEntries,
    addTennisEntry,
    projects,
    internshipApps,
    contentItems,
    routines,
    toggleRoutine,
    addRoutine,
    recordSkillPracticeSession,
    settings
  } = useApp();

  // Sub-tabs for spaces
  const spaceTabs: { id: SpaceId; label: string; icon: React.ReactNode }[] = [
    { id: 'school', label: 'School & Courses', icon: <GraduationCap size={17} /> },
    { id: 'learning', label: 'Python & Skills', icon: <Code2 size={17} /> },
    { id: 'tennis', label: 'Tennis & Movement', icon: <Activity size={17} /> },
    { id: 'projects', label: 'Projects & Career', icon: <Briefcase size={17} /> },
    { id: 'content', label: 'Im’s Adventures', icon: <Video size={17} /> },
    { id: 'life', label: 'Life & Routines', icon: <Heart size={17} /> }
  ];

  // Modals state
  const [showTennisModal, setShowTennisModal] = useState(false);
  const [tennisWentWell, setTennisWentWell] = useState('');
  const [tennisNeedsPractice, setTennisNeedsPractice] = useState('');
  const [tennisNextFocus, setTennisNextFocus] = useState('');

  const [showSkillPracticeModal, setShowSkillPracticeModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState('skill-1');
  const [practiceMinutes, setPracticeMinutes] = useState(45);
  const [practiceStoppingPoint, setPracticeStoppingPoint] = useState('');
  const [practiceNextAction, setPracticeNextAction] = useState('');

  const [newShoppingItem, setNewShoppingItem] = useState('');
  const [newShoppingPriority, setNewShoppingPriority] = useState<'Needed soon' | 'Can wait' | 'Optional'>('Needed soon');
  const [newShoppingCost, setNewShoppingCost] = useState('');

  const handleSaveTennisJournal = () => {
    if (!tennisWentWell.trim()) return;
    addTennisEntry({
      date: new Date().toISOString().split('T')[0],
      type: 'practice',
      whatWentWell: tennisWentWell,
      needsPractice: tennisNeedsPractice,
      nextFocus: tennisNextFocus,
      durationMinutes: 90
    });
    setTennisWentWell('');
    setTennisNeedsPractice('');
    setTennisNextFocus('');
    setShowTennisModal(false);
  };

  const handleSaveSkillPractice = () => {
    recordSkillPracticeSession(
      selectedSkillId,
      practiceMinutes,
      practiceStoppingPoint,
      practiceNextAction
    );
    setPracticeStoppingPoint('');
    setPracticeNextAction('');
    setShowSkillPracticeModal(false);
  };

  const handleAddShoppingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShoppingItem.trim()) return;
    addRoutine({
      category: 'shopping',
      title: newShoppingItem,
      frequency: 'as_needed',
      priority: newShoppingPriority,
      estimatedCost: parseFloat(newShoppingCost) || undefined,
      isCompletedToday: false
    });
    setNewShoppingItem('');
    setNewShoppingCost('');
  };

  return (
    <div className="spaces-view animate-fade-in">
      {/* Space Navigator Pills */}
      <div className="spaces-nav-pills-row glass-panel">
        {spaceTabs.map(tab => (
          <button
            key={tab.id}
            className={`space-nav-pill ${activeSpaceTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveSpaceTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. School & Courses Space */}
      {activeSpaceTab === 'school' && (
        <div className="space-content-area animate-fade-in">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Courses & Academics</h2>
              <p className="section-caption">
                Assignments first: clear instructions, separate submission receipts, and requirements checklists.
              </p>
            </div>
          </div>

          <div className="courses-cards-grid">
            {courses.map(course => {
              const courseTasks = tasks.filter(
                t => t.courseOrProjectName === course.name || t.spaceId === 'school'
              );
              return (
                <div key={course.id} className="course-card glass-panel">
                  <div className="course-top-row">
                    <span className="course-code badge badge-school">{course.code}</span>
                    <span className="course-semester">{course.semester}</span>
                  </div>
                  <h3 className="course-title">{course.name}</h3>
                  {course.instructor && (
                    <p className="course-instructor">Instructor: {course.instructor}</p>
                  )}
                  <p className="course-notes">{course.notes}</p>

                  <div className="course-assignments-box">
                    <h5 className="sub-title">Assignments & Deadlines:</h5>
                    <div className="tasks-compact-list">
                      {courseTasks.map(t => (
                        <div key={t.id} className="compact-task-row">
                          <span className={`status-dot ${t.status === 'completed' ? 'done' : 'pending'}`}></span>
                          <span className="compact-title">{t.title}</span>
                          {t.deadline && (
                            <span className="compact-due">
                              Due {new Date(t.deadline).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* School Tasks List */}
          <div className="space-tasks-section">
            <h3 className="section-subheading">Active Academic Tasks & Milestone Checklists</h3>
            <div className="tasks-list-stack">
              {tasks
                .filter(t => t.spaceId === 'school')
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Python & Skills Learning Space */}
      {activeSpaceTab === 'learning' && (
        <div className="space-content-area animate-fade-in">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Protected Python & Technical Skills</h2>
              <p className="section-caption">
                Protected {settings.protectedPythonMinutes} min daily study time. Always preserve where you stopped and your next concrete step.
              </p>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowSkillPracticeModal(true)}
            >
              <Plus size={15} />
              <span>Log Practice Session</span>
            </button>
          </div>

          {/* Skills Grid */}
          <div className="skills-cards-grid">
            {skills.map(skill => {
              const progressPct = Math.min(
                100,
                Math.round((skill.completedMinutesToday / skill.targetDailyMinutes) * 100)
              );
              return (
                <div key={skill.id} className="skill-card glass-panel">
                  <div className="skill-top-row">
                    <h3 className="skill-name">{skill.skillName}</h3>
                    {skill.isProtected ? (
                      <span className="badge badge-python">
                        <Flame size={12} />
                        <span>Protected Habit</span>
                      </span>
                    ) : (
                      <span className="badge badge-low-energy">Skill Tracker</span>
                    )}
                  </div>

                  <div className="skill-progress-container">
                    <div className="progress-label-row">
                      <span>Today's Practice:</span>
                      <span className="progress-values">
                        {skill.completedMinutesToday} / {skill.targetDailyMinutes} mins
                      </span>
                    </div>
                    <div className="skill-progress-bar">
                      <div
                        className="skill-progress-fill"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Saved stopping point & next action */}
                  <div className="skill-context-box">
                    <div className="context-item">
                      <span className="context-label">Last stopping point:</span>
                      <p className="context-value">{skill.lastStoppingPoint}</p>
                    </div>
                    <div className="context-item">
                      <span className="context-label">Next immediate action:</span>
                      <p className="context-value text-accent">{skill.nextAction}</p>
                    </div>
                  </div>

                  <div className="skill-card-footer">
                    <span className="total-sessions-tag">
                      {skill.totalSessions} total logged sessions
                    </span>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setSelectedSkillId(skill.id);
                        setShowSkillPracticeModal(true);
                      }}
                    >
                      Record Session
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Learning Tasks */}
          <div className="space-tasks-section">
            <h3 className="section-subheading">Learning Milestones & Problem Sets</h3>
            <div className="tasks-list-stack">
              {tasks
                .filter(t => t.spaceId === 'learning')
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Tennis & Movement Space */}
      {activeSpaceTab === 'tennis' && (
        <div className="space-content-area animate-fade-in">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Varsity Tennis & Physical Movement</h2>
              <p className="section-caption">
                Practice sessions, match prep, and mindful reflections: what went well, what needs work, next court focus.
              </p>
            </div>
            <button
              className="btn btn-tennis btn-sm"
              onClick={() => setShowTennisModal(true)}
            >
              <Plus size={15} />
              <span>Log Practice Reflection</span>
            </button>
          </div>

          {/* Tennis Reflection Journal Grid */}
          <div className="tennis-journal-grid">
            {tennisEntries.map(entry => (
              <div key={entry.id} className="tennis-entry-card glass-panel">
                <div className="entry-header">
                  <span className="badge badge-tennis">{entry.type}</span>
                  <span className="entry-date">{entry.date} • {entry.durationMinutes}m</span>
                </div>
                <div className="entry-section">
                  <span className="entry-label text-tennis">✓ What went well:</span>
                  <p className="entry-text">{entry.whatWentWell}</p>
                </div>
                <div className="entry-section">
                  <span className="entry-label text-amber">⚡ What needs practice:</span>
                  <p className="entry-text">{entry.needsPractice}</p>
                </div>
                <div className="entry-section">
                  <span className="entry-label text-accent">🎯 Focus for next session:</span>
                  <p className="entry-text">{entry.nextFocus}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tennis Tasks */}
          <div className="space-tasks-section">
            <h3 className="section-subheading">Equipment Prep & Movement Tasks</h3>
            <div className="tasks-list-stack">
              {tasks
                .filter(t => t.spaceId === 'tennis')
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Projects & Career Space */}
      {activeSpaceTab === 'projects' && (
        <div className="space-content-area animate-fade-in">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Projects & Internship Applications</h2>
              <p className="section-caption">
                Active applications, portfolio projects (Digital Timesheet, Shalom Recovery AI, Evida), and conference prep (AfroTech).
              </p>
            </div>
          </div>

          {/* Active Projects Cards */}
          <h3 className="section-subheading">Active Projects</h3>
          <div className="projects-grid">
            {projects.map(proj => (
              <div key={proj.id} className="project-card glass-panel">
                <div className="proj-header">
                  <span className="badge badge-flow">{proj.category}</span>
                  <span className="badge badge-low-energy">{proj.status}</span>
                </div>
                <h3 className="proj-name">{proj.name}</h3>
                <p className="proj-goal">{proj.goal}</p>
                <div className="proj-milestone">
                  <span className="milestone-label">Next Milestone:</span>
                  <span className="milestone-text">{proj.nextMilestone}</span>
                </div>
                {proj.waitingOn && (
                  <div className="proj-blocked">
                    <span>Blocked on: {proj.waitingOn}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Internship Applications Pipeline */}
          <h3 className="section-subheading" style={{ marginTop: '32px' }}>
            Internship Tracker Pipeline
          </h3>
          <div className="internship-pipeline-grid">
            {internshipApps.map(app => (
              <div key={app.id} className="internship-card glass-panel">
                <div className="app-top-row">
                  <h4 className="app-company">{app.company}</h4>
                  <span className="badge badge-school">{app.stage}</span>
                </div>
                <p className="app-role">{app.role}</p>
                <p className="app-location">📍 {app.location}</p>
                <div className="app-next-action">
                  <span className="label">Next Action:</span>
                  <span className="val">{app.nextAction}</span>
                </div>
                {app.deadline && (
                  <span className="app-deadline">Assessment/Due: {app.deadline}</span>
                )}
              </div>
            ))}
          </div>

          {/* AfroTech & Conference Prep Box */}
          <div className="glass-panel conference-prep-box" style={{ marginTop: '28px' }}>
            <div className="conf-header">
              <span className="badge badge-creative">Conferences & Career Events</span>
              <h3 className="conf-title">AfroTech 2026 Preparation</h3>
            </div>
            <p className="conf-desc">
              Pitch preparation, updated portfolio case studies (Predictive Analytics & Timesheet), and target company networking list.
            </p>
            <div className="conf-checklist">
              <div className="checklist-item">✓ 30-second elevator pitch connecting tennis discipline to data analytics</div>
              <div className="checklist-item">✓ Clean PDF resume printed & saved locally on phone</div>
              <div className="checklist-item">✓ Target recruiters: Morgan Stanley, Microsoft, Bloomberg, Palantir</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Im's Adventures Content Space */}
      {activeSpaceTab === 'content' && (
        <div className="space-content-area animate-fade-in">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Im’s Adventures & Creative Content</h2>
              <p className="section-caption">
                Story ideas, scripts, and video editing pipeline scheduled around classes and practice without burnout.
              </p>
            </div>
          </div>

          <div className="content-cards-grid">
            {contentItems.map(item => (
              <div key={item.id} className="content-card glass-panel">
                <div className="content-top-row">
                  <span className="badge badge-creative">{item.account}</span>
                  <span className="badge badge-school">{item.stage}</span>
                </div>
                <h3 className="content-title">{item.title}</h3>
                <div className="content-hook-box">
                  <span className="label">Opening Hook:</span>
                  <p className="text">"{item.hook}"</p>
                </div>
                <div className="content-script-box">
                  <span className="label">Script & Voiceover Draft:</span>
                  <p className="text">{item.script || item.outline}</p>
                </div>
                {item.caption && (
                  <div className="content-caption-box">
                    <span className="label">Caption:</span>
                    <p className="text">{item.caption}</p>
                  </div>
                )}
                {item.assetsChecklist.length > 0 && (
                  <div className="content-assets-list">
                    <span className="label">Required B-Roll & Footage:</span>
                    {item.assetsChecklist.map(as => (
                      <div key={as.id} className="asset-row">
                        <CheckCircle2 size={13} className={as.done ? 'text-tennis' : 'text-muted'} />
                        <span className={as.done ? 'line-through' : ''}>{as.item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Life & Routines Space */}
      {activeSpaceTab === 'life' && (
        <div className="space-content-area animate-fade-in">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Personal Life, Shopping & Wellbeing</h2>
              <p className="section-caption">
                Room cleaning routines, smart shopping lists by urgency, relationships check-ins, and finances.
              </p>
            </div>
          </div>

          <div className="life-grid">
            {/* Shopping List Card */}
            <div className="glass-panel shopping-card">
              <div className="card-top-row">
                <div className="card-title-group">
                  <ShoppingCart size={18} className="text-accent" />
                  <h4 className="card-heading">Smart Shopping List</h4>
                </div>
                <span className="badge badge-school">Prioritized</span>
              </div>

              {/* Add shopping item form */}
              <form onSubmit={handleAddShoppingItem} className="shopping-form">
                <input
                  type="text"
                  className="input-text"
                  placeholder="Item name (e.g. Wilson overgrips)..."
                  value={newShoppingItem}
                  onChange={e => setNewShoppingItem(e.target.value)}
                />
                <div className="form-sub-row">
                  <select
                    className="input-text"
                    value={newShoppingPriority}
                    onChange={e => setNewShoppingPriority(e.target.value as any)}
                  >
                    <option value="Needed soon">Needed soon</option>
                    <option value="Can wait">Can wait</option>
                    <option value="Optional">Optional</option>
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    className="input-text"
                    placeholder="Est. $ cost"
                    value={newShoppingCost}
                    onChange={e => setNewShoppingCost(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    Add
                  </button>
                </div>
              </form>

              {/* Shopping items list */}
              <div className="shopping-items-list">
                {routines
                  .filter(r => r.category === 'shopping')
                  .map(item => (
                    <div
                      key={item.id}
                      className="shopping-row"
                      onClick={() => toggleRoutine(item.id)}
                    >
                      <div className={`routine-checkbox ${item.isCompletedToday ? 'checked' : ''}`}>
                        {item.isCompletedToday && <CheckCircle2 size={13} />}
                      </div>
                      <div className="shopping-details">
                        <span className={`shopping-title ${item.isCompletedToday ? 'line-through' : ''}`}>
                          {item.title}
                        </span>
                        <div className="shopping-meta">
                          <span
                            className={`priority-chip ${
                              item.priority === 'Needed soon'
                                ? 'chip-urgent'
                                : item.priority === 'Can wait'
                                ? 'chip-medium'
                                : 'chip-optional'
                            }`}
                          >
                            {item.priority}
                          </span>
                          {item.estimatedCost && <span>~${item.estimatedCost.toFixed(2)}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Cleaning & Care Routines */}
            <div className="glass-panel routines-full-card">
              <div className="card-title-group">
                <Heart size={18} className="text-creative" />
                <h4 className="card-heading">Cleaning & Self-Care Routines</h4>
              </div>
              <div className="routines-items-list">
                {routines
                  .filter(r => r.category === 'cleaning' || r.category === 'hygiene')
                  .map(item => (
                    <div
                      key={item.id}
                      className="routine-item-row"
                      onClick={() => toggleRoutine(item.id)}
                    >
                      <div className={`routine-checkbox ${item.isCompletedToday ? 'checked' : ''}`}>
                        {item.isCompletedToday && <CheckCircle2 size={14} />}
                      </div>
                      <span className={`routine-title ${item.isCompletedToday ? 'line-through' : ''}`}>
                        {item.title}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Relationships & Connections */}
            <div className="glass-panel relationships-card">
              <div className="card-title-group">
                <PhoneCall size={18} className="text-tennis" />
                <h4 className="card-heading">Relationships & Family Reminders</h4>
              </div>
              {routines
                .filter(r => r.category === 'relationship')
                .map(rel => (
                  <div key={rel.id} className="relationship-box">
                    <h5 className="rel-title">{rel.title}</h5>
                    {rel.contactNotes && <p className="rel-notes">{rel.contactNotes}</p>}
                    <button
                      className="btn btn-sm btn-tennis"
                      style={{ marginTop: '8px' }}
                      onClick={() => toggleRoutine(rel.id)}
                    >
                      {rel.isCompletedToday ? 'Checked in today ✓' : 'Mark call completed'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Log Tennis Reflection Modal */}
      {showTennisModal && (
        <div className="modal-backdrop">
          <div className="modal-card glass-panel-elevated">
            <h3 className="modal-title">Tennis Practice Reflection</h3>
            <p className="modal-desc">
              Focus on technical sensations and confidence, not numerical pressure.
            </p>
            <div className="form-group">
              <label>What went well today?</label>
              <textarea
                className="textarea"
                value={tennisWentWell}
                onChange={e => setTennisWentWell(e.target.value)}
                placeholder="e.g. Cross-court backhands were penetrating and deep; split-step felt explosive..."
              />
            </div>
            <div className="form-group">
              <label>What needs technical practice?</label>
              <textarea
                className="textarea"
                value={tennisNeedsPractice}
                onChange={e => setTennisNeedsPractice(e.target.value)}
                placeholder="e.g. First serve toss drift when fatigued; approach shot preparation..."
              />
            </div>
            <div className="form-group">
              <label>Focus for next practice:</label>
              <input
                type="text"
                className="input-text"
                value={tennisNextFocus}
                onChange={e => setTennisNextFocus(e.target.value)}
                placeholder="e.g. High elbow on serve toss & stay low through approach contact"
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowTennisModal(false)}>
                Cancel
              </button>
              <button className="btn btn-tennis" onClick={handleSaveTennisJournal}>
                Save Reflection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Skill Practice Modal */}
      {showSkillPracticeModal && (
        <div className="modal-backdrop">
          <div className="modal-card glass-panel-elevated">
            <h3 className="modal-title">Record Skill Practice Session</h3>
            <div className="form-group">
              <label>Select Skill:</label>
              <select
                className="input-text"
                value={selectedSkillId}
                onChange={e => setSelectedSkillId(e.target.value)}
              >
                {skills.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.skillName} {s.isProtected ? '(Protected)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Minutes Completed:</label>
              <input
                type="number"
                className="input-text"
                value={practiceMinutes}
                onChange={e => setPracticeMinutes(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>Stopping point (what you worked on / what confused you):</label>
              <textarea
                className="textarea"
                value={practiceStoppingPoint}
                onChange={e => setPracticeStoppingPoint(e.target.value)}
                placeholder="e.g. Built dictionary mapper for sales figures. Still reviewing groupby aggregation..."
              />
            </div>
            <div className="form-group">
              <label>Immediate next concrete action:</label>
              <input
                type="text"
                className="input-text"
                value={practiceNextAction}
                onChange={e => setPracticeNextAction(e.target.value)}
                placeholder="e.g. Solve LeetCode pandas challenge #2"
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowSkillPracticeModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveSkillPractice}>
                Save Session & Update Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
