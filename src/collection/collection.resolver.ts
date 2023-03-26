import { JwtGuard } from './../auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AddToCollectionInput,
  AddToCollectionPayload,
  RatingInput,
  RatingPayload,
  User,
  ViewCollectionPayload,
} from 'src/graphql/generated';
import { GraphQLCurrentUser } from 'src/auth/decorators';

@Resolver('Collection')
export class CollectionResolver {
  constructor(private collectionService: CollectionService) {}

  @Mutation('addToCollection')
  @UseGuards(JwtGuard)
  async addToCollection(
    @Args('input') args: AddToCollectionInput,
    @GraphQLCurrentUser() user: User,
  ): Promise<AddToCollectionPayload> {
    return this.collectionService.addToCollection(args, user);
  }

  @Mutation('rateBookInCollection')
  @UseGuards(JwtGuard)
  async rateBookInCollection(
    @Args('input') args: RatingInput,
    @GraphQLCurrentUser() user: User,
  ): Promise<RatingPayload> {
    return this.collectionService.rateBookInCollection(args, user);
  }

  @Query('viewCollection')
  @UseGuards(JwtGuard)
  async viewCollection(
    @GraphQLCurrentUser() user: User,
  ): Promise<ViewCollectionPayload> {
    return this.collectionService.viewCollection(user);
  }
}
