/* eslint-disable */
import * as Babel from '@babel/standalone';
import CodeExpandButton from './CodeExpandButton';
import CodeHighlight from './CodeHighlight';
import Content from './Content';

const React = require('react');
const ReactDOM = require('react-dom');
const Antd = require('antd');
const BizicoReactPromise = require('bizico-react-promise');
const Loader = require('./Loader').default;

const { Alert, Button, Row, Col } = Antd;
const { query, Query } = BizicoReactPromise;


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    const { code } = props;
    this.state = { code, expand: false };
  }

  componentDidMount() {
    this.runExample(this.state.code);
  }

  componentWillUnmount() {
    this.clearExample();
  }

  runExample = (code) => {
    this.clearExample();
    const mountNode = this.node.current;
    const output = Babel.transform(code, { presets: ['es2015', 'react'] }).code;
    eval(output);
  };

  clearExample() {
    try {
      ReactDOM.unmountComponentAtNode(this.node.current);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }

  updateCode = (code) => {
    this.setState({ code });
  };

  toggleCode = () => {
    this.setState((prev) => ({ expand: !prev.expand }));
  };

  render() {
    const { title } = this.props;
    const { code, expand } = this.state;
    return (
      <Row>
        <Col xs={24} sm={16}>
          <Content className="play-ground">
            <h2>{title}</h2>
            <div ref={this.node} />
            <div style={{ textAlign: 'right' }}>
              <CodeExpandButton onClick={this.toggleCode} expand={expand} />
            </div>
            {expand && (
              <React.Fragment>
                <CodeHighlight updateCode={this.updateCode}>
                  {code}
                </CodeHighlight>
                <Button type="primary" onClick={() => this.runExample(code)}>Update</Button>
              </React.Fragment>
            )}
          </Content>
        </Col>
      </Row>
    );
  }
}
