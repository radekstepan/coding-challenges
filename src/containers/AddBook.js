import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";
import Field from "../components/Field";

class AddBook extends Component {
  constructor() {
    super();

    this.state = { title: '', author: '', description: '' };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key) {
    return e => this.setState({ [key]: e.target.value });
  }

  onSubmit(e) {
    this.props.addBook(this.state);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Topbar />
        <div id="main">
          <div className="modal">
            <div className="title">Add a Book</div>
            <form onSubmit={this.onSubmit}>
              <Field placeholder="Title" onChange={this.onChange('title')} />
              <Field placeholder="Author" onChange={this.onChange('author')} />
              <Field placeholder="Description" onChange={this.onChange('description')} />
              <div>
                <input type="submit" className="button" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  addBook: dispatch.books.add
});

export default connect(null, mapDispatch)(AddBook);
