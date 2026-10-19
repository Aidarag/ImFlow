import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Task,
  FixedCommitment,
  Course,
  SkillPractice,
  TennisJournalEntry,
  Project,
  InternshipApp,
  ContentItem,
  RoutineItem,
  HydrationState,
  UserSettings,
  BrainDumpSuggestion,
  SpaceId
} from '../types';
import {
  defaultTasks,
  defaultCourses,
  defaultSkills,
  defaultFixedCommitments,
  defaultTennisEntries,
  defaultProjects,
  defaultInternshipApps,
  defaultContentItems,
  defaultRoutines,
  defaultHydration,
  defaultSettings
} from '../data/defaultData';

export type MainTab = 'today' | 'inbox' | 'calendar' | 'spaces' | 'review' | 'settings';

interface AppContextType {
  tasks: Task[];
  courses: Course[];
  skills: SkillPractice[];
  fixedCommitments: FixedCommitment[];
  tennisEntries: TennisJournalEntry[];
  projects: Project[];
  internshipApps: InternshipApp[];
  contentItems: ContentItem[];
  routines: RoutineItem[];
  hydration: HydrationState;
  settings: UserSettings;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  activeSpaceTab: SpaceId;
  setActiveSpaceTab: (space: SpaceId) => void;
  isQuickCaptureOpen: boolean;
  setIsQuickCaptureOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lastActiveTask: Task | null;
  
  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  reopenTask: (id: string) => void;
  setTaskStoppingPoint: (id: string, stoppingPoint: string, nextStep: string) => void;
  submitAssignment: (id: string, receiptNote: string) => void;
  breakdownTaskWithAI: (id: string) => void;
  
  // Hydration
  logHydration: (amount?: number) => void;
  undoHydration: () => void;
  
  // Low Energy Mode
  toggleLowEnergyMode: () => void;
  
  // Routine actions
  toggleRoutine: (id: string) => void;
  addRoutine: (item: Omit<RoutineItem, 'id'>) => void;
  
  // Skill Practice
  recordSkillPracticeSession: (skillId: string, minutes: number, stoppingNote: string, nextAction: string) => void;
  
  // Tennis
  addTennisEntry: (entry: Omit<TennisJournalEntry, 'id'>) => void;
  
  // Projects & Internships & Content
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addInternshipApp: (app: Omit<InternshipApp, 'id'>) => void;
  updateInternshipApp: (id: string, updates: Partial<InternshipApp>) => void;
  addContentItem: (item: Omit<ContentItem, 'id'>) => void;
  updateContentItem: (id: string, updates: Partial<ContentItem>) => void;
  
  // Brain Dump
  processBrainDumpWithAI: (rawText: string) => BrainDumpSuggestion[];
  applyBrainDumpSuggestions: (suggestions: BrainDumpSuggestion[]) => void;
  
  // 5-Sentence Recap
  generateFiveSentenceRecap: () => string[];
  
  // Settings & Storage
  updateSettings: (updates: Partial<UserSettings>) => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TASKS: 'imflow_tasks_v1',
  COURSES: 'imflow_courses_v1',
  SKILLS: 'imflow_skills_v1',
  FIXED: 'imflow_fixed_v1',
  TENNIS: 'imflow_tennis_v1',
  PROJECTS: 'imflow_projects_v1',
  INTERNSHIPS: 'imflow_internships_v1',
  CONTENT: 'imflow_content_v1',
  ROUTINES: 'imflow_routines_v1',
  HYDRATION: 'imflow_hydration_v1',
  SETTINGS: 'imflow_settings_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    return saved ? JSON.parse(saved) : defaultCourses;
  });

  const [skills, setSkills] = useState<SkillPractice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : defaultSkills;
  });

  const [fixedCommitments, setFixedCommitments] = useState<FixedCommitment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FIXED);
    return saved ? JSON.parse(saved) : defaultFixedCommitments;
  });

  const [tennisEntries, setTennisEntries] = useState<TennisJournalEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TENNIS);
    return saved ? JSON.parse(saved) : defaultTennisEntries;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [internshipApps, setInternshipApps] = useState<InternshipApp[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTERNSHIPS);
    return saved ? JSON.parse(saved) : defaultInternshipApps;
  });

  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
    return saved ? JSON.parse(saved) : defaultContentItems;
  });

  const [routines, setRoutines] = useState<RoutineItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    return saved ? JSON.parse(saved) : defaultRoutines;
  });

  const [hydration, setHydration] = useState<HydrationState>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HYDRATION);
    return saved ? JSON.parse(saved) : defaultHydration;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [activeTab, setActiveTab] = useState<MainTab>('today');
  const [activeSpaceTab, setActiveSpaceTab] = useState<SpaceId>('school');
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FIXED, JSON.stringify(fixedCommitments));
  }, [fixedCommitments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TENNIS, JSON.stringify(tennisEntries));
  }, [tennisEntries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTERNSHIPS, JSON.stringify(internshipApps));
  }, [internshipApps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(contentItems));
  }, [contentItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HYDRATION, JSON.stringify(hydration));
  }, [hydration]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    if (settings.theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  }, [settings]);

  // Find last active task with a saved stopping point
  const lastActiveTask = tasks.find(t => t.stoppingPoint && t.status !== 'completed') || tasks[0] || null;

  // Task actions
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>): Task => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completeTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          return {
            ...t,
            status: 'completed',
            completedAt: new Date().toISOString()
          };
        }
        return t;
      })
    );
    // Trigger celebratory subtle confetti
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10B981', '#6366F1', '#F59E0B', '#38BDF8']
      });
    } catch {
      // ignore
    }
  };

  const reopenTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'planned', completedAt: undefined } : t))
    );
  };

  const setTaskStoppingPoint = (id: string, stoppingPoint: string, nextStep: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, stoppingPoint, nextStep, status: 'in_progress' } : t))
    );
  };

  const submitAssignment = (id: string, receiptNote: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              isSubmitted: true,
              submissionReceipt: receiptNote || `Recorded on ${new Date().toLocaleDateString()}`
            }
          : t
      )
    );
  };

  const breakdownTaskWithAI = (id: string) => {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;

    let generatedSubtasks: { id: string; title: string; completed: boolean }[] = [];
    const titleLower = targetTask.title.toLowerCase();

    if (titleLower.includes('predictive') || titleLower.includes('analytics') || titleLower.includes('assignment')) {
      generatedSubtasks = [
        { id: `sub-${Date.now()}-1`, title: 'Review lecture slides & assignment rubric specifications', completed: false },
        { id: `sub-${Date.now()}-2`, title: 'Verify data clean state and handle missing categorical variables', completed: false },
        { id: `sub-${Date.now()}-3`, title: 'Execute model training & extract performance metrics (RMSE/Accuracy)', completed: false },
        { id: `sub-${Date.now()}-4`, title: 'Draft interpretation section and export PDF submission packet', completed: false }
      ];
    } else if (titleLower.includes('python') || titleLower.includes('code') || titleLower.includes('study')) {
      generatedSubtasks = [
        { id: `sub-${Date.now()}-1`, title: 'Open Jupyter notebook & import pandas/numpy libraries', completed: false },
        { id: `sub-${Date.now()}-2`, title: 'Work through 2 practice exercises without looking at solution', completed: false },
        { id: `sub-${Date.now()}-3`, title: 'Document any confusing syntax or edge case in stopping note', completed: false }
      ];
    } else if (titleLower.includes('tennis') || titleLower.includes('practice')) {
      generatedSubtasks = [
        { id: `sub-${Date.now()}-1`, title: 'Check equipment tension and hydrate with electrolytes', completed: false },
        { id: `sub-${Date.now()}-2`, title: 'Complete 10-minute dynamic shoulder and footwork warmup', completed: false },
        { id: `sub-${Date.now()}-3`, title: 'Record post-practice reflection note in Tennis space', completed: false }
      ];
    } else {
      generatedSubtasks = [
        { id: `sub-${Date.now()}-1`, title: `Clarify first concrete action for "${targetTask.title}"`, completed: false },
        { id: `sub-${Date.now()}-2`, title: 'Set up materials and eliminate active distractions (25 min block)', completed: false },
        { id: `sub-${Date.now()}-3`, title: 'Review stopping point before concluding session', completed: false }
      ];
    }

    updateTask(id, { subtasks: [...targetTask.subtasks, ...generatedSubtasks] });
  };

  // Hydration
  const logHydration = (amount?: number) => {
    const addAmount = amount || hydration.glassSizeMl;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setHydration(prev => ({
      ...prev,
      currentMl: prev.currentMl + addAmount,
      history: [...prev.history, { timestamp: timeStr, amountMl: addAmount }]
    }));
  };

  const undoHydration = () => {
    setHydration(prev => {
      if (prev.history.length === 0) return prev;
      const lastEntry = prev.history[prev.history.length - 1];
      return {
        ...prev,
        currentMl: Math.max(0, prev.currentMl - lastEntry.amountMl),
        history: prev.history.slice(0, -1)
      };
    });
  };

  // Low Energy Mode
  const toggleLowEnergyMode = () => {
    setSettings(prev => ({ ...prev, isLowEnergyMode: !prev.isLowEnergyMode }));
  };

  // Routines
  const toggleRoutine = (id: string) => {
    setRoutines(prev =>
      prev.map(r => (r.id === id ? { ...r, isCompletedToday: !r.isCompletedToday } : r))
    );
  };

  const addRoutine = (item: Omit<RoutineItem, 'id'>) => {
    setRoutines(prev => [
      ...prev,
      { ...item, id: `routine-${Date.now()}-${Math.random().toString(36).substr(2, 4)}` }
    ]);
  };

  // Skill Practice
  const recordSkillPracticeSession = (
    skillId: string,
    minutes: number,
    stoppingNote: string,
    nextAction: string
  ) => {
    setSkills(prev =>
      prev.map(s => {
        if (s.id === skillId) {
          return {
            ...s,
            completedMinutesToday: s.completedMinutesToday + minutes,
            totalSessions: s.totalSessions + 1,
            lastStoppingPoint: stoppingNote || s.lastStoppingPoint,
            nextAction: nextAction || s.nextAction
          };
        }
        return s;
      })
    );
  };

  // Tennis
  const addTennisEntry = (entry: Omit<TennisJournalEntry, 'id'>) => {
    setTennisEntries(prev => [
      { ...entry, id: `tennis-${Date.now()}` },
      ...prev
    ]);
  };

  // Projects, Internships, Content
  const addProject = (proj: Omit<Project, 'id'>) => {
    setProjects(prev => [...prev, { ...proj, id: `proj-${Date.now()}` }]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const addInternshipApp = (app: Omit<InternshipApp, 'id'>) => {
    setInternshipApps(prev => [...prev, { ...app, id: `app-${Date.now()}` }]);
  };

  const updateInternshipApp = (id: string, updates: Partial<InternshipApp>) => {
    setInternshipApps(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const addContentItem = (item: Omit<ContentItem, 'id'>) => {
    setContentItems(prev => [...prev, { ...item, id: `content-${Date.now()}` }]);
  };

  const updateContentItem = (id: string, updates: Partial<ContentItem>) => {
    setContentItems(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  // Brain Dump AI logic (Respects principle: do not invent deadlines!)
  const processBrainDumpWithAI = (rawText: string): BrainDumpSuggestion[] => {
    if (!rawText.trim()) return [];

    // Split sentences or list items
    const segments = rawText
      .split(/\n|\band\b|\balso\b|\;|\./gi)
      .map(s => s.trim())
      .filter(s => s.length > 3);

    return segments.map((seg, idx) => {
      const lower = seg.toLowerCase();
      let space: SpaceId = 'inbox';
      let priority: 'high' | 'medium' | 'low' = 'medium';
      let estimated = 30;
      let nextStep = 'Clarify first 5-minute action';

      if (lower.includes('analytics') || lower.includes('homework') || lower.includes('class') || lower.includes('exam') || lower.includes('assignment')) {
        space = 'school';
        priority = 'high';
        estimated = 60;
        nextStep = 'Open course portal & review prompt specifications';
      } else if (lower.includes('python') || lower.includes('code') || lower.includes('sql') || lower.includes('power bi') || lower.includes('study')) {
        space = 'learning';
        priority = 'high';
        estimated = 45;
        nextStep = 'Open notebook and solve problem 1';
      } else if (lower.includes('tennis') || lower.includes('match') || lower.includes('practice') || lower.includes('string') || lower.includes('court')) {
        space = 'tennis';
        priority = 'medium';
        estimated = 20;
        nextStep = 'Pack athletic bag & hydrate';
      } else if (lower.includes('content') || lower.includes('video') || lower.includes('post') || lower.includes('adventure') || lower.includes('film')) {
        space = 'content';
        priority = 'medium';
        estimated = 35;
        nextStep = 'Draft 2-sentence hook and outline 3 key shots';
      } else if (lower.includes('project') || lower.includes('evida') || lower.includes('shalom') || lower.includes('timesheet') || lower.includes('internship') || lower.includes('resume')) {
        space = 'projects';
        priority = 'high';
        estimated = 45;
        nextStep = 'Review latest GitHub branch or document draft';
      } else if (lower.includes('clean') || lower.includes('buy') || lower.includes('detergent') || lower.includes('laundry') || lower.includes('call') || lower.includes('groceries')) {
        space = 'life';
        priority = 'medium';
        estimated = 20;
        nextStep = 'Add to routine / shopping checklist';
      }

      // Capitalize first letter
      const cleanTitle = seg.charAt(0).toUpperCase() + seg.slice(1);

      return {
        id: `sug-${Date.now()}-${idx}`,
        originalText: seg,
        suggestedTitle: cleanTitle,
        suggestedSpace: space,
        suggestedNextStep: nextStep,
        estimatedMinutes: estimated,
        suggestedPriority: priority,
        accepted: true
      };
    });
  };

  const applyBrainDumpSuggestions = (suggestions: BrainDumpSuggestion[]) => {
    const acceptedOnes = suggestions.filter(s => s.accepted !== false);
    const newTasks: Task[] = acceptedOnes.map(s => ({
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: s.suggestedTitle,
      spaceId: s.suggestedSpace,
      nextStep: s.suggestedNextStep,
      estimatedMinutes: s.estimatedMinutes || 30,
      priority: s.suggestedPriority,
      status: 'planned',
      isChosenPriority: false,
      subtasks: [],
      deadline: s.detectedDeadline, // No invented deadlines!
      createdAt: new Date().toISOString()
    }));

    setTasks(prev => [...newTasks, ...prev]);
  };

  // 5-Sentence Daily Learning Recap generator (Section 05 requirement)
  const generateFiveSentenceRecap = (): string[] => {
    const pySkill = skills.find(s => s.skillName === 'Python');
    const pyMinutes = pySkill?.completedMinutesToday || 0;
    const pyStop = pySkill?.lastStoppingPoint || 'data manipulation techniques';
    const pyNext = pySkill?.nextAction || 'continue advanced dataset exercises';
    const courseTask = tasks.find(t => t.spaceId === 'school' && t.status === 'completed') || tasks.find(t => t.spaceId === 'school');

    const sentence1 = `Today’s primary academic and technical focus centered on ${courseTask?.courseOrProjectName || 'Predictive Analytics'} and structured algorithmic thinking.`;
    const sentence2 = `The core concept explored was understanding how feature extraction and data modeling directly guide executive decision-making.`;
    const sentence3 = `During ${pyMinutes > 0 ? `${pyMinutes} protected minutes of Python practice` : 'the dedicated learning session'}, progress was made on ${pyStop}.`;
    const sentence4 = `The most challenging aspect was managing parameter tuning and ensuring robust validation against overfitting.`;
    const sentence5 = `Tomorrow’s immediate next step is to ${pyNext}.`;

    return [sentence1, sentence2, sentence3, sentence4, sentence5];
  };

  // Settings & Storage
  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const exportDataJSON = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      tasks,
      courses,
      skills,
      fixedCommitments,
      tennisEntries,
      projects,
      internshipApps,
      contentItems,
      routines,
      hydration,
      settings
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.tasks) setTasks(data.tasks);
      if (data.courses) setCourses(data.courses);
      if (data.skills) setSkills(data.skills);
      if (data.fixedCommitments) setFixedCommitments(data.fixedCommitments);
      if (data.tennisEntries) setTennisEntries(data.tennisEntries);
      if (data.projects) setProjects(data.projects);
      if (data.internshipApps) setInternshipApps(data.internshipApps);
      if (data.contentItems) setContentItems(data.contentItems);
      if (data.routines) setRoutines(data.routines);
      if (data.hydration) setHydration(data.hydration);
      if (data.settings) setSettings(data.settings);
      return true;
    } catch {
      return false;
    }
  };

  const resetAllData = () => {
    localStorage.clear();
    setTasks(defaultTasks);
    setCourses(defaultCourses);
    setSkills(defaultSkills);
    setFixedCommitments(defaultFixedCommitments);
    setTennisEntries(defaultTennisEntries);
    setProjects(defaultProjects);
    setInternshipApps(defaultInternshipApps);
    setContentItems(defaultContentItems);
    setRoutines(defaultRoutines);
    setHydration(defaultHydration);
    setSettings(defaultSettings);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        courses,
        skills,
        fixedCommitments,
        tennisEntries,
        projects,
        internshipApps,
        contentItems,
        routines,
        hydration,
        settings,
        activeTab,
        setActiveTab,
        activeSpaceTab,
        setActiveSpaceTab,
        isQuickCaptureOpen,
        setIsQuickCaptureOpen,
        searchQuery,
        setSearchQuery,
        lastActiveTask,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
        reopenTask,
        setTaskStoppingPoint,
        submitAssignment,
        breakdownTaskWithAI,
        logHydration,
        undoHydration,
        toggleLowEnergyMode,
        toggleRoutine,
        addRoutine,
        recordSkillPracticeSession,
        addTennisEntry,
        addProject,
        updateProject,
        addInternshipApp,
        updateInternshipApp,
        addContentItem,
        updateContentItem,
        processBrainDumpWithAI,
        applyBrainDumpSuggestions,
        generateFiveSentenceRecap,
        updateSettings,
        exportDataJSON,
        importDataJSON,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
