import { Module } from '@nestjs/common';
import { FileResolver } from './file.resolver';
import { GoogleCloudService } from 'src/google-cloud/google-cloud.service';

@Module({
  providers: [FileResolver, GoogleCloudService],
})
export class FileModule {}
