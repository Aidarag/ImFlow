import React, { useState } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronDown,
  Check,
  Plus,
  Share2,
  Star,
  MoreHorizontal,
  Cloud,
  PenTool,
  Calendar,
  ExternalLink,
  BookOpen,
  Code2,
  Trophy,
  Video,
  Heart,
  GlassWater
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PersonalSpaceViewProps {
  onNavigateToCourses: () => void;
  onOpenQuickCapture: () => void;
  onOpenNotes: () => void;
}

export const PersonalSpaceView: React.FC<PersonalSpaceViewProps> = ({
  onNavigateToCourses,
  onOpenQuickCapture,
  onOpenNotes
}) => {
  const { tasks, completeTask, setIsQuickCaptureOpen } = useApp();

  // Habit checklist state matching reference photo
  const [dailyHabits, setDailyHabits] = useState([
    { id: 'h1', text: '8hrs restorative sleep', completed: true },
    { id: 'h2', text: '10k steps on campus', completed: false },
    { id: 'h3', text: 'hydrate (2L target)', completed: true },
    { id: 'h4', text: 'skincare & recovery', completed: false },
    { id: 'h5', text: 'daily vitamins', completed: true },
    { id: 'h6', text: 'protected python practice (60m)', completed: false },
    { id: 'h7', text: 'reviewed course notes', completed: false }
  ]);

  // Reminders list state matching reference photo
  const [reminders, setReminders] = useState([
    { id: 'r1', text: 'call mom', completed: false },
    { id: 'r2', text: 'string tennis racket (54 lbs)', completed: true },
    { id: 'r3', text: 'pick up electrolytes & hydration', completed: false },
    { id: 'r4', text: 'review ROC curve quiz notes', completed: false },
    { id: 'r5', text: 'export campus vlog draft', completed: false },
    { id: 'r6', text: 'submit financial aid verification', completed: true }
  ]);

  // Affirmations open/closed toggles
  const [expandedAffirmation, setExpandedAffirmation] = useState<number | null>(null);

  const affirmations = [
    {
      id: 1,
      title: 'I achieve whatever i set my mind to',
      detail: 'My focus creates reality. Every minute of disciplined habit compounds effortlessly.'
    },
    {
      id: 2,
      title: 'I want the best and i get it',
      detail: 'I hold high standards in my academics, my tennis athleticism, and my creative expression.'
    },
    {
      id: 3,
      title: 'I am worthy of calm focus and boundless energy',
      detail: 'Peace of mind is my foundation. I do not rush; I execute with graceful precision.'
    },
    {
      id: 4,
      title: 'Pressure is a privilege on the court and in the classroom',
      detail: 'Big moments are where I thrive. I stay anchored in my breath and preparation.'
    }
  ];

  const toggleHabit = (id: string) => {
    setDailyHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  return (
    <div className="personal-space-container">
      {/* 1. Top Notion-style Breadcrumb & Header Bar */}
      <header className="personal-top-bar">
        <div className="top-bar-left">
          <span className="notion-page-tag">🍸 ay's space</span>
          <span className="notion-privacy-badge">Private ▾</span>
        </div>
        <div className="top-bar-right">
          <span className="notion-edited-text">Edited just now</span>
          <button className="notion-btn-share">
            <Share2 size={13} />
            <span>Share</span>
          </button>
          <button className="notion-btn-icon" title="Star Page">
            <Star size={14} />
          </button>
          <button className="notion-btn-icon" title="Page Options">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </header>

      {/* 2. Panoramic Wide Cover Image */}
      <div className="personal-cover-wrapper">
        <img
          src="/assets/skyline_cover.jpg"
          alt="Twilight city skyline"
          className="personal-cover-img"
        />
        <div className="cover-hover-actions">
          <button className="btn-cover-action">Change cover</button>
          <button className="btn-cover-action">Reposition</button>
        </div>
      </div>

      {/* 3. Title Section with Overlapping Icon */}
      <div className="personal-header-section">
        <div className="personal-page-icon-badge">
          <span>🍸</span>
        </div>
        <div className="personal-title-row">
          <h1 className="personal-space-title">ay’s space</h1>
        </div>
        <p className="personal-space-motto">
          Aïda Garba • Cal State Fullerton • Student-Athlete Personal Flow & Mindful Planning
        </p>
      </div>

      {/* 4. Three-Column Main Dashboard Layout matching reference photo */}
      <div className="personal-three-columns-grid">
        {/* =========================================================
            LEFT COLUMN (~24%):
            Mood Photo + Navigation + "main character" + Habit Tracker + Bottom Photo
            ========================================================= */}
        <aside className="personal-col-left">
          {/* Top Mood Mirror Selfie Card */}
          <div className="notion-image-card">
            <img
              src="/assets/mood_portrait.jpg"
              alt="Aesthetic mirror selfie"
              className="notion-card-photo"
            />
          </div>

          {/* Navigation 🐆 Section */}
          <div className="notion-block-box">
            <h4 className="notion-section-label">navigation 🐆</h4>
            <div className="notion-nav-links">
              <button className="notion-nav-row" onClick={() => onOpenQuickCapture()}>
                <Cloud size={14} className="nav-cloud-icon" />
                <span>routines</span>
              </button>
              <button className="notion-nav-row" onClick={() => onNavigateToCourses()}>
                <Cloud size={14} className="nav-cloud-icon" />
                <span>planning space</span>
              </button>
              <button className="notion-nav-row" onClick={() => onOpenNotes()}>
                <Cloud size={14} className="nav-cloud-icon" />
                <span>vision board</span>
              </button>
              <button className="notion-nav-row" onClick={() => onOpenQuickCapture()}>
                <Cloud size={14} className="nav-cloud-icon" />
                <span>meal planner</span>
              </button>
              <button className="notion-nav-row" onClick={() => onOpenNotes()}>
                <Cloud size={14} className="nav-cloud-icon" />
                <span>finances</span>
              </button>
              <button className="notion-nav-row" onClick={() => onNavigateToCourses()}>
                <Cloud size={14} className="nav-cloud-icon" />
                <span>fitness & tennis</span>
              </button>
              <button className="notion-nav-row" onClick={() => onOpenNotes()}>
                <Cloud size={14} className="nav-cloud-icon" />
                <span>guide & principles</span>
              </button>
            </div>
          </div>

          {/* "main character" Typographic Script Card */}
          <div className="main-character-card">
            <span className="main-character-text">main character</span>
          </div>

          {/* ⭐️ Habit Tracker Section */}
          <div className="notion-block-box habit-tracker-box">
            <div className="habit-header-row">
              <span className="habit-header-title">★ habit tracker ▾</span>
            </div>

            <div className="daily-habits-inner-card">
              <div className="daily-habits-title-row">
                <span className="daily-habits-label">🧸 daily habits</span>
              </div>
              <span className="daily-habits-date">19 October 2026</span>

              <div className="habit-items-stack">
                {dailyHabits.map(habit => (
                  <label
                    key={habit.id}
                    className="habit-check-row"
                    onClick={() => toggleHabit(habit.id)}
                  >
                    <div className={`custom-checkbox ${habit.completed ? 'checked' : ''}`}>
                      {habit.completed && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span className={`habit-text ${habit.completed ? 'completed' : ''}`}>
                      {habit.text}
                    </span>
                  </label>
                ))}
              </div>

              <button
                className="btn-add-habit"
                onClick={() => {
                  const newHabit = prompt('Enter a new daily habit:');
                  if (newHabit && newHabit.trim()) {
                    setDailyHabits(prev => [
                      ...prev,
                      { id: `h-${Date.now()}`, text: newHabit.trim(), completed: false }
                    ]);
                  }
                }}
              >
                <Plus size={12} />
                <span>New habit</span>
              </button>
            </div>
          </div>

          {/* Bottom Editorial Mood Portrait Card */}
          <div className="notion-image-card bottom-mood-card">
            <div className="bottom-mood-overlay">
              <span className="mood-tag">AÏDA • CS-ATHLETE</span>
              <span className="mood-quote">“Consistency over intensity.”</span>
            </div>
          </div>
        </aside>

        {/* =========================================================
            CENTER COLUMN (~52%):
            "my spaces ✨" (Gallery Cards) + "assignment tracker" (Kanban Cards)
            ========================================================= */}
        <main className="personal-col-center">
          {/* Section 1: my spaces ✨ */}
          <section className="notion-center-section">
            <div className="center-section-header">
              <div className="section-title-wrap">
                <h3 className="center-section-title">my spaces ✨</h3>
              </div>
              <div className="section-tabs-bar">
                <button className="tab-pill-btn active">★ active</button>
                <button className="tab-pill-btn">★ priorities</button>
                <button className="tab-link-btn" onClick={onNavigateToCourses}>
                  Learning & Courses →
                </button>
                <button
                  className="tab-pill-btn btn-new-accent"
                  onClick={onOpenQuickCapture}
                >
                  New ▾
                </button>
              </div>
            </div>

            {/* 6 Gallery Cards (matching reference layout) */}
            <div className="my-spaces-gallery-grid">
              {/* Card 1: Learning & Academics (Links to Courses view!) */}
              <div
                className="space-gallery-card highlight-card"
                onClick={onNavigateToCourses}
                title="Click to open full Courses Dashboard"
              >
                <div className="gallery-card-banner banner-learning">
                  <div className="card-badge-pill">COURSES</div>
                  <ExternalLink size={14} className="card-link-icon" />
                </div>
                <div className="gallery-card-body">
                  <h4 className="gallery-card-name">BIO 121 • ANLT 410</h4>
                  <p className="gallery-card-sub">Learning & Academics (3 Active)</p>
                  <div className="gallery-progress-bar">
                    <div className="progress-fill fill-lime" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 2: Python Habit Practice */}
              <div
                className="space-gallery-card"
                onClick={() => onOpenQuickCapture()}
              >
                <div className="gallery-card-banner banner-python">
                  <div className="card-badge-pill">HABIT</div>
                  <Code2 size={14} className="card-link-icon" />
                </div>
                <div className="gallery-card-body">
                  <h4 className="gallery-card-name">NUR 112 • PYTHON</h4>
                  <p className="gallery-card-sub">60m Daily Protected Habit</p>
                  <div className="gallery-progress-bar">
                    <div className="progress-fill fill-lavender" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 3: Varsity Tennis */}
              <div
                className="space-gallery-card"
                onClick={() => onOpenQuickCapture()}
              >
                <div className="gallery-card-banner banner-tennis">
                  <div className="card-badge-pill">VARSITY</div>
                  <Trophy size={14} className="card-link-icon" />
                </div>
                <div className="gallery-card-body">
                  <h4 className="gallery-card-name">MIC 210 • TENNIS</h4>
                  <p className="gallery-card-sub">Court Prep & Match Readiness</p>
                  <div className="gallery-progress-bar">
                    <div className="progress-fill fill-lime" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 4: Creative Lab & Media */}
              <div
                className="space-gallery-card"
                onClick={() => onOpenQuickCapture()}
              >
                <div className="gallery-card-banner banner-media">
                  <div className="card-badge-pill">MEDIA</div>
                  <Video size={14} className="card-link-icon" />
                </div>
                <div className="gallery-card-body">
                  <h4 className="gallery-card-name">PHM 200 • CREATIVE</h4>
                  <p className="gallery-card-sub">Vlog Voiceovers & 35mm Lab</p>
                  <div className="gallery-progress-bar">
                    <div className="progress-fill fill-lavender" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 5: Routines & Wellness */}
              <div
                className="space-gallery-card"
                onClick={() => onOpenQuickCapture()}
              >
                <div className="gallery-card-banner banner-wellness">
                  <div className="card-badge-pill">WELLNESS</div>
                  <Heart size={14} className="card-link-icon" />
                </div>
                <div className="gallery-card-body">
                  <h4 className="gallery-card-name">PSY 150 • MINDFUL</h4>
                  <p className="gallery-card-sub">Morning Flow & Evening Reset</p>
                  <div className="gallery-progress-bar">
                    <div className="progress-fill fill-lime" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 6: Life & Social */}
              <div
                className="space-gallery-card"
                onClick={() => onOpenQuickCapture()}
              >
                <div className="gallery-card-banner banner-social">
                  <div className="card-badge-pill">SOCIAL</div>
                  <GlassWater size={14} className="card-link-icon" />
                </div>
                <div className="gallery-card-body">
                  <h4 className="gallery-card-name">SOC 180 • LIFESTYLE</h4>
                  <p className="gallery-card-sub">Weekend Recharge & Travel</p>
                  <div className="gallery-progress-bar">
                    <div className="progress-fill fill-lavender" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: assignment tracker (matching reference photo) */}
          <section className="notion-center-section">
            <div className="center-section-header">
              <div className="section-title-wrap">
                <h3 className="center-section-title">🔘 assignment tracker</h3>
              </div>
              <div className="section-tabs-bar">
                <button className="tab-pill-btn active">★ current ▾</button>
                <button
                  className="tab-pill-btn btn-new-accent"
                  onClick={onOpenQuickCapture}
                >
                  New ▾
                </button>
              </div>
            </div>

            {/* 3 Kanban Column Cards */}
            <div className="assignment-tracker-grid">
              {/* Card 1: BIO 121 / ANLT 410 */}
              <div className="assignment-kanban-card">
                <div className="kanban-card-top-tag">
                  <Sparkles size={12} className="tag-sparkle" />
                  <span className="kanban-course-code">BIO 121 • ANLT 410</span>
                  <span className="kanban-item-count">1</span>
                </div>
                <h5 className="kanban-task-title">anatomy systems summary</h5>
                <div className="kanban-status-badge status-in-progress">
                  <span className="status-dot"></span>
                  <span>In progress</span>
                </div>
                <span className="kanban-due-date">4 February 2026</span>
                <button className="btn-kanban-add" onClick={onOpenQuickCapture}>
                  <Plus size={12} />
                  <span>New page</span>
                </button>
              </div>

              {/* Card 2: COM 160 / CS-PYTHON */}
              <div className="assignment-kanban-card">
                <div className="kanban-card-top-tag">
                  <Sparkles size={12} className="tag-sparkle" />
                  <span className="kanban-course-code">COM 160 • CS-PYTHON</span>
                  <span className="kanban-item-count">1</span>
                </div>
                <h5 className="kanban-task-title">therapeutic communication essay</h5>
                <div className="kanban-status-badge status-in-progress">
                  <span className="status-dot"></span>
                  <span>In progress</span>
                </div>
                <span className="kanban-due-date">31 January 2026</span>
                <button className="btn-kanban-add" onClick={onOpenQuickCapture}>
                  <Plus size={12} />
                  <span>New page</span>
                </button>
              </div>

              {/* Card 3: ETH 130 / VARSITY TENNIS */}
              <div className="assignment-kanban-card">
                <div className="kanban-card-top-tag">
                  <Sparkles size={12} className="tag-sparkle" />
                  <span className="kanban-course-code">ETH 130 • TENNIS</span>
                  <span className="kanban-item-count">1</span>
                </div>
                <h5 className="kanban-task-title">ethicl dilemma analysis</h5>
                <div className="kanban-status-badge status-not-started">
                  <span className="status-dot"></span>
                  <span>Not started</span>
                </div>
                <span className="kanban-due-date">14 February 2026</span>
                <button className="btn-kanban-add" onClick={onOpenQuickCapture}>
                  <Plus size={12} />
                  <span>New page</span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* =========================================================
            RIGHT COLUMN (~24%):
            my affirmations 🍒 + Floral Photo + entries 🫧 + Envelope + reminders 🍸 + Blair Waldorf Quote
            ========================================================= */}
        <aside className="personal-col-right">
          {/* my affirmations 🍒 */}
          <div className="notion-block-box">
            <h4 className="notion-section-label">my affirmations 🍒</h4>
            <div className="affirmations-stack">
              {affirmations.map(aff => {
                const isOpen = expandedAffirmation === aff.id;
                return (
                  <div key={aff.id} className="affirmation-toggle-item">
                    <button
                      className="affirmation-row-btn"
                      onClick={() => setExpandedAffirmation(isOpen ? null : aff.id)}
                    >
                      <span className="toggle-triangle">{isOpen ? '▼' : '▶'}</span>
                      <span className="affirmation-title-text">{aff.title}</span>
                    </button>
                    {isOpen && (
                      <p className="affirmation-detail-text">{aff.detail}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Blooming Pink Lilies Floral Image Card */}
          <div className="notion-image-card">
            <img
              src="/assets/pink_lilies.jpg"
              alt="Blooming pink lilies"
              className="notion-card-photo"
            />
          </div>

          {/* entries 🫧 */}
          <div className="notion-block-box">
            <h4 className="notion-section-label">entries 🫧</h4>
            <div className="entries-links-stack">
              <button className="entry-link-row" onClick={onOpenQuickCapture}>
                <span className="entry-slash">/</span>
                <span className="entry-label">journal</span>
              </button>
              <button className="entry-link-row" onClick={onOpenNotes}>
                <span className="entry-slash">/</span>
                <span className="entry-label">mind dump</span>
              </button>
            </div>
          </div>

          {/* Cream Envelope / Stationery Letter Graphic Card */}
          <div className="envelope-graphic-card">
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              <span className="envelope-text">Aïda’s Letters & Notes</span>
            </div>
          </div>

          {/* reminders 🍸 */}
          <div className="notion-block-box">
            <h4 className="notion-section-label">reminders 🍸</h4>
            <div className="reminders-bullet-stack">
              {reminders.map(rem => (
                <div
                  key={rem.id}
                  className="reminder-bullet-row"
                  onClick={() => toggleReminder(rem.id)}
                >
                  <span className="reminder-bullet-dot">•</span>
                  <span
                    className={`reminder-text ${rem.completed ? 'completed' : ''}`}
                  >
                    {rem.text}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="btn-add-reminder"
              onClick={() => {
                const newRem = prompt('Enter a new reminder:');
                if (newRem && newRem.trim()) {
                  setReminders(prev => [
                    ...prev,
                    { id: `r-${Date.now()}`, text: newRem.trim(), completed: false }
                  ]);
                }
              }}
            >
              <Plus size={11} />
              <span>Add reminder</span>
            </button>
          </div>

          {/* WHAT WOULD BLAIR WALDORF DO? Quote Poster Card */}
          <div className="blair-waldorf-card">
            <div className="blair-text-group">
              <span className="blair-line-1">WHAT</span>
              <span className="blair-line-2">WOULD</span>
              <span className="blair-line-3">BLAIR</span>
              <span className="blair-line-4">WALDORF</span>
              <span className="blair-line-5">DO?</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
