import React from 'react';
import { IndexLink } from 'react-router';
import { Menu, Icon } from 'antd';

const logo = require('assets/img/logo.svg');

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <ul className="nav-links">
          <li><IndexLink to="/"><img src={logo} alt="Metropolis" className="logo" /></IndexLink></li>
          <li><Menu mode="horizontal">
            <Menu.Item key="Link 1" url="/">Link One</Menu.Item>
            <Menu.Item key="Link 2" url="/">Link Two</Menu.Item>
          </Menu></li>
        </ul>
      </div>
      <div className="header-right">
        <ul className="nav-links">
          <li><Icon type="setting" /></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
