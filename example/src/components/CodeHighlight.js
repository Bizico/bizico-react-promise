import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/material.css');
// require('codemirror/theme/neat.css');
// require('codemirror/mode/xml/xml.js');
// require('codemirror/mode/javascript/javascript.js');

class CodeHighlight extends React.Component {
  render() {
    const { children, updateCode } = this.props;
    return (
      <CodeMirror
        value={children}
        onChange={updateCode}
        options={{
          mode: 'jsx',
          lineNumbers: false,
          lineWrapping: false,
          matchBrackets: true,
          tabSize: 2,
          theme: 'solarized light',
        }}
      />
    );
  }
}

export default CodeHighlight;
