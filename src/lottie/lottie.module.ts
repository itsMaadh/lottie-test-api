import { Module } from '@nestjs/common';
import { LottieService } from './lottie.service';
import { LottieResolver } from './lottie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lottie } from './entities/lottie.entity';

@Module({
  providers: [LottieResolver, LottieService],
  imports: [TypeOrmModule.forFeature([Lottie])],
})
export class LottieModule {}
