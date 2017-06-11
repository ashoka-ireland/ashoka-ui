import React, { Component, PropTypes } from 'react';
import client from 'api/client'; //eslint-disable-line

import {
  Header,
  Footer,
} from 'components';

const extractUser = (user = {}) => user ? ({
  email: user.email,
  displayName: user.displayname
}) : null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: null
    };
  }

  componentDidMount() {
    client.authenticated((user) => {
      if (user) {
        this.setState({
          user: extractUser(user),
          authenticated: true
        });
      }
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div class="app">
        <Header user={user} />

        {this.props.children}

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
