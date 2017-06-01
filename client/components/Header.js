import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { user } = this.props;

    return (
      <header className="header">
        <div className="logo">
          <IndexLink to="/"><img src={logo} alt="Ashoka" className="logo" /></IndexLink>
        </div>

        <Menu mode="horizontal" theme="dark">
          <Menu.Item key="survey">
            <Link activeClassName="active" to="/survey">Survey</Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link activeClassName="active" to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="nominees">
            <Link activeClassName="active" to="/nominees">Nominees</Link>
          </Menu.Item>
          <Menu.Item key="organization">
            <Link activeClassName="active" to="/organizations">Organizations</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <a type="button" onClick={this.logout}>Logout</a>
          </Menu.Item>
          {user &&
          <Menu.Item key="user">
            <div class="user-dropdown">{user.email}</div>
          </Menu.Item>}
        </Menu>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string
  })
};

export default Header;
