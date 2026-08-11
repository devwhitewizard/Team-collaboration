import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async getOrganizations() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  async getOrganization(@Param('id') id: string) {
    const org = await this.organizationsService.findOne(id);
    if (!org) {
      throw new NotFoundException(`Organization with identifier ${id} not found`);
    }
    return org;
  }
}
