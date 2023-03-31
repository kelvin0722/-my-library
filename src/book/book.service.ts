import { Injectable } from '@nestjs/common';
import {
  AddBookInput,
  BookPayload,
  Genre,
  RemoveBookResponse,
} from 'src/graphql/generated';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async addBook(book: AddBookInput): Promise<BookPayload> {
    const bookResponse = await this.prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre as Genre,
        coverImage: book.coverImage,
      },
    });

    return bookResponse;
  }

  async getBook(id: number): Promise<BookPayload> {
    const bookResponse = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    return bookResponse;
  }

  async getBooks(): Promise<BookPayload[]> {
    const bookResponse = await this.prisma.book.findMany({
      where: {
        active: true,
      },
    });
    return bookResponse;
  }

  async searchBooks(term: string): Promise<BookPayload[]> {
    const bookResponse = await this.prisma.book.findMany({
      where: {
        title: {
          contains: term,
          mode: 'insensitive',
        },
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
