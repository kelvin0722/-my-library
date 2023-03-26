import { Book } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

import { JwtGuard } from './../auth/guard/jwt.guard';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { AddBookInput, RemoveBookResponse } from 'src/graphql/generated';

@Resolver('Book')
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Mutation('addBook')
  @UseGuards(JwtGuard)
  async addBook(@Args('input') args: AddBookInput): Promise<Book> {
    return this.bookService.addBook(args);
  }

  @Mutation('removeBook')
  @UseGuards(JwtGuard)
  async removeBook(@Args('id') args: number): Promise<RemoveBookResponse> {
    return this.bookService.removeBook(args);
  }
}
