import opa from 'object-path';

import { list } from '../data/books';

// Make sure async doesn't get out of sync.
let tick = 0;

const books = {
  state: {
    // The list of books.
    list,
    // Book instance.
    book: null
  },
  reducers: {
    save(state, book) {
      return {
        ...state,
        list: [...state.list, book]
      };
    },
    get(state, isbn) {
      const book = state.list.find(book => book.isbn === isbn);

      return {
        ...state,
        book: book ? book : { error: 'Not found' }
      };
    },
    clear(state) {
      return {
        ...state,
        book: null
      };
    }
  },
  effects: {
    async find(isbn, state) {
      // Cached?
      if (opa.get(state, 'books.book.isbn') === isbn) return;
      // Clear the cache.
      this.clear();
      const myTick = ++tick;
      // Simulate XHR.
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Skip saving over state that is already old.
          myTick === tick && this.get(isbn);
          resolve();
        }, 2e3);
      });
    }
  }
};

export default books;
