import React from "react";

const Book = props => (
  <div className="book" data-idx={props.idx}>
    <div className="title">{props.title}</div>
    <div className="meta">{props.author}</div>
    <div className="meta">{props.description}</div>
  </div>
);

export default Book;
