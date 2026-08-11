import { Injectable } from '@nestjs/common';
import { WeeklyUpdate } from '@nexus/types';

@Injectable()
export class UpdatesService {
  private readonly mockUpdates: WeeklyUpdate[] = [
    {
      id: 'update-1',
      organizationId: 'org-1',
      author: { id: 'user-1', fullName: 'Alex Rivera', email: 'alex@nexustech.io', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-01' },
      submittedAt: '2026-08-08T14:30:00Z',
      completedTasks: ['Configured monorepo root package.json & workspaces', 'Created shared @nexus/types package'],
      inProgressTasks: ['Building NestJS API endpoints', 'Creating Next.js App Router layout'],
      blockers: ['Awaiting Supabase RLS policy security audit'],
      nextPlans: ['Wire Next.js frontend pages to mock API client', 'Verify end-to-end route compilation'],
    },
  ];

  async findAll(): Promise<WeeklyUpdate[]> {
    return this.mockUpdates;
  }
}
