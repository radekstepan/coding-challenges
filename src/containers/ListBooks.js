import React, { Component } from "react";
import { connect } from "react-redux";
import cls from "classnames";

import Topbar from "../components/Topbar";
import Book from "../components/Book";

class ListBooks extends Component {
  constructor() {
    super();

    this.state = { grid: true };

    this.onToggleGrid = this.onToggleGrid.bind(this);
  }

  onToggleGrid() {
    this.setState({ grid: !this.state.grid });
  }

  render() {
    const {grid} = this.state;

    return (
      <div>
        <Topbar />
        <div id="main">
          <div className="header">
            <div className="title">Book list</div>
            <div className="toggle" onClick={this.onToggleGrid}>View as a {!grid ? 'Grid' : 'Table'}</div>
            <div className="action">
              <input
                type="button"
                className="button"
                value="Add a Book"
                onClick={() => this.props.navigate('/add')}></input>
            </div>
          </div>
          <div className="panel">
            <div className={cls('books', grid ? 'grid' : 'table')}>
              {this.props.books.map((book, idx) => <Book {...book} key={book.isbn} idx={idx + 1} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  books: state.books.list
});

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(mapState, mapDispatch)(ListBooks);
