import React, { Component } from 'react';
import { Table, Button } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'Phone',
  dataIndex: 'phone',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Ashoka Project ${i}`,
    email: 'ashokasocialapi@gmail.com',
    phone: '12345678'
  });
}

const noop = () => {};

class UsersPage extends Component {
  render() {
    return (
      <div>
        <div className="table-operations">
          <Button onClick={noop}>Sort age</Button>
          <Button onClick={noop}>Clear filters</Button>
          <Button onClick={noop}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default UsersPage;
