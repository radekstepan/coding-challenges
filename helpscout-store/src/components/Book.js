import React from "react";

const Book = props => (
  <div className="book" onClick={props.viewDetail}>
    <div className="meta idx">{props.idx}</div>
    <div className="title">{props.title}</div>
    <div className="meta">{props.author}</div>
    <div className="meta">{props.description}</div>
  </div>
);

export default Book;
