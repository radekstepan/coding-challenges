import React from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";
import Book from "../components/Book";

const ListBooks = props => (
  <div>
    <Topbar />
    <div id="main">
      <div className="header">
        <div className="title">Book list</div>
        <input
          type="button"
          className="button"
          value="Add a Book"
          onClick={() => props.navigate('/add')}></input>
      </div>
      <div className="panel">
        <div className="grid table">
          {props.books.map((book, idx) => <Book {...book} key={book.isbn} idx={idx + 1} />)}
        </div>
      </div>
    </div>
  </div>
);

const mapState = state => ({
  books: state.books.list
});

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(mapState, mapDispatch)(ListBooks);
