// User & Auth
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Profile extends User {
  bio?: string;
  githubUsername?: string;
  website?: string;
  skills: string[];
}

// Multi-Organization Model
export type OrganizationRole = 'Owner' | 'Admin' | 'Member' | 'Guest';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  memberCount: number;
  activeProjectsCount: number;
  createdAt: string;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  user: User;
  orgRole: OrganizationRole;
  stage: MemberStage;
  rank: Rank;
  contributionScore: number;
  tasksCompleted: number;
  status: MemberStatus;
  joinedAt: string;
}

// Stage Progression Model
export type MemberStage =
  | 'Applicant'
  | 'Trial'
  | 'Contractor'
  | 'Active Contributor'
  | 'Senior Contributor'
  | 'Paid Contractor'
  | 'Core Team';

export type MemberStatus =
  | 'Active'
  | 'Warning'
  | 'Probation'
  | 'Inactive'
  | 'Removed';

export interface Rank {
  title: string;
  level: number;
  badge: string;
}

// Projects Model
export type ProjectStatus =
  | 'Planning'
  | 'Active'
  | 'Paused'
  | 'Completed'
  | 'Archived';

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0 - 100
  startDate: string;
  targetEndDate: string;
  members: User[];
  completedTasksCount: number;
  totalTasksCount: number;
  milestonesCount: number;
  createdAt: string;
}

export interface ProjectMember {
  projectId: string;
  userId: string;
  user: User;
  role: string;
  assignedAt: string;
}

// Tasks & Milestones
export type TaskStatus = 'Backlog' | 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  dueDate: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  progress: number;
}

// Weekly Updates Feed
export interface WeeklyUpdate {
  id: string;
  organizationId: string;
  author: User;
  submittedAt: string;
  completedTasks: string[];
  inProgressTasks: string[];
  blockers: string[];
  nextPlans: string[];
}

// Coding Challenges
export type ChallengeType = 'Vibe Coding' | 'Traditional Coding' | 'Team Challenge';
export type ChallengeDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface Challenge {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: ChallengeDifficulty;
  deadline: string;
  participantsCount: number;
  aiAllowed: boolean;
  userSubmissionStatus?: 'Not Started' | 'In Progress' | 'Submitted' | 'Reviewed';
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  userId: string;
  codeUrl?: string;
  notes?: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  score?: number;
}

// Document Management
export type DocumentCategory =
  | 'PDF'
  | 'Project Doc'
  | 'Report'
  | 'Policy'
  | 'Meeting Notes'
  | 'Contract'
  | 'Tutorial';

export interface Document {
  id: string;
  organizationId: string;
  title: string;
  category: DocumentCategory;
  fileSize: string;
  fileType: string;
  url: string;
  author: User;
  updatedAt: string;
}

// Communication & Chat
export interface Channel {
  id: string;
  organizationId: string;
  name: string;
  type: 'general' | 'project' | 'announcement';
  description?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  channelId: string;
  sender: User;
  content: string;
  timestamp: string;
}

// Contracts & Progression
export interface Contract {
  id: string;
  organizationId: string;
  userId: string;
  user: User;
  contractType: 'Full-time' | 'Part-time' | 'Milestone-based' | 'Trial Contractor';
  startDate: string;
  endDate?: string;
  currentStage: MemberStage;
  performanceScore: number; // 0 - 100
  promotionEligible: boolean;
  earningsStatus: 'Up to Date' | 'Payment Pending' | 'Processing';
}

export interface PerformanceReview {
  id: string;
  userId: string;
  reviewer: User;
  score: number;
  feedback: string;
  createdAt: string;
}

// Gamified Leaderboard Item
export interface LeaderboardItem {
  rank: number;
  member: User;
  contributionScore: number;
  tasksCompleted: number;
  challengesCompleted: number;
  stage: MemberStage;
  weeklyActivityScore: number;
}

// System Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}
