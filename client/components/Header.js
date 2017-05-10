import React from 'react';
import { IndexLink } from 'react-router';
import { Menu } from 'antd';

const logo = require('assets/img/logo.png');

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <IndexLink to="/"><img src={logo} alt="Ashoka" className="logo" /></IndexLink>
      </div>

      <ul className="nav-links">
        <li><Menu mode="horizontal">
          <Menu.Item key="Link 1" url="/">Link One</Menu.Item>
          <Menu.Item key="Link 2" url="/">Link Two</Menu.Item>
        </Menu></li>
      </ul>
    </header>
  );
};

export default Header;
