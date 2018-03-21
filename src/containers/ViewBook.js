import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from '../components/Spinner';

class ViewBook extends Component {
  constructor() {
    super();

    this.onRemoveBook = this.onRemoveBook.bind(this);
  }

  componentDidMount() {
    // Find the book.
    this.props.resolveBook(this.props.idx);
  }

  onRemoveBook() {
    // Remove book and redirect back to the list.
    this.props.removeBook(this.props.idx).then(this.props.goBack);
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
          <div className="message error">Book not found. But since you want it
            so much, our best scribes are on it!</div>
        </div>
      </div>
    );
  }

  render() {
    const {book} = this.props;

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
                onClick={this.props.goBack}>Back to list</div>
              <div className="action" />
            </div>
            <div className="panel">
              <div>{book.author}</div>
              <div>{book.description}</div>
            </div>
            <div
              className="link"
              onClick={this.onRemoveBook}>Remove this book</div>
          </div>
        );
    }
  }
}

const mapState = state => ({
  idx: state.router.params.idx,
  book: state.books.book
});

const mapDispatch = dispatch => ({
  goBack: dispatch.router.goBack,
  navigate: dispatch.router.navigate,
  resolveBook: dispatch.books.resolveBook,
  removeBook: dispatch.books.removeBook
});

export default connect(mapState, mapDispatch)(ViewBook);
