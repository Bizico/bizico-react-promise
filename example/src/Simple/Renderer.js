import * as Babel from '@babel/standalone';
import CodeHighlight from '../components/CodeHighlight';
import Example from './Renderer.example';

const React = require('react');
const ReactDOM = require('react-dom');
const Antd = require('antd');
const BizicoReactPromise = require('bizico-react-promise');
const Loader = require('../components/Loader').default;

const { Alert, Button } = Antd;
const { Query } = BizicoReactPromise;


export default class extends React.Component {
  componentDidMount() {
    const output = Babel.transform(Example, { presets: ['es2015', 'react'] }).code;
    eval(output);
  }

  render() {
    return (
      <React.Fragment>
        <h2>Query component</h2>
        <div id="example" />
        <CodeHighlight>
          {Example}
        </CodeHighlight>
      </React.Fragment>
    );
  }
};
