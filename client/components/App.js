import React, { PropTypes } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

const App = (props) => {
  return (
    <div class="app">
      <Header />

      <main class="container">
        {props.children}
      </main>

      <Footer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
