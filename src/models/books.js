import { list } from '../data/books';

const books = {
  state: { list },
  reducers: {
    save(state, book) {
      return {
        ...state,
        list: [...state.list, book]
      };
    }
  }
};

export default books;
