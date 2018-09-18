import React from "react";
import TimeAgo from "react-timeago";
import cls from "classnames";

const Message = props => (
  <div className={cls('message', { owner: props.owner })}>
    <div className="meta"><TimeAgo date={props.timestamp} /></div>
    <div className="author">{props.author}</div>
    <div className="body">{props.body}</div>
  </div>
);

export default Message;
