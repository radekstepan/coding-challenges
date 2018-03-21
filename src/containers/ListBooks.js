import React from "react";
import { connect } from "react-redux";
import cls from "classnames";
import opa from "object-path";

import Book from "../components/Book";

const ListBooks = props => {
  const grid = props.grid ? ['grid', 'table'] : ['table', 'grid'];

  return (
    <div id="main">
      <div className="header">
        <div className="title">Book list</div>
        <div
          className="toggle"
          onClick={() => props.navigate(`?view=${grid[1]}`)}>View as a {grid[1]}</div>
        <div className="action">
          <input
            type="button"
            className="button"
            value="Add a Book"
            onClick={() => props.navigate('/add')} />
        </div>
      </div>
      <div className="panel">
        <div className={cls('books', grid[0])}>
          {props.books.map(book => <Book
            {...book}
            key={book.idx}
            viewDetail={() => props.navigate(`/book/${book.idx}`)} />)}
        </div>
      </div>
    </div>
  );
}

const mapState = state => {
  const books = [];
  for (const idx in state.books.map) {
    books.push({...state.books.map[idx], idx});
  }

  return {
    books,
    grid: opa.get(state.router, "search.view", "grid") === "grid"
  };
};

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(mapState, mapDispatch)(ListBooks);
