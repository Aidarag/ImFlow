import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Music,
  Quote,
  Calculator as CalcIcon,
  CheckCircle2,
  FileText,
  Volume2
} from 'lucide-react';

interface WidgetModalProps {
  type: 'calculator' | 'timer' | 'music' | 'quotes' | 'notes' | 'checklist' | null;
  onClose: () => void;
}

export const WidgetModals: React.FC<WidgetModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="canvas-modal-backdrop" onClick={onClose}>
      <div className="canvas-modal-card" onClick={e => e.stopPropagation()}>
        <div className="canvas-modal-header">
          <div className="canvas-modal-title-row">
            {type === 'calculator' && <CalcIcon size={18} className="text-lavender" />}
            {type === 'timer' && <Sparkles size={18} className="text-lime" />}
            {type === 'music' && <Music size={18} className="text-lavender" />}
            {type === 'quotes' && <Quote size={18} className="text-lime" />}
            {type === 'notes' && <FileText size={18} className="text-lavender" />}
            {type === 'checklist' && <CheckCircle2 size={18} className="text-lime" />}
            <h3 className="canvas-modal-title">
              {type === 'calculator' && 'Quick GPA & Analytics Calculator'}
              {type === 'timer' && 'Flow Focus Timer (Pomodoro)'}
              {type === 'music' && 'Focus Audio & Study Soundscapes'}
              {type === 'quotes' && 'Daily Flow Affirmations'}
              {type === 'notes' && 'Quick Scratchpad & Stopping Points'}
              {type === 'checklist' && 'Daily Student-Athlete Checklist'}
            </h3>
          </div>
          <button className="canvas-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="canvas-modal-body">
          {type === 'calculator' && <CalculatorWidget />}
          {type === 'timer' && <TimerWidget />}
          {type === 'music' && <MusicWidget />}
          {type === 'quotes' && <QuotesWidget />}
          {type === 'notes' && <NotesWidget />}
          {type === 'checklist' && <ChecklistWidget />}
        </div>
      </div>
    </div>
  );
};

const CalculatorWidget: React.FC = () => {
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleDigit = (digit: string) => {
    setCalcDisplay(prev => (prev === '0' ? digit : prev + digit));
  };

  const handleOperator = (op: string) => {
    setEquation(calcDisplay + ' ' + op + ' ');
    setCalcDisplay('0');
  };

  const handleClear = () => {
    setCalcDisplay('0');
    setEquation('');
  };

  const handleEquals = () => {
    try {
      const full = equation + calcDisplay;
      // safe eval for basic numbers
      const sanitized = full.replace(/×/g, '*').replace(/÷/g, '/');
      const res = Function(`'use strict'; return (${sanitized})`)();
      setCalcDisplay(String(Number(res.toFixed(4))));
      setEquation('');
    } catch {
      setCalcDisplay('Error');
    }
  };

  return (
    <div className="calc-widget-container">
      <div className="calc-display-box">
        <div className="calc-equation">{equation}</div>
        <div className="calc-main-num">{calcDisplay}</div>
      </div>
      <div className="calc-keypad-grid">
        <button className="calc-key op-key" onClick={handleClear}>C</button>
        <button className="calc-key op-key" onClick={() => setCalcDisplay(prev => String(-parseFloat(prev)))}>±</button>
        <button className="calc-key op-key" onClick={() => handleOperator('%')}>%</button>
        <button className="calc-key op-accent" onClick={() => handleOperator('÷')}>÷</button>

        <button className="calc-key" onClick={() => handleDigit('7')}>7</button>
        <button className="calc-key" onClick={() => handleDigit('8')}>8</button>
        <button className="calc-key" onClick={() => handleDigit('9')}>9</button>
        <button className="calc-key op-accent" onClick={() => handleOperator('×')}>×</button>

        <button className="calc-key" onClick={() => handleDigit('4')}>4</button>
        <button className="calc-key" onClick={() => handleDigit('5')}>5</button>
        <button className="calc-key" onClick={() => handleDigit('6')}>6</button>
        <button className="calc-key op-accent" onClick={() => handleOperator('-')}>-</button>

        <button className="calc-key" onClick={() => handleDigit('1')}>1</button>
        <button className="calc-key" onClick={() => handleDigit('2')}>2</button>
        <button className="calc-key" onClick={() => handleDigit('3')}>3</button>
        <button className="calc-key op-accent" onClick={() => handleOperator('+')}>+</button>

        <button className="calc-key span-two" onClick={() => handleDigit('0')}>0</button>
        <button className="calc-key" onClick={() => handleDigit('.')}>.</button>
        <button className="calc-key equals-key" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
};

const TimerWidget: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: any;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (newMode: 'focus' | 'break') => {
    setIsActive(false);
    setMode(newMode);
    setSecondsLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="timer-widget-container">
      <div className="timer-tabs">
        <button
          className={`timer-tab ${mode === 'focus' ? 'active' : ''}`}
          onClick={() => resetTimer('focus')}
        >
          25m Focus Block
        </button>
        <button
          className={`timer-tab ${mode === 'break' ? 'active' : ''}`}
          onClick={() => resetTimer('break')}
        >
          5m Rest & Hydrate
        </button>
      </div>

      <div className="timer-countdown-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="timer-controls">
        <button className="btn btn-primary" onClick={toggleTimer}>
          {isActive ? <Pause size={16} /> : <Play size={16} />}
          <span>{isActive ? 'Pause' : 'Start Focus'}</span>
        </button>
        <button className="btn btn-secondary" onClick={() => resetTimer(mode)}>
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
      <p className="timer-hint">
        Protected session for Aïda: Focus on Python pandas syntax or Predictive Analytics modeling.
      </p>
    </div>
  );
};

const MusicWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Lo-Fi Beats for Coding & Focus');

  const tracks = [
    'Lo-Fi Beats for Coding & Focus',
    'Rainfall on Tennis Court Roof',
    'Deep Theta Waves for Data Modeling',
    'Acoustic Cafe Study Session'
  ];

  return (
    <div className="music-widget-container">
      <div className="now-playing-banner">
        <Volume2 size={24} className={isPlaying ? 'text-lime animate-pulse' : 'text-lavender'} />
        <div>
          <span className="track-sub">Current Soundscape</span>
          <h4 className="track-name">{currentTrack}</h4>
        </div>
      </div>

      <div className="track-list">
        {tracks.map(t => (
          <div
            key={t}
            className={`track-item ${currentTrack === t ? 'active' : ''}`}
            onClick={() => {
              setCurrentTrack(t);
              setIsPlaying(true);
            }}
          >
            <span>{t}</span>
            {currentTrack === t && isPlaying && <span className="playing-dot">●</span>}
          </div>
        ))}
      </div>

      <div className="music-actions">
        <button
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? 'Pause Audio' : 'Play Soundscape'}</span>
        </button>
      </div>
    </div>
  );
};

const QuotesWidget: React.FC = () => {
  const quotes = [
    {
      text: 'Discipline over motivation every single time. Protect the practice, and let the rest flow.',
      author: 'Aïda’s Flow Principle'
    },
    {
      text: 'A long list does not tell you what to start. Choose one concrete action and begin.',
      author: 'Imflow Core Tenet'
    },
    {
      text: 'Never let homework invade court practice, and never let fatigue steal your 60 minutes of Python.',
      author: 'Student-Athlete Code'
    },
    {
      text: 'Finished working does not mean submitted. Record your receipt and rest in clarity.',
      author: 'Academics Rule'
    }
  ];

  const [index, setIndex] = useState(0);

  return (
    <div className="quotes-widget-container">
      <div className="quote-display-card">
        <Quote size={28} className="quote-icon" />
        <p className="quote-body">"{quotes[index].text}"</p>
        <span className="quote-author">— {quotes[index].author}</span>
      </div>
      <button
        className="btn btn-secondary"
        onClick={() => setIndex(prev => (prev + 1) % quotes.length)}
      >
        Next Flow Affirmation
      </button>
    </div>
  );
};

const NotesWidget: React.FC = () => {
  const [scratchText, setScratchText] = useState(() => {
    return localStorage.getItem('imflow_scratchpad') || 'Pandas Groupby formula:\ndf.groupby("category").agg({"sales": ["mean", "sum"]})\n\nTennis racket string tension: 52 lbs.';
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScratchText(e.target.value);
    localStorage.setItem('imflow_scratchpad', e.target.value);
  };

  return (
    <div className="notes-widget-container">
      <textarea
        className="textarea scratch-area"
        value={scratchText}
        onChange={handleChange}
        placeholder="Type any quick temporary formula, code snippet or court note..."
      />
      <span className="scratch-hint">Auto-saved locally in real time.</span>
    </div>
  );
};

const ChecklistWidget: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Morning hydration (500ml water)', done: true },
    { id: 2, text: 'Review Predictive Analytics slides', done: true },
    { id: 3, text: '60 minutes protected Python practice', done: false },
    { id: 4, text: 'Pack tennis racket, grips & towel', done: false },
    { id: 5, text: 'Post-practice stretch & foam roll', done: false },
    { id: 6, text: 'Check in with family / Mom & Dad', done: false }
  ]);

  const toggle = (id: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="checklist-widget-container">
      {items.map(i => (
        <div key={i.id} className="checklist-row" onClick={() => toggle(i.id)}>
          <input type="checkbox" checked={i.done} onChange={() => {}} />
          <span className={i.done ? 'line-through text-muted' : ''}>{i.text}</span>
        </div>
      ))}
    </div>
  );
};
