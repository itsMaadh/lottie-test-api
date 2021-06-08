import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Lottie {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  assetUrl: string;

  @Field(() => Boolean)
  @Column()
  featured: boolean;

  @Field()
  @Column()
  title: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
