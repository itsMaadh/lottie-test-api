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

  async create(createLottieInput: CreateLottieInput): Promise<Lottie> {
    return await this.lottieRepository.save({
      ...createLottieInput,
      featured: false,
    });
  }

  async findAll(
    limit: number,
    offset: number,
    filter: string,
    sort: 'recent' | 'featured',
  ): Promise<[Lottie[], number]> {
    const query = this.lottieRepository.createQueryBuilder('lottieRepository');
    filter
      ? query.where('lottieRepository.title ilike :filter', {
          filter: `%${filter}%`,
        })
      : query;
    sort === 'featured'
      ? query.andWhere('lottieRepository.featured = true')
      : query;
    return await query
      .orderBy('lottieRepository.createdAt', 'DESC')
      .getManyAndCount();
  }

  async findOne(id: string): Promise<Lottie> {
    return await this.lottieRepository.findOne(id);
  }
}
