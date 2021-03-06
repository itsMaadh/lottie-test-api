import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  // Taking the correct environment variable file
  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    console.log(filePath, this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
