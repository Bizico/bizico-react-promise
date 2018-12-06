# @bizico/react-promise

> wrap your component to work with side effects easier

[![NPM](https://img.shields.io/npm/v/@bizico/react-promise.svg)](https://www.npmjs.com/package/@bizico/react-promise) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @bizico/react-promise
```

## Usage

```jsx
import React from 'react';
import { Query } from '@bizico/react-promise';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Error from '../components/Error';

const promises = () => new Promise((resolve) => {
  setTimeout(() => resolve('Loaded Data'), 2000);
});

const Example = () => (
  <Query
    name="data"
    defaultData="Loading ..."
    promises={promises}
    loading={(props) => <Loader {...props} />}
    error={(props) => <Error {...props} />}
  >
    {({ data: { data, refetch } }) => (
      <div>
        <div>{data}</div>
        <Button onClick={refetch}>Refresh</Button>
      </div>
    )}
  </Query>
)
```

## License

MIT © [Bizico](https://github.com/Bizico)
