import React from 'react';
import { Link } from 'react-router';
import { Card } from 'antd';

const NotFound = () => {
  return (
    <div>
      <Card>
        <h2>404 Page Not Found</h2>
        <p><Link to="/"> Go back to homepage </Link></p>
      </Card>
    </div>
  );
};

export default NotFound;
