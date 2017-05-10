import React from 'react';
import { Card } from 'antd';
const logo = require('assets/img/m.png');

const Home = () => {
  return (
    <Card>
      <div className="home-page">
        <p className="text-center">
          <img src={logo} alt="Metropolis" className="logo" />
          <h1>Welcome to the Metropolis UI Boilerplate</h1><br />
        </p>
        <hr className="divider" />
        <h2 className="slogan">This <strong>ReactJS</strong> Boilerplate is a good starting point for whenever you require a User Interface for your project.
          It is a purpose built Front-end Stack, that follows industry standards and best practices.</h2>

        <hr className="divider secondary" />
        <h3 className="first">What's inside...</h3>
        <p>
          Under the hood, Metropolis UI uses <strong>ReactJS</strong>, <strong>Redux</strong>, <strong>Webpack</strong> and <strong>Ant Design</strong>, a (<a href="https://ant.design/" target="_blank">React UI Library</a>).</p>
        <hr className="divider secondary" />
        <h3>ReactJS / Redux / Webpack</h3>
        <p>
          <a href="https://facebook.github.io/react/" target="_blank">ReactJS</a> - A Javascript library for building User Interfaces.
        </p>
        <p>
          <a href="http://redux.js.org/docs/introduction/" target="_blank">Redux</a> - A predictable state container for JavaScript apps.
        </p>
        <p>
          <a href="https://webpack.github.io/" target="_blank">Webpack</a> - A module bundler that takes modules with dependencies and emits static assets representing those modules.
        </p>
        <hr className="divider secondary" />
        <h3>Ant Design</h3>
        <p>
          <a href="https://ant.design/" target="_blank">Ant Design</a> - A <strong>React UI library</strong> that contains a set of high quality components and demos for building rich interactive desktop applications.
        </p>
      </div>
    </Card>
  );
};

export default Home;
