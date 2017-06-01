import React, {
  PropTypes
} from 'react';

import _ from 'lodash';

const ACTION_QUERY = 'location.query.action';
const SUPPORTED_MODES = {
  VIEW: 'view',
  EDIT: 'edit',
  CREATE: 'create',
  LIST: 'list'
};

const PageWrapper = (modeToComponentMap) => {
  class PageFlowWrapper extends React.Component {
    constructor(props, context) {
      super(props, context);

      const defaultMode = modeToComponentMap.defaultMode || this.props.defaultMode;

      if(!this.support(defaultMode)){
        throw new Error(`Trying to initialize a PageFlowWrapper with invalid default mode ${defaultMode}`);
      }

      if(!this.componentFor(defaultMode)) {
        throw new Error(`PageFlowWrapper needs at least to provide a ${defaultMode} component to map with`);
      }

      this.state = this.getActionAndComponent(this.props);
    }

    componentWillReceiveProps(nextProps) {
      const { mode, component } = this.getActionAndComponent(nextProps);
      if(mode !== this.state.mode) this.setState({mode, component});
    }

    support = (mode) => {
      return typeof mode === 'string' && SUPPORTED_MODES.hasOwnProperty(mode.toUpperCase());
    };

    componentFor = (mode) => {
      if(!modeToComponentMap || !modeToComponentMap.hasOwnProperty(mode) || !this.support(mode)) {
        return null;
      }

      return  modeToComponentMap[mode];
    };

    getActionAndComponent = (props) => {
      const mode = _.get(props, ACTION_QUERY, modeToComponentMap.defaultMode);
      const component = this.componentFor(mode);

      return {
        mode: component ? mode : modeToComponentMap.defaultMode,
        component: component || modeToComponentMap[modeToComponentMap.defaultMode]
      };
    };

    render() {
      const { mode, component } = this.state;

      return React.createElement(component, {
        ...this.props,
        mode,
        modes: SUPPORTED_MODES,
      });
    }
  }

  return PageFlowWrapper;
};

PageWrapper.propTypes = {
  edit: PropTypes.element,
  create: PropTypes.element,
  view: PropTypes.element,
  list: PropTypes.element,
  defaultMode: PropTypes.string
};

PageWrapper.defaultProps = {
  defaultMode: 'view'
};

export default PageWrapper;

