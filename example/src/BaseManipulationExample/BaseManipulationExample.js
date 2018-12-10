import React, { Fragment } from 'react';
import PlayGround from '../components/PlayGround';
import renderer from './Renderer.example';
import hoc from './HOC.example';


export default () => (
  <Fragment>
    <PlayGround title="Manipulation component" code={renderer} />
    <br />
    <PlayGround title="HOC component" code={hoc} />
  </Fragment>
);
