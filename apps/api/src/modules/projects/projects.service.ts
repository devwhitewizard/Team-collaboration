import { Injectable } from '@nestjs/common';
import { Project } from '@nexus/types';

@Injectable()
export class ProjectsService {
  private readonly mockProjects: Project[] = [
    {
      id: 'proj-1',
      organizationId: 'org-1',
      name: 'Nexus SaaS Engine v2',
      description: 'Next-generation core platform architecture with microservices',
      status: 'Active',
      progress: 68,
      startDate: '2026-02-01',
      targetEndDate: '2026-09-30',
      members: [
        { id: 'user-1', fullName: 'Alex Rivera', email: 'alex@nexustech.io', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-01' },
        { id: 'user-2', fullName: 'Sarah Chen', email: 'sarah@nexustech.io', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-05' },
      ],
      completedTasksCount: 34,
      totalTasksCount: 50,
      milestonesCount: 6,
      createdAt: '2026-01-15T00:00:00Z',
    },
    {
      id: 'proj-2',
      organizationId: 'org-1',
      name: 'Realtime Infrastructure',
      description: 'Supabase WebSockets & notification streaming pipeline',
      status: 'Planning',
      progress: 25,
      startDate: '2026-04-01',
      targetEndDate: '2026-11-15',
      members: [
        { id: 'user-3', fullName: 'David Kim', email: 'david@mmustdevs.org', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-10' },
      ],
      completedTasksCount: 5,
      totalTasksCount: 20,
      milestonesCount: 3,
      createdAt: '2026-03-01T00:00:00Z',
    },
  ];

  async findAll(orgId?: string): Promise<Project[]> {
    if (orgId) {
      return this.mockProjects.filter((p) => p.organizationId === orgId);
    }
    return this.mockProjects;
  }
}
