import React, { Component, PropTypes } from 'react';

import {
  Header,
  Footer,
} from 'components';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };
  }

  render() {
    return (
      <div class="app">
        <Header />

        <main class="container">
          {this.props.children}
        </main>

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
