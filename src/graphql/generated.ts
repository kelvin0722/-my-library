/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CollectionStatus {
  WANT_TO_READ = 'WANT_TO_READ',
  READING = 'READING',
  READ = 'READ',
}

export interface AddBookInput {
  title: string;
  author: string;
  coverImage?: Nullable<string>;
}

export interface UpdateBookInput {
  id: number;
  title: string;
  author: string;
  coverImage?: Nullable<string>;
}

export interface UserInput {
  email: Email;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  password: string;
}

export interface AuthInput {
  email: Email;
  password: string;
}

export interface AddToCollectionInput {
  bookId: number;
  status?: Nullable<CollectionStatus>;
}

export interface RatingInput {
  bookId: number;
  rating: number;
}

export interface User {
  id: number;
  email: Email;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  createdAt: DateTime;
  books?: Nullable<Nullable<Book>[]>;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage?: Nullable<string>;
  collectionStatus?: Nullable<CollectionStatus>;
  rating?: Nullable<number>;
  createdAt: DateTime;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface RemoveBookResponse {
  success?: Nullable<boolean>;
}

export interface ViewCollectionPayload {
  id: number;
  books?: Nullable<Nullable<BookPayload>[]>;
}

export interface AddToCollectionPayload {
  id: number;
  user: User;
  books?: Nullable<Nullable<BookPayload>[]>;
}

export interface BookPayload {
  id: number;
  title: string;
  author: string;
  coverImage?: Nullable<string>;
  collectionStatus?: Nullable<string>;
  rating?: Nullable<number>;
  createdAt: DateTime;
}

export interface RatingPayload {
  id: number;
  user: User;
  books?: Nullable<Nullable<BookPayload>[]>;
}

export interface IQuery {
  books(): Book[] | Promise<Book[]>;
  book(id: string): Book | Promise<Book>;
  viewCollection(): ViewCollectionPayload | Promise<ViewCollectionPayload>;
}

export interface IMutation {
  login(input: AuthInput): AuthPayload | Promise<AuthPayload>;
  signup(input: UserInput): User | Promise<User>;
  addBook(input: AddBookInput): BookPayload | Promise<BookPayload>;
  updateBook(input: UpdateBookInput): BookPayload | Promise<BookPayload>;
  removeBook(id: number): RemoveBookResponse | Promise<RemoveBookResponse>;
  addToCollection(
    input: AddToCollectionInput,
  ): AddToCollectionPayload | Promise<AddToCollectionPayload>;
  rateBookInCollection(
    input: RatingInput,
  ): RatingPayload | Promise<RatingPayload>;
}

export type DateTime = any;
export type Email = any;
type Nullable<T> = T | null;
