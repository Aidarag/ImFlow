export type SpaceId = 'school' | 'learning' | 'tennis' | 'projects' | 'content' | 'life' | 'inbox';

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'inbox' | 'planned' | 'in_progress' | 'waiting' | 'completed' | 'canceled';
export type EnergyLevel = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  nextStep?: string;
  spaceId: SpaceId;
  courseOrProjectName?: string;
  deadline?: string;
  plannedDate?: string;
  plannedTime?: string;
  estimatedMinutes?: number;
  priority: TaskPriority;
  energyLevel?: EnergyLevel;
  status: TaskStatus;
  isChosenPriority?: boolean; // Top priority for today
  notes?: string;
  stoppingPoint?: string;
  subtasks: Subtask[];
  isAssignment?: boolean;
  isSubmitted?: boolean;
  submissionReceipt?: string;
  createdAt: string;
  completedAt?: string;
  recurrence?: 'daily' | 'weekly' | 'none';
}

export interface FixedCommitment {
  id: string;
  title: string;
  type: 'class' | 'tennis' | 'gym' | 'work' | 'event' | 'personal';
  daysOfWeek: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  startTime: string; // '14:00'
  endTime: string;   // '15:30'
  location?: string;
  prepBufferMinutes?: number;
  isLocked: boolean;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  semester: string;
  instructor?: string;
  notes: string;
}

export interface SkillPractice {
  id: string;
  skillName: string;
  isProtected: boolean;
  targetDailyMinutes: number;
  completedMinutesToday: number;
  totalSessions: number;
  lastStoppingPoint: string;
  nextAction: string;
}

export interface TennisJournalEntry {
  id: string;
  date: string;
  type: 'practice' | 'match' | 'fitness' | 'drills';
  whatWentWell: string;
  needsPractice: string;
  nextFocus: string;
  durationMinutes: number;
}

export interface Project {
  id: string;
  name: string;
  goal: string;
  status: 'active' | 'paused' | 'completed';
  category: 'school' | 'campus' | 'portfolio' | 'client';
  nextMilestone: string;
  links: { label: string; url: string }[];
  waitingOn?: string;
}

export type ApplicationStage = 'Interested' | 'Applying' | 'Submitted' | 'Assessment' | 'Interview' | 'Closed';

export interface InternshipApp {
  id: string;
  company: string;
  role: string;
  location: string;
  stage: ApplicationStage;
  deadline?: string;
  notes: string;
  nextAction: string;
}

export type ContentStage = 'Idea' | 'Outline' | 'Draft' | 'Filming' | 'Editing' | 'Ready' | 'Published';

export interface ContentItem {
  id: string;
  title: string;
  account: 'Im’s Adventures' | 'Personal' | 'Campus / Org';
  format: 'Reels / TikTok' | 'YouTube' | 'Post / Carousel';
  stage: ContentStage;
  hook: string;
  outline: string;
  script: string;
  caption: string;
  targetDate?: string;
  assetsChecklist: { id: string; item: string; done: boolean }[];
}

export interface RoutineItem {
  id: string;
  category: 'cleaning' | 'hygiene' | 'shopping' | 'relationship';
  title: string;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'as_needed';
  priority?: 'Needed soon' | 'Can wait' | 'Optional'; // For shopping
  estimatedCost?: number;
  isCompletedToday?: boolean;
  contactNotes?: string;
}

export interface HydrationState {
  currentMl: number;
  targetMl: number;
  glassSizeMl: number;
  history: { timestamp: string; amountMl: number }[];
}

export interface UserSettings {
  userName: string;
  timezone: string;
  semester: string;
  protectedPythonMinutes: number;
  quietHoursStart: string;
  quietHoursEnd: string;
  isLowEnergyMode: boolean;
  theme: 'dark' | 'light';
}

export interface BrainDumpSuggestion {
  id: string;
  originalText: string;
  suggestedTitle: string;
  suggestedSpace: SpaceId;
  suggestedNextStep: string;
  estimatedMinutes?: number;
  suggestedPriority: TaskPriority;
  detectedDeadline?: string;
  accepted?: boolean;
}
