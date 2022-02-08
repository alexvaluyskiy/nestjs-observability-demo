import { Book } from './models/book'

export const booksProviders = [
  {
    provide: 'BOOKS_REPOSITORY',
    useValue: Book,
  },
];