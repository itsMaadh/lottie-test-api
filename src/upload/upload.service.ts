import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { S3 } from 'aws-sdk';

type SignedUrlWithFileName = {
  signedUrl: string;
  filename: string;
};

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  async getSignedUrl(): Promise<SignedUrlWithFileName> {
    const filename = Date.now().toString();
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_ACCESS_KEY_SECRET'),
      signatureVersion: 'v4',
      region: 'ap-southeast-1'
    });
    const signedUrl = s3.getSignedUrl('putObject', {
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: `${filename}.json`,
      Expires: 3000,
    });
    return { signedUrl, filename };
  }
}
