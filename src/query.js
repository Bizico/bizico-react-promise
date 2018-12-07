import React from 'react';
import { ERROR_REFETCH_MESSAGE, PROMISE_NAME } from './constants';
import { ConfigPropTypes } from './prop-types';
import shallowDiffers from './shallow-differs';

class PromiseWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    const { skip = () => false, defaultData = null } = props;
    this.skip = skip(props);
    this.state = { loading: !this.skip, error: null, data: defaultData };
    this.loaded = false;
    this.isMount = false;
  }

  componentDidMount() {
    this.isMount = true;
    if (!this.skip) {
      this.query();
      this.loaded = true;
    }
  }

  componentDidUpdate(prevProps) {
    const { skip = () => false, variables } = this.props;
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
    const { promises = () => null, complete, variables } = this.props;
    let { props } = this;
    if (variables) {
      props = variables(this.props);
    }
    return Promise.resolve(promises(props, ...args))
      .then((data) => {
        const response = complete ? complete(data) : data;
        if (this.isMount) {
          this.setState({ loading: false, data: response, error: null });
        }
        return response;
      })
      .catch((error) => {
        if (this.isMount) {
          this.setState({ loading: false, error });
        }
        return Promise.reject(error);
      });
  };

  refetch = (...args) => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ loading: true });
      return this.query(...args);
    }
    return Promise.reject(ERROR_REFETCH_MESSAGE);
  };

  render() {
    const { loading: promiseLoading, error: promiseError } = this.state;
    const {
      name = PROMISE_NAME,
      defaultData,
      skip,
      promises,
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

PromiseWrapper.propTypes = {
  ...ConfigPropTypes,
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
