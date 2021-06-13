import { Injectable } from '@nestjs/common';
import { CreateLottieInput } from './dto/create-lottie.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Lottie } from './entities/lottie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LottieService {
  constructor(
    @InjectRepository(Lottie)
    private readonly lottieRepository: Repository<Lottie>,
  ) {}

  // Saving the input to database
  async create(createLottieInput: CreateLottieInput): Promise<Lottie> {
    return await this.lottieRepository.save({
      ...createLottieInput,
      featured: false,
    });
  }

  // Fetching paginated Lotties
  async findAll(
    limit: number,
    offset: number,
    filter: string,
    sort: 'recent' | 'featured',
  ): Promise<[Lottie[], number]> {
    const query = this.lottieRepository.createQueryBuilder('lottieRepository');
    // if there is a search parameter, add the where sql
    filter
      ? query.where('lottieRepository.title ilike :filter', {
          filter: `%${filter}%`,
        })
      : query;
    // if featured, make sure featured is true
    sort === 'featured'
      ? query.andWhere('lottieRepository.featured = true')
      : query;
    // return paginated items
    return await query
      .orderBy('lottieRepository.createdAt', 'DESC')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  // Find a specific Lottie
  async findOne(id: string): Promise<Lottie> {
    return await this.lottieRepository.findOne(id);
  }
}
