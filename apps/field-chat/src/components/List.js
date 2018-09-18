import React, { Component } from "react";
import { connect } from "react-redux";
import Waypoint from "react-waypoint";
import debounce from "debounce";

import Message from "./Message";
import Marker from "./Marker";

class List extends Component {
  constructor() {
    super();

    this.state = { filter: '' };

    this.onChange = debounce(this.onChange.bind(this), 200);
    this.onGetNext = this.onGetNext.bind(this);
  }

  onChange(e) {
    this.setState({ filter: e.target.value });
  }

  onGetNext() {
    this.props.getNext();
  }

  componentWillUnmount() {
    this.onChange.clear(); // clear debounce
  }

  // Highlight text given a regexp in a text.
  static markText(text, re) {
    text = text.split(re);
    for (let i = 1; i < text.length; i += 2) {
      text[i] = <Marker key={text[i] + i} text={text[i]} />;
    }
    return text;
  }

  render() {
    const { list } = this.props.messages;
    const { filter } = this.state;

    const fi = new RegExp(`(${filter})`, 'gi'); // body filter
    const me = new RegExp(`(@(?!(?:channel))\\S*)`, 'gi'); // mention filter
    const re = new RegExp(`(@(?!(?:channel))\\S*|${filter})`, 'gi'); // body and mention filter

    const messages = [];
    list.forEach(message => {
      let author = message.sender_username;
      let { body } = message;

      if (filter) { // apply a filter
        let exit = true;
        if (author.search(fi) !== -1) {
          exit = false;
          author = <Marker text={author} />;
        }
        if (body.search(fi) !== -1) {
          exit = false;
          body = List.markText(body, re);
        }
        if (exit) return;
      } else { // just mark mentions
        body = List.markText(body, me);
      }

      messages.push(<Message
        key={message.id}
        body={body}
        author={author}
        timestamp={message.created_at.seconds * 1e3}
        owner={message.sender_username === this.props.account.username}
      />);
    });

    return (
      <div id="main">
        <div className="header">
          <div className="action">
            <input
              type="text"
              placeholder="Search ..."
              onChange={e => !e.persist() && this.onChange(e)} />
          </div>
        </div>
        {!list.length &&
          <div className="message info">Loading messages &hellip;</div>}
        {!!list.length && !messages.length &&
          <div className="message info">No messages have been found.</div>}
        {!!list.length && !!messages.length &&
          <div className="panel">
            <div className="messages">{messages}</div>
            {!filter && <Waypoint onEnter={this.onGetNext} />}
          </div>}
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getNext: dispatch.messages.getNext,
  search: dispatch.messages.search
});

export default connect(null, mapDispatch)(List);