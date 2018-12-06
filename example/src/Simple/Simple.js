import React, { Fragment } from 'react';
import Content from '../components/Content';
import Renderer from './Renderer';
import HOC from './HOC';


export default (props) => (
  <Fragment>
    <Content>
      <Renderer {...props} />
    </Content>
    <br />
    <Content>
      <HOC {...props} />
    </Content>
  </Fragment>
);
