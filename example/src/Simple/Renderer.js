import React, { Fragment } from 'react';
import { Alert, Button } from 'antd';
import { Query } from 'bizico-react-promise';
import Loader from '../components/Loader';
import CodeHighlight from '../components/CodeHighlight';


const promises = () => new Promise((resolve) => {
  setTimeout(() => resolve('Loaded Data'), 2000);
});

export default () => (
  <Fragment>
    <Query
      name="data"
      defaultData="Loading ..."
      promises={promises}
      loading={(props) => <Loader {...props} />}
      error={() => <Alert message="ERROR" type="error" />}
    >
      {({ data: { data, refetch } }) => (
        <div>
          <div>{data}</div>
          <Button onClick={refetch}>Refresh</Button>
        </div>
      )}
    </Query>
    <CodeHighlight>
      {`
import React from 'react';
import { Alert, Button } from 'antd';
import { Query } from 'bizico-react-promise';
import Loader from '../components/Loader';


const promises = () => new Promise((resolve) => {
  setTimeout(() => resolve('Loaded Data'), 2000);
});

export default () => (
  <Query
    name="data"
    defaultData="Loading ..."
    promises={promises}
    loading={(props) => <Loader {...props} />}
    error={() => <Alert message="ERROR" type="error" />}
  >
    {({ data: { data, refetch } }) => (
      <div>
        <div>{data}</div>
        <Button onClick={refetch}>Refresh</Button>
      </div>
    )}
  </Query>
);
      `}
    </CodeHighlight>
  </Fragment>
);
