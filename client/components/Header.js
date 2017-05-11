import React, { Component } from 'react';
import client from 'api/client'; // eslint-disable-line
import { browserHistory, IndexLink, Link } from 'react-router';
import { Menu } from 'antd';

const logo = require('assets/img/logo.png');

class Header extends Component {
  logout = () => {
    client.logout().then(() => {
      browserHistory.replace('/login');
    });
  }

  render() {
    return (
      <header className="header">
        <div className="logo">
          <IndexLink to="/"><img src={logo} alt="Ashoka" className="logo" /></IndexLink>
        </div>

        <Menu mode="horizontal">
          <Menu.Item key="survey">
            <Link to="/survey">Survey</Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="nominees">
            <Link to="/">Nominees</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <a type="button" onClick={this.logout}>Logout</a>
          </Menu.Item>
        </Menu>
      </header>
    );
  }
}

export default Header;
