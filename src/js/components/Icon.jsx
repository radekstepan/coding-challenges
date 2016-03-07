import React from 'react';

// Fontello icon hex codes.
let codes = {
  'delete': '\e800' // Font Awesome - trash-empty
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
