import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from '../components/Spinner';

class ViewBook extends Component {
  componentDidMount() {
    // Find the book.
    this.props.findBook(this.props.isbn);
  }

  renderLoading() {
    return (
      <div id="main">
        <div className="wrapper">
          <Spinner />
        </div>
      </div>
    );
  }

  renderError() {
    return (
      <div id="main">
        <div className="wrapper">
          <div className="message error">Book {this.props.isbn} not found. But
            since you want it so much, our best scribes are on it!</div>
        </div>
      </div>
    );
  }

  render() {
    const {book, goBack} = this.props;

    switch(true) {
      case !book:
        return this.renderLoading();
      case 'error' in book:
        return this.renderError();
      default:
        return (
          <div id="main">
            <div className="header">
              <div className="title">{book.title}</div>
              <div
                className="toggle"
                onClick={goBack}>Back to list</div>
              <div className="action" />
            </div>
            <div className="panel">
              <div>by {book.author}</div>
              <div>ISBN: {book.isbn}</div>
              <div>{book.description}</div>
            </div>
          </div>
        );
    }
  }
}

const mapState = state => ({
  isbn: state.router.params.isbn,
  book: state.books.book
});

const mapDispatch = dispatch => ({
  goBack: dispatch.router.goBack,
  findBook: dispatch.books.find
});

export default connect(mapState, mapDispatch)(ViewBook);
