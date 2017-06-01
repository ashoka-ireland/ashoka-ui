import React, {
  Component,
  PropTypes,
} from 'react';

import { Row, Icon, Button, Table } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/organizations/actions';

const columns = [{
  dataIndex: 'name',
  title: 'Name',
  key: 'name'
}];

class OrganizationsPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      query: ''
    };
  }

  componentWillMount() {
    this.props.actions.listOrganizations();
  }

  render() {
    return (
      <div>
        <div class="table-operations">
          <Row type="flex" justify="end">
            <Button><Icon className="plus"/>Create Organization</Button>
          </Row>
        </div>

        <Table columns={columns} dataSource={this.props.organizations} />
      </div>
    );
  }
}

OrganizationsPage.propTypes = {
  organizations: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    listOrganizations: PropTypes.func.isRequired,
  })
};
OrganizationsPage.defaultProps = {};

const mapStateToProps = (state) => ({
  organizations: state.organizations
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsPage);
