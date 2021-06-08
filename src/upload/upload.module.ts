import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule } from '../config/config.module';
import { UploadResolver } from './upload.resolver';

@Module({
  providers: [UploadService, UploadResolver],
  imports: [ConfigModule],
  exports: [UploadService],
})
export class UploadModule {}
