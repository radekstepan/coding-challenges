import React from 'react';

// Fontello icon hex codes.
let codes = {
  'spin': '\e800', // Fontelico - spin6
  'ok': '\e801',   // Font Awesome - ok
  'fail': '\e802'  // Font Awesome - cancel
};

export default React.createClass({

  displayName: 'Icon.jsx',

  render() {
    let name = this.props.name;

    if (name && name in codes) {
      let code = parseInt(codes[name], 16);
      return (
        <span
          className={`icon ${name}`}
          dangerouslySetInnerHTML={{ '__html': `&#${code};` }}
        />
      );
    }

    return false;
  }

});
