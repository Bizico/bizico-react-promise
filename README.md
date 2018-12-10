# @bizico/react-promise

> wrap your component to work with side effects easier

[![NPM](https://img.shields.io/npm/v/@bizico/react-promise.svg)](https://www.npmjs.com/package/@bizico/react-promise) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @bizico/react-promise
```

## [Demo](https://bizico.github.io/bizico-react-promise)

## Usage Query (query hoc)

```jsx
import React from 'react';
import { Query } from '@bizico/react-promise';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Error from '../components/Error';

const promise = () => new Promise((resolve) => {
  setTimeout(() => resolve('Loaded Data'), 2000);
});

const Example = () => (
  <Query
    name="data"
    defaultData="Loading ..."
    promise={promise}
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

```jsx
import React from 'react';
import { query, PromisePropTypes } from '@bizico/react-promise';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Error from '../components/Error';

const promise = () => new Promise((resolve) => {
  setTimeout(() => resolve('Loaded Data'), 2000);
});

const Example = ({ data: { data, refetch } }) => (
  <div>
    <div>{data}</div>
    <Button onClick={refetch}>Refresh</Button>
  </div>
)

Example.propTypes = {
  data: PromisePropTypes.isRequired,
};

const Component = query({
  name: 'data',
  defaultData: 'Loading ...',
  promise,
  loading: (props) => <Loader {...props} />,
  error: (props) => <Error {...props} />,
})(Example);
```

#### Props
| Name    | Description                              | Type       | Default |
|-----------|------------------------------------------|------------|---------|
| promise | Get promise to load data | (props, ...args): Promise | - |
| skip | If true then promise will not be called immediately | (props): Boolean | props => false |
| complete | Map data if Promise is fulfilled | (data): any | data => data |
| loading | Loader component when Promise is pending | (props): Component | null |
| error | Error component when Promise is rejected | (props): Component | null |
| variables | Refetch promise if variables are changed (shallow compare) | (props): Object | null |
| name | Prop Name | String | data |
| defaultData | Default data if promise is not loaded | any | null |

#### PromisePropTypes
| Name    | Description                              | Type       |
|-----------|------------------------------------------|------------|
| refetch | Refetch promise with extra args | (props, ...args): Promise |
| data | Response data | any |
| loading | Promise state | Boolean |
| error | if promise is rejected  | Error |


## Usage Manipulation (manipulation hoc)

```jsx
import React from 'react';
import { Manipulation } from '@bizico/react-promise';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Error from '../components/Error';

const promises = {
  updateFirst: (props, ...args) => (
    new Promise((resolve) => {
      setTimeout(() => resolve('Loaded: First Data'), 1000);
    })
  ),
  updateSecond: (props, ...args) => (
    new Promise((resolve) => {
      setTimeout(() => resolve('Loaded: Second Data'), 1000);
    })
  ),
};

const Example = () => (
  <Manipulation
    name="manipulation"
    promises={promises}
    loading={(props) => <Loader {...props} />}
    error={(props) => <Error {...props} />},
  >
    {({ manipulation: { updateFirst, updateSecond } }) => (
      <div>
        {updateFirst.data && <div>{updateFirst.data}</div>}
        {updateSecond.data && <div>{updateSecond.data}</div>}
        <Button onClick={() => updateFirst.manipulate('First action')}>Update First</Button>
        <Button onClick={() => updateSecond.manipulate('Second action')}>Update Second</Button>
      </div>
    )}
  </Manipulation>
);
```

```jsx
import React from 'react';
import { manipulation, manipulationPropTypes } from '@bizico/react-promise';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Error from '../components/Error';

const promises = {
  updateFirst: () => (
    new Promise((resolve) => {
      setTimeout(() => resolve('Loaded: First Data'), 1000);
    })
  ),
  updateSecond: () => (
    new Promise((resolve) => {
      setTimeout(() => resolve('Loaded: Second Data'), 1000);
    })
  ),
};

const Example = ({ manipulation: { updateFirst, updateSecond } }) => (
  <div>
    {updateFirst.data && <div>{updateFirst.data}</div>}
    {updateSecond.data && <div>{updateSecond.data}</div>}
    <Button onClick={() => updateFirst.manipulate('First action')}>Update First</Button>
    <Button onClick={() => updateSecond.manipulate('Second action')}>Update Second</Button>
  </div>
);

Example.propTypes = {
  manipulation: manipulationPropTypes('updateFirst', 'updateSecond').isRequired,
};

const Wrapper = manipulation({
  name: 'manipulation',
  promises,
  loading: (props) => <Loader {...props} />,
  error:(props) => <Error {...props} />,
})(Example);
```

#### Props
| Name    | Description                              | Type       | Default |
|-----------|------------------------------------------|------------|---------|
| promises | Get promises to load/manipulate data | (props, ...args): Object | - |
| loading | Loader component when Promise is pending | (props): Component | null |
| error | Error component when Promise is rejected | (props): Component | null |
| name | Prop Name | String | manipulation |

#### manipulationPropTypes(...)
| Name    | Description                              | Type       |
|-----------|------------------------------------------|------------|
| loading | Promise state | Boolean |
| error | if promise is rejected  | Error |

## License

MIT © [Bizico](https://github.com/Bizico)
