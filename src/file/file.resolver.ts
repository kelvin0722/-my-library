import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { JwtGuard } from 'src/auth/guard';
import { GoogleCloudService } from 'src/google-cloud/google-cloud.service';
import { UploadFilePayload } from 'src/graphql/generated';

@Resolver()
export class FileResolver {
  constructor(private readonly googleCloudService: GoogleCloudService) {}

  @Mutation('uploadFile')
  @UseGuards(JwtGuard)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<UploadFilePayload> {
    const url = await this.googleCloudService.uploadFile(file);
    return {
      url,
    };
  }
}
