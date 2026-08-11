import { Injectable } from '@nestjs/common';
import { Organization } from '@nexus/types';

@Injectable()
export class OrganizationsService {
  private readonly mockOrganizations: Organization[] = [
    {
      id: 'org-1',
      name: 'Nexus Tech',
      slug: 'nexus-tech',
      description: 'Core enterprise engineering & research lab',
      memberCount: 24,
      activeProjectsCount: 8,
      createdAt: '2026-01-15T00:00:00Z',
    },
    {
      id: 'org-2',
      name: 'MMUST Developers',
      slug: 'mmust-developers',
      description: 'University developer community workspace',
      memberCount: 42,
      activeProjectsCount: 5,
      createdAt: '2026-02-10T00:00:00Z',
    },
    {
      id: 'org-3',
      name: 'Student Developers',
      slug: 'student-developers',
      description: 'Open student contributor & mentorship chapter',
      memberCount: 18,
      activeProjectsCount: 3,
      createdAt: '2026-03-01T00:00:00Z',
    },
  ];

  async findAll(): Promise<Organization[]> {
    return this.mockOrganizations;
  }

  async findOne(id: string): Promise<Organization | undefined> {
    return this.mockOrganizations.find((org) => org.id === id || org.slug === id);
  }
}
