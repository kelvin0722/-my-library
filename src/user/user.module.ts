import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UserResolver, UserService, AuthService, JwtService],
})
export class UserModule {}
