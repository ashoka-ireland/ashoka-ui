import { Form, Button, Row, Switch, Input } from 'antd';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import client from '../api/client';
import { actions } from '../reducers/nominees/actions';
import { NomineeFormItems } from '../components';
import * as constants from '../api/constants';

const FormItem = Form.Item;

class NomineePage extends Component {

  componentWillMount = () => {
    if (this.props.params.nomineeKey == 'create') {
      // Clear previous nominee
      this.props.actions.getNominee(null);
    } else {
      this.props.actions.getNominee(this.props.params.nomineeKey);
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const updatedNominee = Object.assign({}, this.props.nominee, values);
        client.createNominee(updatedNominee);
        this.props.history.push('/nominees');
      }
    });
  }

  render = () => (
    <main class="container">
      <div className="nominee-page">
        <Form>
          <h1>Nomination Form</h1>

          <FormItem
            {...this.props.form.formItemLayout}
            label="Draft"
          >
            { this.props.form.getFieldDecorator(constants.DRAFT, {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Switch />
            )}
          </FormItem>

          <hr className="divider secondary" />

          <NomineeFormItems form={this.props.form} requireFields={false} />

          <FormItem
            {...this.props.form.formItemLayout}
            label="Additional Notes"
          >
            { this.props.form.getFieldDecorator(constants.ADDITIONAL_NOMINEE_INFO)(
                <Input type="textarea" rows={3} />
              )
            }
          </FormItem>

          <hr className="divider secondary" />

          <Row>
            <Button type="primary"
                    htmlType="submit"
                    onClick={this.submit}
                    style={{ marginLeft: 20 }}
                    size="large">
              Save Nominee
            </Button>
          </Row>
        </Form>
      </div>
    </main>
  )
}

NomineePage.propTypes = {
  nominee: PropTypes.object,
  params: PropTypes.shape({
    nomineeKey: PropTypes.string
  }),
  actions: PropTypes.shape({
    getNominee: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => ({
  nominee: state.nominee
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields: (props) => mapValues(props.nominee, (value) => ({ value }))
})(NomineePage));
