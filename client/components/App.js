import React, { PropTypes } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

const App = (props) => {
  return (
    <div className="app">
      <Header></Header>
      <main className="container">
        {props.children}
      </main>
      <Footer></Footer>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
