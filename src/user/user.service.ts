import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { AuthService } from 'src/auth/auth.service';

import { AuthInput, AuthPayload, UserInput } from 'src/graphql/generated';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async register(user: UserInput): Promise<User> {
    try {
      const passwordHash = await argon.hash(user.password);
      const userResponse = await this.prisma.user.create({
        data: {
          email: user.email,
          password: passwordHash,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
      return userResponse;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async login(authInput: AuthInput): Promise<AuthPayload> {
    return await this.authService.signIn(authInput);
  }
}
