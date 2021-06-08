import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class S3url {
  @Field()
  signedUrl: string;

  @Field()
  filename: string;
}
