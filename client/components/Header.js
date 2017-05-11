import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Menu } from 'antd';

const logo = require('assets/img/logo.png');

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <IndexLink to="/"><img src={logo} alt="Ashoka" className="logo" /></IndexLink>
      </div>

      <Menu mode="horizontal">
        <Menu.Item key="Link 1">
          <Link to="/">Survey</Link>
        </Menu.Item>
        <Menu.Item key="Link 2">
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="Link 3">
          <Link to="/">Nominees</Link>
        </Menu.Item>
      </Menu>
    </header>
  );
};

export default Header;
