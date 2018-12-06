/* eslint-disable react/no-children-prop */
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const MenuItem = ({ path, exact, label, icon, ...other }) => (
  <Route
    path={path}
    exact={exact}
    children={({ match }) => (
      <Menu.Item
        {...other}
        className={match ? `${other.rootPrefixCls}-item-selected` : ''}
      >
        <Link to={path}>
          {!!icon && <Icon type={icon} />}
          <span>{label}</span>
        </Link>
      </Menu.Item>
    )}
  />
);

export default MenuItem;
