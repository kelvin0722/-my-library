import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { CollectionModule } from './collection/collection.module';
import resolvers from './graphql/resolvers';
import { GoogleCloudService } from './google-cloud/google-cloud.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./src/graphql/**/*.gql'],
      installSubscriptionHandlers: true,
      resolvers,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    BookModule,
    CollectionModule,
    FileModule,
  ],
  providers: [GoogleCloudService],
})
export class AppModule {}
