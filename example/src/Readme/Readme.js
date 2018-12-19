import React from 'react';
import { Alert, Button } from 'antd';
import { query, manipulation } from 'bizico-react-promise';

let index = 0;
const promise = () => new Promise((resolve) => {
  setTimeout(() => {
    index += 1;
    resolve(`Loaded Data ${index}`);
  }, 2000);
});

const promises = {
  update: () => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        index += 1;
        reject(new Error('fail'));
      }, 2000);
    })
  ),
};

const Example = ({ manipulation: { loading, update } }) => {
  return (
    <div>
      <div>{update.error && update.error.message}</div>
      <Button onClick={update.manipulate}>Refresh</Button>
    </div>
  );
};
const Wrapper = manipulation({
  name: 'manipulation',
  promises,
  // error: () => <Alert message="ERROR" type="error" />,
  skip: () => true,
})(Example);

export default Wrapper;
