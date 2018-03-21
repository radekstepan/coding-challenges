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
          {props.books.map((book, idx) => <Book
            {...book}
            key={book.isbn}
            viewDetail={() => props.navigate(`/book/${book.isbn}`)}
            idx={idx + 1} />)}
        </div>
      </div>
    </div>
  );
}

const mapState = state => ({
  grid: opa.get(state.router, "search.view", "grid") === "grid",
  books: state.books.list
});

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(mapState, mapDispatch)(ListBooks);
