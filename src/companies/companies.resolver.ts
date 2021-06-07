import { Resolver, Query } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Query(() => [Company], { name: 'companies' })
  async findAll(): Promise<Company[]> {
    return await this.companiesService.findAll();
  }
}
