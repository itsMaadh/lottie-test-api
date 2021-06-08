import { Query, Resolver } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import S3url from './dto/s3url.object';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Query(() => S3url, { name: 'signedUrl' })
  async getSignedUrl(): Promise<S3url> {
    return await this.uploadService.getSignedUrl();
  }
}
