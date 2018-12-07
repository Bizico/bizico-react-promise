import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import coy from 'react-syntax-highlighter/dist/styles/prism/coy';
import CodeExpandButton from './CodeExpandButton';


class CodeHighlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expand: true };
  }

  toggleCode = () => {
    this.setState((prev) => ({ expand: !prev.expand }));
  };

  render() {
    const { children } = this.props;
    const { expand } = this.state;
    return (
      <div className={`code-box ${expand ? 'code-box-show' : 'code-box-hide'}`}>
        <CodeExpandButton onClick={this.toggleCode} expand={expand} />
        {expand && (
          <SyntaxHighlighter language="jsx" style={coy}>{children}</SyntaxHighlighter>
        )}
      </div>
    );
  }
}

export default CodeHighlight;
