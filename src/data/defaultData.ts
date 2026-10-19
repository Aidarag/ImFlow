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
  UserSettings
} from '../types';

export const defaultSettings: UserSettings = {
  userName: 'Aïda Garba',
  timezone: 'America/New_York (EST)',
  semester: 'Fall 2026',
  protectedPythonMinutes: 60,
  quietHoursStart: '22:30',
  quietHoursEnd: '07:30',
  isLowEnergyMode: false,
  theme: 'light'
};

export const defaultCourses: Course[] = [
  {
    id: 'course-1',
    name: 'Predictive Analytics',
    code: 'ANLT-410',
    semester: 'Fall 2026',
    instructor: 'Dr. Vance',
    notes: 'Focus on regression modeling, classification trees and time-series forecasting.'
  },
  {
    id: 'course-2',
    name: 'Business Analytics',
    code: 'BUSA-380',
    semester: 'Fall 2026',
    instructor: 'Prof. Reynolds',
    notes: 'Data-driven decision making, executive dashboarding and KPIs.'
  },
  {
    id: 'course-3',
    name: 'Systems Analysis & Design',
    code: 'IS-330',
    semester: 'Fall 2026',
    instructor: 'Dr. Mensah',
    notes: 'Agile sprints, user stories, UML diagrams and entity-relationship models.'
  }
];

export const defaultSkills: SkillPractice[] = [
  {
    id: 'skill-1',
    skillName: 'Python',
    isProtected: true,
    targetDailyMinutes: 60,
    completedMinutesToday: 35,
    totalSessions: 24,
    lastStoppingPoint: 'Pandas groupby aggregation and Lambda functions on customer dataset.',
    nextAction: 'Write function to compute monthly moving average on sales data'
  },
  {
    id: 'skill-2',
    skillName: 'SQL & Database Design',
    isProtected: false,
    targetDailyMinutes: 30,
    completedMinutesToday: 0,
    totalSessions: 14,
    lastStoppingPoint: 'Window functions (ROW_NUMBER vs DENSE_RANK)',
    nextAction: 'Practice 3 LeetCode SQL Medium challenges'
  },
  {
    id: 'skill-3',
    skillName: 'Power BI / Dashboarding',
    isProtected: false,
    targetDailyMinutes: 30,
    completedMinutesToday: 0,
    totalSessions: 9,
    lastStoppingPoint: 'DAX measures for Year-over-Year margin growth',
    nextAction: 'Finalize interactive sales filter panel'
  }
];

export const defaultFixedCommitments: FixedCommitment[] = [
  {
    id: 'fix-1',
    title: 'Predictive Analytics Lecture',
    type: 'class',
    daysOfWeek: [1, 3], // Mon, Wed
    startTime: '10:00',
    endTime: '11:30',
    location: 'Hall B - Room 204',
    prepBufferMinutes: 15,
    isLocked: true
  },
  {
    id: 'fix-2',
    title: 'Systems Analysis & Design Lab',
    type: 'class',
    daysOfWeek: [2, 4], // Tue, Thu
    startTime: '13:00',
    endTime: '14:30',
    location: 'Tech Center Lab 3',
    prepBufferMinutes: 10,
    isLocked: true
  },
  {
    id: 'fix-3',
    title: 'Tennis Team Practice',
    type: 'tennis',
    daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
    startTime: '16:00',
    endTime: '17:45',
    location: 'Varsity Courts 1 & 2',
    prepBufferMinutes: 20,
    isLocked: true
  },
  {
    id: 'fix-4',
    title: 'Gym & Recovery Session',
    type: 'gym',
    daysOfWeek: [2, 6], // Tue, Sat
    startTime: '08:30',
    endTime: '09:45',
    location: 'Campus Athletic Gym',
    prepBufferMinutes: 15,
    isLocked: false
  }
];

export const defaultTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Predictive Analytics Milestone 2: Model Evaluation',
    nextStep: 'Calculate RMSE and Confusion Matrix in Jupyter Notebook',
    spaceId: 'school',
    courseOrProjectName: 'Predictive Analytics',
    deadline: '2026-10-23T23:59:00',
    plannedDate: '2026-10-19',
    plannedTime: '14:45',
    estimatedMinutes: 50,
    priority: 'high',
    energyLevel: 'high',
    status: 'in_progress',
    isChosenPriority: true,
    stoppingPoint: 'Data cleaning completed; ROC curves plotted. Next: write interpretation paragraph.',
    subtasks: [
      { id: 'sub-1', title: 'Plot ROC Curve & Precision-Recall curve', completed: true },
      { id: 'sub-2', title: 'Compute cross-validated accuracy score', completed: true },
      { id: 'sub-3', title: 'Write 3-sentence summary of findings for Dr. Vance', completed: false }
    ],
    isAssignment: true,
    isSubmitted: false,
    createdAt: '2026-10-18T14:00:00'
  },
  {
    id: 'task-2',
    title: 'Protected Python Study Session: Data Structures & Pandas',
    nextStep: 'Open notebook and solve problem 4 (groupby filter)',
    spaceId: 'learning',
    courseOrProjectName: 'Python Practice',
    plannedDate: '2026-10-19',
    plannedTime: '11:45',
    estimatedMinutes: 45,
    priority: 'high',
    energyLevel: 'medium',
    status: 'planned',
    isChosenPriority: true,
    stoppingPoint: 'Finished dictionary comprehension review. Next is custom lambda aggregation.',
    subtasks: [
      { id: 'sub-4', title: 'Solve 2 dataframe transformation exercises', completed: false },
      { id: 'sub-5', title: 'Record stopping note & next question', completed: false }
    ],
    createdAt: '2026-10-18T10:00:00'
  },
  {
    id: 'task-3',
    title: 'Pre-Match Tennis String Check & Hydration Prep',
    nextStep: 'Check racket tension and pack electrolyte bottle for practice',
    spaceId: 'tennis',
    courseOrProjectName: 'Varsity Tennis',
    plannedDate: '2026-10-19',
    plannedTime: '15:35',
    estimatedMinutes: 15,
    priority: 'medium',
    energyLevel: 'low',
    status: 'planned',
    isChosenPriority: true,
    subtasks: [
      { id: 'sub-6', title: 'Check grip tape freshness', completed: true },
      { id: 'sub-7', title: 'Pack towel and spare overgrip', completed: false }
    ],
    createdAt: '2026-10-18T16:00:00'
  },
  {
    id: 'task-4',
    title: 'Shalom Recovery AI: Update Prompt Template & Test Stream',
    nextStep: 'Verify response latency on conversational agent endpoint',
    spaceId: 'projects',
    courseOrProjectName: 'Shalom Recovery AI',
    deadline: '2026-10-25T18:00:00',
    plannedDate: '2026-10-20',
    estimatedMinutes: 60,
    priority: 'medium',
    energyLevel: 'high',
    status: 'planned',
    isChosenPriority: false,
    subtasks: [
      { id: 'sub-8', title: 'Test empathetic tone constraints', completed: true },
      { id: 'sub-9', title: 'Document latency benchmarks', completed: false }
    ],
    createdAt: '2026-10-17T11:00:00'
  },
  {
    id: 'task-5',
    title: 'Im’s Adventures: Edit Video Clip on Campus Tour',
    nextStep: 'Export draft B-roll sequence and add voiceover caption',
    spaceId: 'content',
    courseOrProjectName: 'Im’s Adventures',
    deadline: '2026-10-24T12:00:00',
    plannedDate: '2026-10-20',
    estimatedMinutes: 40,
    priority: 'medium',
    energyLevel: 'medium',
    status: 'planned',
    isChosenPriority: false,
    subtasks: [],
    createdAt: '2026-10-16T19:00:00'
  },
  {
    id: 'task-6',
    title: 'Call Family for weekly check-in',
    nextStep: 'Dial after dinner around 7:30 PM',
    spaceId: 'life',
    courseOrProjectName: 'Family & Friends',
    plannedDate: '2026-10-19',
    estimatedMinutes: 25,
    priority: 'medium',
    energyLevel: 'low',
    status: 'planned',
    isChosenPriority: false,
    subtasks: [],
    createdAt: '2026-10-18T09:00:00'
  }
];

export const defaultTennisEntries: TennisJournalEntry[] = [
  {
    id: 'ten-1',
    date: '2026-10-16',
    type: 'practice',
    whatWentWell: 'Deep cross-court backhands had consistent spin and clearance over net.',
    needsPractice: 'First serve percentage dropped when fatigue hit after 45 minutes.',
    nextFocus: 'Rhythm toss on serve and early shoulder turn on high forehand return.',
    durationMinutes: 90
  },
  {
    id: 'ten-2',
    date: '2026-10-14',
    type: 'drills',
    whatWentWell: 'Footwork split-step timing felt intuitive at the baseline.',
    needsPractice: 'Transition volleys at net were slightly rushed.',
    nextFocus: 'Stay low through contact on approach shots.',
    durationMinutes: 75
  }
];

export const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Digital Timesheet App',
    goal: 'Automate weekly hours tracking and supervisor approvals for student staff.',
    status: 'active',
    category: 'campus',
    nextMilestone: 'User testing with 4 student workers',
    links: [
      { label: 'Figma Prototype', url: '#' },
      { label: 'GitHub Repository', url: '#' }
    ]
  },
  {
    id: 'proj-2',
    name: 'Shalom Recovery AI',
    goal: 'AI-assisted recovery support companion with strict safety & empathetic tone filters.',
    status: 'active',
    category: 'portfolio',
    nextMilestone: 'Sprint review on conversation state engine',
    links: [{ label: 'Live Demo', url: '#' }]
  },
  {
    id: 'proj-3',
    name: 'Evida Healthcare Platform',
    goal: 'Streamline patient health intake and scheduling analytics.',
    status: 'active',
    category: 'client',
    nextMilestone: 'HIPAA compliant auth workflow review',
    links: [{ label: 'Design System', url: '#' }]
  },
  {
    id: 'proj-4',
    name: 'ISA Website Redesign',
    goal: 'Modern responsive portal for International Student Association.',
    status: 'active',
    category: 'campus',
    nextMilestone: 'Event calendar integration with RSVP',
    links: [{ label: 'Staging Site', url: '#' }]
  }
];

export const defaultInternshipApps: InternshipApp[] = [
  {
    id: 'app-1',
    company: 'Morgan Stanley',
    role: 'Summer 2027 Technology Analyst - Data Analytics',
    location: 'New York, NY',
    stage: 'Assessment',
    deadline: '2026-10-28',
    notes: 'Completed initial application. HackerRank coding assessment due in 7 days.',
    nextAction: 'Review LeetCode array algorithms and Python complexity'
  },
  {
    id: 'app-2',
    company: 'Microsoft',
    role: 'Software Engineering & Data Intern',
    location: 'Redmond, WA',
    stage: 'Applying',
    deadline: '2026-11-05',
    notes: 'Tailored resume emphasizing Predictive Analytics and Timesheet project.',
    nextAction: 'Draft 3 bullet points on Shalom Recovery AI impact'
  },
  {
    id: 'app-3',
    company: 'Deloitte',
    role: 'Analytics & Cognitive Consultant Intern',
    location: 'Atlanta, GA',
    stage: 'Interested',
    deadline: '2026-11-15',
    notes: 'Met campus recruiter at fall career fair.',
    nextAction: 'Send polite follow-up LinkedIn message referencing conversation'
  }
];

export const defaultContentItems: ContentItem[] = [
  {
    id: 'cnt-1',
    title: 'A Day in the Life: Analytics Major & Varsity Tennis Player',
    account: 'Im’s Adventures',
    format: 'Reels / TikTok',
    stage: 'Editing',
    hook: 'People think student-athletes don’t have time for coding — here is how I protect my Python block every day.',
    outline: 'Morning gym -> Predictive Analytics lecture -> Court practice -> Quiet evening library study.',
    script: 'Wake up at 7:30. Quick hydration. Class at 10. At 4 PM we hit the courts for match prep. The secret is never letting homework invade court time, and never letting tennis steal my 60 minutes of Python.',
    caption: 'Discipline beats motivation every single time. 🎾💻 How do you balance sports and study? #studentathlete #womenintech #collegelife',
    targetDate: '2026-10-22',
    assetsChecklist: [
      { id: 'as-1', item: 'Morning smoothie B-roll', done: true },
      { id: 'as-2', item: 'Forehand rally clip Court 1', done: true },
      { id: 'as-3', item: 'Terminal running Python script screen recording', done: false }
    ]
  },
  {
    id: 'cnt-2',
    title: 'Demystifying ROC Curves in 60 Seconds',
    account: 'Personal',
    format: 'Post / Carousel',
    stage: 'Idea',
    hook: 'What does True Positive Rate vs False Positive Rate actually mean in plain English?',
    outline: 'Slide 1: Confusion matrix simplified. Slide 2: The tradeoff curve. Slide 3: When accuracy is a trap.',
    script: '',
    caption: 'Understanding model evaluation beyond simple accuracy.',
    targetDate: '2026-10-26',
    assetsChecklist: []
  }
];

export const defaultRoutines: RoutineItem[] = [
  {
    id: 'rt-1',
    category: 'cleaning',
    title: 'Weekly Room Vacuum & Dust Desk',
    frequency: 'weekly',
    isCompletedToday: false
  },
  {
    id: 'rt-2',
    category: 'cleaning',
    title: 'Tennis Gear & Towels Laundry',
    frequency: 'weekly',
    isCompletedToday: false
  },
  {
    id: 'rt-3',
    category: 'hygiene',
    title: 'Post-practice Foam Rolling & Stretch (15 min)',
    frequency: 'daily',
    isCompletedToday: false
  },
  {
    id: 'rt-4',
    category: 'shopping',
    title: 'Eco Laundry Detergent (Lavender)',
    frequency: 'as_needed',
    priority: 'Needed soon',
    estimatedCost: 14.99,
    isCompletedToday: false
  },
  {
    id: 'rt-5',
    category: 'shopping',
    title: 'Wilson Pro Overgrip 3-Pack (White)',
    frequency: 'as_needed',
    priority: 'Needed soon',
    estimatedCost: 8.50,
    isCompletedToday: false
  },
  {
    id: 'rt-6',
    category: 'shopping',
    title: 'High-speed USB-C to HDMI cable for dorm monitor',
    frequency: 'as_needed',
    priority: 'Can wait',
    estimatedCost: 18.00,
    isCompletedToday: false
  },
  {
    id: 'rt-7',
    category: 'relationship',
    title: 'Call Mom & Dad (Sunday check-in)',
    frequency: 'weekly',
    contactNotes: 'Share news about tennis team match and upcoming semester break plan.',
    isCompletedToday: false
  }
];

export const defaultHydration: HydrationState = {
  currentMl: 1250,
  targetMl: 2500,
  glassSizeMl: 250,
  history: [
    { timestamp: '08:15', amountMl: 250 },
    { timestamp: '10:30', amountMl: 250 },
    { timestamp: '12:45', amountMl: 250 },
    { timestamp: '14:20', amountMl: 500 }
  ]
};
