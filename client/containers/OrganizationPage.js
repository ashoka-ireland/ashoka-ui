import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import client from 'api/client';
import { OrganizationDetailsForm } from 'components';
import { actions } from '../reducers/organizations/actions';

class OrganizationPage extends Component {
  componentDidMount() {
    const { mode } = this.props;
    if(mode === 'edit' || mode === 'view'){
      if(!this.props.params.organizationKey) {
        notification.error('Organization key not found...');
        browserHistory('/organizations');
        return;
      }
      this.props.actions.getOrganization(this.props.params.organizationKey);
    }
  }

  save(organization) {
    client.createOrganization(organization).then(() => {
      browserHistory.push('/organizations');
    });
  }

  render() {
    return (
      <main class="container">
        <OrganizationDetailsForm onSave={this.save} organization={this.props.organization} />
      </main>
    );
  }
}

OrganizationPage.propTypes = {};
OrganizationPage.defaultProps = {};

const mapStateToProps = (state) => ({
  organization: state.organization,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationPage);
