import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { AddBookInput, RemoveBookResponse } from 'src/graphql/generated';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async addBook(book: AddBookInput): Promise<Book> {
    const bookResponse = await this.prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
      },
    });

    return bookResponse;
  }
  async removeBook(bookId: number): Promise<RemoveBookResponse> {
    const response = await this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        active: false,
      },
    });
    return { success: Boolean(response) };
  }
}
