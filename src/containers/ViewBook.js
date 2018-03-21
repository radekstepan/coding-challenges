import React, { Component } from "react";
import { connect } from "react-redux";

class ViewBook extends Component {
  componentDidMount() {
    // Find the book.
    this.props.findBook(this.props.isbn);
  }

  renderLoading() {
    return (
      <div id="main">
        <div className="wrapper">
          <div className="message info">Fetching book {this.props.isbn} &hellip;</div>
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
    const {book, navigate} = this.props;

    switch(true) {
      case !book:
        return this.renderLoading();
      case 'error' in book:
        return this.renderError();
      default:
        return (
          <div id="main">
            <div className="header">
              <div className="title">Book</div>
              <div
                className="toggle"
                onClick={() => navigate(`/`)}>Back to list</div>
              <div className="action" />
            </div>
            <div className="panel">
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
  navigate: dispatch.router.navigate,
  findBook: dispatch.books.find
});

export default connect(mapState, mapDispatch)(ViewBook);
