import { Injectable } from '@nestjs/common';
import {
  AddToCollectionInput,
  AddToCollectionPayload,
  RatingInput,
  RatingPayload,
  User,
  ViewCollectionPayload,
} from 'src/graphql/generated';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}
  async addToCollection(
    collectionArgs: AddToCollectionInput,
    user: User,
  ): Promise<AddToCollectionPayload> {
    const collection = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        books: {
          connect: {
            id: collectionArgs.bookId,
          },
          update: {
            where: {
              id: collectionArgs.bookId,
            },
            data: {
              collectionStatus: collectionArgs.status,
            },
          },
        },
      },
      include: {
        books: true,
      },
    });
    return {
      id: collection.id,
      user: {
        id: collection.id,
        email: collection.email,
        createdAt: collection.createdAt,
        firstName: collection.firstName,
        lastName: collection.lastName,
      },
      books: collection.books,
    };
  }

  async rateBookInCollection(
    ratingArgs: RatingInput,
    user: User,
  ): Promise<RatingPayload> {
    const collection = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        books: {
          connect: {
            id: ratingArgs.bookId,
          },
          update: {
            where: {
              id: ratingArgs.bookId,
            },
            data: {
              rating: ratingArgs.rating,
            },
          },
        },
      },
      include: {
        books: true,
      },
    });
    return {
      id: collection.id,
      user: {
        id: collection.id,
        email: collection.email,
        createdAt: collection.createdAt,
        firstName: collection.firstName,
        lastName: collection.lastName,
      },
      books: collection.books,
    };
  }

  async viewCollection(user: User): Promise<ViewCollectionPayload> {
    const collection = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        books: true,
      },
    });

    return {
      id: collection.id,
      books: collection.books,
    };
  }
}
