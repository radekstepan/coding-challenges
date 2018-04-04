import opa from 'object-path';

// Make sure async doesn't get out of sync.
let tick = 0;

const books = {
  state: {
    // The map of books.
    map: {},
    // Last book index.
    last: -1,
    // Book instance.
    book: null
  },
  reducers: {
    addBook(state, book) {
      // "Validation".
      if (!book.title || !book.author) {
        return state;
      }

      const idx = state.last + 1;
      book.isbn = `isbn:000${idx}`; // "generate" ISBN
      return {
        ...state,
        book, // cache it
        last: idx,
        map: {...state.map, [idx]: book}
      };
    },
    getBook(state, idx) {
      return {
        ...state,
        book: idx in state.map ? state.map[idx] : { error: 'Not found' }
      };
    },
    removeBook(state, idx) {
      const {[idx]: book, ...map} = state.map;

      return {
        ...state,
        map,
        book: null
      };
    },
    clearBook(state) {
      return {
        ...state,
        book: null
      };
    }
  },
  effects: {
    async resolveBook(idx, root) {
      // Cached?
      if (opa.get(root, 'books.book.isbn', -1) === opa.get(root, `books.map.${idx}.isbn`)) return;
      // Clear the cache.
      this.clearBook();
      const myTick = ++tick;
      // Simulate XHR.
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Skip saving over state that is already old.
          myTick === tick && this.getBook(idx);
          resolve();
        }, 1e3);
      });
    }
  }
};

export default books;
