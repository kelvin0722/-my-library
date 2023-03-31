import { UseGuards } from '@nestjs/common';

import { JwtGuard } from './../auth/guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import {
  AddBookInput,
  BookPayload,
  RemoveBookResponse,
} from 'src/graphql/generated';

@Resolver('Book')
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query('books')
  @UseGuards(JwtGuard)
  async getBooks(): Promise<BookPayload[]> {
    return this.bookService.getBooks();
  }

  @Query('searchBook')
  @UseGuards(JwtGuard)
  async searchBook(@Args('term') args: string): Promise<BookPayload[]> {
    return this.bookService.searchBooks(args);
  }

  @Mutation('addBook')
  @UseGuards(JwtGuard)
  async addBook(@Args('input') args: AddBookInput): Promise<BookPayload> {
    return this.bookService.addBook(args);
  }

  @Mutation('removeBook')
  @UseGuards(JwtGuard)
  async removeBook(@Args('id') args: number): Promise<RemoveBookResponse> {
    return this.bookService.removeBook(args);
  }
}
