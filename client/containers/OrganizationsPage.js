import React, {
  Component,
  PropTypes,
} from 'react';

import { Link } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/organizations/actions';

import { Row, Icon, Button, Table } from 'antd';

const columns = [{
  dataIndex: 'name',
  title: 'Name',
  key: 'name',
  render: (text, record) => <Link to={`/organizations/${record.key}?action=edit`}>{text}</Link>
}];

class OrganizationsPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.actions.listOrganizations();
  }

  render() {
    return (
      <div>
        <div class="table-operations">
          <Row type="flex" justify="end">
            <Button>
              <Icon className="plus"/>
              <Link to="/organizations?action=create">
                Create Organization
              </Link>
            </Button>
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
