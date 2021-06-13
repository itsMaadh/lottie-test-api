import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  // Select different variables based on NODE_ENV
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV ? process.env.NODE_ENV : 'local'}.env`,
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
