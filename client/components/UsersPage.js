import React, { Component } from 'react';
import { Table, Button } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
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
