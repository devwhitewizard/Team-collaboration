import {
  Organization,
  Project,
  Task,
  WeeklyUpdate,
  OrganizationMember,
  Challenge,
  Document,
  Channel,
  Message,
  Contract,
  LeaderboardItem,
  Notification,
} from '@nexus/types';
import {
  MOCK_ORGANIZATIONS,
  MOCK_PROJECTS,
  MOCK_TASKS,
  MOCK_UPDATES,
  MOCK_MEMBERS,
  MOCK_CHALLENGES,
  MOCK_DOCUMENTS,
  MOCK_CHANNELS,
  MOCK_MESSAGES,
  MOCK_CONTRACTS,
  MOCK_LEADERBOARD,
  MOCK_NOTIFICATIONS,
} from './mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchOrganizations(): Promise<Organization[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/organizations`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback to mock data cleanly if API server is offline
  }
  return MOCK_ORGANIZATIONS;
}

export async function fetchProjects(orgId?: string): Promise<Project[]> {
  try {
    const url = orgId ? `${API_BASE_URL}/projects?organizationId=${orgId}` : `${API_BASE_URL}/projects`;
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return orgId ? MOCK_PROJECTS.filter((p) => p.organizationId === orgId) : MOCK_PROJECTS;
}

export async function fetchTasks(): Promise<Task[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return MOCK_TASKS;
}

export async function fetchWeeklyUpdates(): Promise<WeeklyUpdate[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/updates`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return MOCK_UPDATES;
}

export async function fetchMembers(): Promise<OrganizationMember[]> {
  return MOCK_MEMBERS;
}

export async function fetchChallenges(): Promise<Challenge[]> {
  return MOCK_CHALLENGES;
}

export async function fetchDocuments(): Promise<Document[]> {
  return MOCK_DOCUMENTS;
}

export async function fetchChannels(): Promise<Channel[]> {
  return MOCK_CHANNELS;
}

export async function fetchMessages(channelId: string): Promise<Message[]> {
  return MOCK_MESSAGES.filter((m) => m.channelId === channelId || channelId === 'ch-gen');
}

export async function fetchContracts(): Promise<Contract[]> {
  return MOCK_CONTRACTS;
}

export async function fetchLeaderboard(): Promise<LeaderboardItem[]> {
  return MOCK_LEADERBOARD;
}

export async function fetchNotifications(): Promise<Notification[]> {
  return MOCK_NOTIFICATIONS;
}
