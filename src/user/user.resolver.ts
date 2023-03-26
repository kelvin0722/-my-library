import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthInput, AuthPayload, User, UserInput } from 'src/graphql/generated';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation('signup')
  async create(@Args('input') args: UserInput): Promise<User> {
    return this.userService.register(args);
  }

  @Mutation('login')
  async login(@Args('input') args: AuthInput): Promise<AuthPayload> {
    return this.userService.login(args);
  }
}
