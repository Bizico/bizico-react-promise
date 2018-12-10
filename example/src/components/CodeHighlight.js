import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';


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
