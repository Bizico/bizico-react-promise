import PropTypes from 'prop-types';

export const PromisePropTypes = PropTypes.shape({
  data: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.instanceOf(Error),
  ]),
});

export const ConfigPropTypes = {
  name: PropTypes.string,
  defaultData: PropTypes.any,
  promises: PropTypes.func,
  loading: PropTypes.func,
  error: PropTypes.func,
  complete: PropTypes.func,
};

export const ManipulationPropTypes = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.instanceOf(Error),
  ]),
});

export const ConfigManipulationPropTypes = {
  name: PropTypes.string,
  promises: PropTypes.object,
  loading: PropTypes.func,
  error: PropTypes.func,
};
