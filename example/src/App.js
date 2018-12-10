import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

import MenuItem from './components/MenuItem';
import Readme from './Readme';
import Simple from './Simple';
import './App.css';


const { Content, Footer, Sider } = Layout;

export default class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <MenuItem key="1" path="/" label="README" exact />
              <MenuItem key="2" path="/simple" label="Simple" exact />
            </Menu>
          </Sider>
          <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ margin: '24px 16px 0' }}>
              <Switch>
                <Route exact path="/" component={Readme} />
                <Route exact path="/simple" component={Simple} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Created by Bizico
            </Footer>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}
