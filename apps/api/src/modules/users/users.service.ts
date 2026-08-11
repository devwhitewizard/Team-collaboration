import { Injectable } from '@nestjs/common';
import { User, OrganizationMember } from '@nexus/types';

@Injectable()
export class UsersService {
  private readonly mockUsers: User[] = [
    { id: 'user-1', fullName: 'Alex Rivera', email: 'alex@nexustech.io', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-01' },
    { id: 'user-2', fullName: 'Sarah Chen', email: 'sarah@nexustech.io', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-05' },
    { id: 'user-3', fullName: 'David Kim', email: 'david@mmustdevs.org', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', createdAt: '2026-01-10' },
  ];

  async findAll(): Promise<User[]> {
    return this.mockUsers;
  }
}
