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

  // Fetching S3 signed URL from AWS
  async getSignedUrl(): Promise<SignedUrlWithFileName> {
    // saving current timestamp as filename
    const filename = Date.now().toString();
    // create S3 instance
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_ACCESS_KEY_SECRET'),
      signatureVersion: 'v4',
      region: 'ap-southeast-1',
    });
    // Getting a signed URL valid for 3s
    const signedUrl = s3.getSignedUrl('putObject', {
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: `${filename}.json`,
      Expires: 3000,
    });
    return { signedUrl, filename };
  }
}
