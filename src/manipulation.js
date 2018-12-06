import React from 'react';
import { ConfigManipulationPropTypes } from './prop-types';
import { MANIPULATION_NAME } from './constants';

class ManipulationWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    const { promises = {} } = props;
    this.state = {};
    Object.keys(promises).forEach((promiseName) => {
      const promise = promises[promiseName];
      this.state[promiseName] = {
        loading: false,
        error: null,
        data: null,
        manipulate: this.manipulate(promiseName, promise),
      };
    });
  }

  manipulate = (name, promise) => (...args) => {
    const { [name]: item } = this.state;
    this.setState({ [name]: { ...item, loading: true } });
    return Promise.resolve(promise(this.props, ...args))
      .then((data) => {
        this.setState({
          [name]: { ...item, loading: false, error: null, data },
        });
        return data;
      })
      .catch((error) => {
        this.setState({ [name]: { ...item, loading: false, error } });
        return Promise.reject(error);
      });
  };

  render() {
    const {
      name = MANIPULATION_NAME,
      promises,
      loading: loadingFunc,
      error: errorFunc,
      children,
      ...other
    } = this.props;

    const states = Object.values(this.state);
    const loading = states.some((item) => item.loading);
    const errorItem = states.find((item) => item.error);

    const props = {
      [name]: {
        ...this.state,
        loading,
        error: errorItem ? errorItem.error : null,
      },
      ...other,
    };

    if (loadingFunc && loading) {
      return loadingFunc(props);
    }
    if (errorFunc && errorItem) {
      return errorFunc(props);
    }

    if (children) {
      return children(props);
    }
    return null;
  }
}

ManipulationWrapper.propTypes = {
  ...ConfigManipulationPropTypes,
};

const createManipulationPromise = (defaultConfig = {}) => {
  const component = (config) => (
    <ManipulationWrapper {...defaultConfig} {...config} />
  );
  const hoc = (config = {}) => (Component) => {
    const comp = (props) => (
      <ManipulationWrapper {...props} {...defaultConfig} {...config}>
        {(cProps) => <Component {...cProps} />}
      </ManipulationWrapper>
    );
    comp.displayName = 'hoc(ManipulationWrapper)';
    return comp;
  };
  return { hoc, component };
};

const {
  hoc: manipulation,
  component: Manipulation,
} = createManipulationPromise();

export { manipulation, Manipulation, createManipulationPromise };
