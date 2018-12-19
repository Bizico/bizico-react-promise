import React from 'react';
import { PROMISE_NAME } from './constants';
import { ConfigPropTypes } from './prop-types';
import shallowDiffers from './shallow-differs';
import PromiseSwitch from './PromiseSwitch';

class PromiseWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    const { skip, defaultData = null } = props;
    this.skip = skip(props);
    this.state = { loading: !this.skip, error: null, data: defaultData };
    this.loaded = false;
    this.isMount = false;
    this.promiseSwitch = new PromiseSwitch();
  }

  componentDidMount() {
    this.isMount = true;
    if (!this.skip) {
      this.query();
      this.loaded = true;
    }
  }

  componentDidUpdate(prevProps) {
    const { skip, variables } = this.props;
    if (!this.loaded && !skip(this.props)) {
      this.skip = false;
      this.loaded = true;
      this.refetch();
    } else if (
      !this.skip
      && variables
      && shallowDiffers(variables(prevProps), variables(this.props))
    ) {
      this.refetch();
    }
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  query = (...args) => {
    const { promise, complete, variables } = this.props;
    let { props } = this;
    if (variables) {
      props = variables(this.props);
    }

    this.promiseSwitch.call(Promise.resolve(promise(props, ...args)))
      .then((data) => {
        const response = complete(data);
        if (this.isMount) {
          this.setState({ loading: false, data: response, error: null });
        }
        return response;
      })
      .catch((error) => {
        if (this.isMount) {
          this.setState({ loading: false, error });
        }
        throw error;
      });
  };

  refetch = (...args) => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ loading: true });
    }
    return this.query(...args);
  };

  render() {
    const { loading: promiseLoading, error: promiseError } = this.state;
    const {
      name,
      defaultData,
      skip,
      promise,
      loading,
      error,
      complete,
      children,
      ...other
    } = this.props;

    const props = {
      [name]: { ...this.state, refetch: this.refetch },
      ...other,
    };

    if (promiseLoading && loading) {
      return loading(props);
    }
    if (promiseError && error) {
      return error(props);
    }

    if (children) {
      return children(props);
    }
    return null;
  }
}

PromiseWrapper.propTypes = ConfigPropTypes;

PromiseWrapper.defaultProps = {
  skip: () => false,
  complete: (data) => data,
  name: PROMISE_NAME,
  defaultData: null,
  variables: null,
  loading: null,
  error: null,
};

const createPromise = (defaultConfig = {}) => {
  const component = (config) => (
    <PromiseWrapper {...defaultConfig} {...config} />
  );
  const hoc = (config = {}) => (Component) => {
    const comp = (props) => (
      <PromiseWrapper {...props} {...defaultConfig} {...config}>
        {(cProps) => <Component {...cProps} />}
      </PromiseWrapper>
    );
    comp.displayName = 'hoc(PromiseWrapper)';
    return comp;
  };
  return { hoc, component };
};

const { hoc: query, component: Query } = createPromise();

export { query, Query, createPromise };
