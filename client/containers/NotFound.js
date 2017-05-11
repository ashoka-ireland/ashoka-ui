import React from 'react';
import { Link } from 'react-router';
import { Card } from 'antd';
import { Footer } from 'components';

const NotFound = () => {
  return (
    <div class="app">

      <main class="container">
        <Card>
          <h2>404 Page Not Found</h2>
          <p><Link to="/"> Go back to homepage </Link></p>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
