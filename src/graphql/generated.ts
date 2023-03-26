
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Collection {
    WANT_TO_READ = "WANT_TO_READ",
    READING = "READING",
    READ = "READ"
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

export interface User {
    id: number;
    email: Email;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    createdAt: DateTime;
    books?: Nullable<Nullable<Book>[]>;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    date: DateTime;
    coverImage?: Nullable<string>;
    collection?: Nullable<Collection>;
    rating?: Nullable<string>;
    createdAt: DateTime;
}

export interface AuthPayload {
    token: string;
    user: User;
}

export interface IQuery {
    books(): Book[] | Promise<Book[]>;
    book(id: string): Book | Promise<Book>;
}

export interface IMutation {
    addBook(bookInput: AddBookInput): Book | Promise<Book>;
    updateBook(bookInput: UpdateBookInput): Book | Promise<Book>;
    deleteBook(id: number): boolean | Promise<boolean>;
    login(authInput: AuthInput): AuthPayload | Promise<AuthPayload>;
    signup(userInput: UserInput): User | Promise<User>;
}

export type DateTime = any;
export type Email = any;
type Nullable<T> = T | null;
