import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthPayload, AuthInput } from 'src/graphql/generated';
import { PrismaService } from './../prisma/prisma.service';
import { JWT_EXP_TIME_IN_MINS } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async signIn(authInput: AuthInput): Promise<AuthPayload> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authInput.email,
      },
    });
    if (!user) throw new ForbiddenException('User does not exist');
    const pwMatches = await argon.verify(user.password, authInput.password);
    if (!pwMatches)
      throw new ForbiddenException(
        'Wrong password.Please recheck your password',
      );
    const token = await this.generatedToken(user.id, user.email);
    delete user.password;
    return {
      token,
      user,
    };
  }
  async generatedToken(userId: number, email: string): Promise<string> {
    const data = {
      sub: userId,
      email,
    };
    const token = await this.jwtService.signAsync(data, {
      expiresIn: JWT_EXP_TIME_IN_MINS,
      secret: this.config.get('JWT_SECRET_KEY'),
    });

    return token;
  }
}
