import { ArgsType, Field } from '@nestjs/graphql';
import ConnectionArgs from '../../../pagination/connection.args';
import { IsIn, IsOptional, IsString } from 'class-validator';

@ArgsType()
export default class LottieConnectionArgs extends ConnectionArgs {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  filter: string;

  @Field()
  @IsIn(['recent', 'featured'])
  sort: 'recent' | 'featured';
}
