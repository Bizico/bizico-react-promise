import React from 'react';
import { Alert, Button } from 'antd';
import { query, PromisePropTypes } from 'bizico-react-promise';
import Loader from '../components/Loader';


const promises = () => new Promise((resolve) => {
  setTimeout(() => resolve('Loaded Data'), 1000);
});

const Component = ({ data: { data, refetch } }) => (
  <div>
    <div>{data}</div>
    <Button onClick={refetch}>Refresh</Button>
  </div>
);

Component.propTypes = {
  data: PromisePropTypes.isRequired,
};

export default query({
  name: 'data',
  defaultData: 'Loading ...',
  promises,
  loading: (props) => <Loader {...props} />,
  error: () => <Alert message="ERROR" type="error" />,
})(Component);
