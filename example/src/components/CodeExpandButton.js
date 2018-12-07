import React from 'react';


const CodeExpandButton = ({ onClick, expand }) => (
  <span className="code-expand-icon" onClick={onClick}>
    {expand ? (
      <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" className="code-expand-icon-hide" />
    ) : (
      <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" className="code-expand-icon-show" />
    )}
  </span>
);

export default CodeExpandButton;
