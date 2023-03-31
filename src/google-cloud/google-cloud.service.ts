import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class GoogleCloudService {
  private storage: Storage;

  constructor(private config: ConfigService) {
    const keyFilename = '/usr/src/app/keyfile.json';
    this.storage = new Storage({
      projectId: this.config.get('GCLOUD_PROJECT_ID'),
      keyFilename,
    });
  }

  async uploadFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const bucket = this.storage.bucket(
      this.config.get('GCLOUD_STORAGE_BUCKET_NAME'),
    );
    const gcsFileName = `${Date.now()}-${filename}`;
    const fileUpload = bucket.file(gcsFileName);
    const fileUploadStream = bucket.file(gcsFileName).createWriteStream();
    const stream = createReadStream();
    stream.pipe(fileUploadStream);
    await new Promise((resolve, reject) => {
      fileUploadStream.on('finish', resolve);
      fileUploadStream.on('error', reject);
    });
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 60 * 24 * 60 * 60 * 1000, // 15 minutes
    };
    // @ts-ignore
    // issue with google cloud options config type for action option
    const url = await fileUpload.getSignedUrl(options);
    return url[0];
  }
}
