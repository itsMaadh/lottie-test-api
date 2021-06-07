import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Company } from './companies/entities/company.entity';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: Number(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE'),
        synchronize: false,
        entities: [Company],
      }),
    }),
    ConfigModule,
    CompaniesModule,
  ],
})
export class AppModule {}
