import { Injectable } from '@nestjs/common';
import { Task } from '@nexus/types';

@Injectable()
export class TasksService {
  private readonly mockTasks: Task[] = [
    {
      id: 'task-101',
      projectId: 'proj-1',
      projectName: 'Nexus SaaS Engine v2',
      title: 'Configure NestJS API REST controllers & microservice DTOs',
      description: 'Define clean contracts for organization and project modules',
      status: 'In Progress',
      priority: 'High',
      assignee: { id: 'user-1', fullName: 'Alex Rivera', email: 'alex@nexustech.io', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-01' },
      dueDate: '2026-08-15',
      createdAt: '2026-08-01',
    },
    {
      id: 'task-102',
      projectId: 'proj-1',
      projectName: 'Nexus SaaS Engine v2',
      title: 'Build responsive web dashboard navigation and switcher component',
      description: 'Implement desktop sidebar and organization switcher',
      status: 'In Review',
      priority: 'Urgent',
      assignee: { id: 'user-2', fullName: 'Sarah Chen', email: 'sarah@nexustech.io', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-05' },
      dueDate: '2026-08-12',
      createdAt: '2026-08-02',
    },
  ];

  async findAll(): Promise<Task[]> {
    return this.mockTasks;
  }
}
