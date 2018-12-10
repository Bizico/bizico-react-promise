import React, { Fragment } from 'react';
import PlayGround from '../components/PlayGround';
import renderer from './Renderer.example';


export default () => (
  <Fragment>
    <PlayGround title="Manipulation with loaders and errors" code={renderer} />
  </Fragment>
);
