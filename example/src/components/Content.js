import React from 'react';


const Content = ({ children, ...other }) => (
  <div style={{ padding: 24, background: '#fff' }} {...other}>
    {children}
  </div>
);

export default Content;
