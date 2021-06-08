import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateLottieInput {
  @Field()
  @IsString()
  assetUrl: string;

  @Field()
  @IsString()
  title: string;
}
