import React from "react";

const Topbar = props => {
  const { account, signout } = props;
  return (
    <div id="topbar" className="header">
      <div
        className="logo"
        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/logo.png`}}
      />
      <div className="menu">
        {account.username && <div className="active" onClick={signout}>Sign Out {account.username}</div>}
      </div>
    </div>
  );
};

export default Topbar;
