# @bizico/react-promise

> wrap your component to work with side effects easier

[![NPM](https://img.shields.io/npm/v/@bizico/react-promise.svg)](https://www.npmjs.com/package/@bizico/react-promise) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @bizico/react-promise
```

## [Demo](https://bizico.github.io/bizico-react-promise)

## Usage React hooks

```javascript
// Change global config for useQuery
useQuery.updateConfig(config)

// Get global config
useQuery.config
```

```javascript
useQuery(promise, config) -> [state, action]
```
**possible configuration**

* `skip`: true/false, default false - *if you want to skip firs query*
* `variables`: any, default null - *if you want to call refetch when som data is changed*
* `defaultData`: any, default null - *data for initial state*

```javascript
useManipulate(promise) -> [state, action]
```

```javascript
// Check if there are loading in some states
useLoadingForStates(state1, state2, ...) -> true/false
```

**state**

* `loading`: true/false, default false
* `data`: any, default == defaultData from configuration
* `error`: error, default null

**action** - special function to call your promise with first argument `variables` (if you use `useQuery`) and update the `state`

### Example

```jsx
import React, { useState, useCallback } from 'react';
import { List, Input, Button } from 'antd';
import { useQuery, useManipulate, useLoadingForStates } from 'bizico-react-promise';

const ListData = {
  data: [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
  ],
  load: function() {
    return Promise.resolve([...this.data]);
  },
  add: function (label) {
    const id = Math.floor((Math.random() * 1000) + 1)
    this.data.push({ label, id });
    return Promise.resolve(id);
  },
  remove: function (id) {
    this.data = this.data.filter((item) => item.id !== id);
    return Promise.resolve(id);
  },
};

const ListExample = () => {
  const [state, refetch] = useQuery(
    () => ListData.load(),
    { defaultData: [] },
  );
  const [addState, add] = useManipulate(
    (d) => ListData.add(d),
  );
  const [removeState, remove] = useManipulate(
    (id) => ListData.remove(id),
  );
  const loading = useLoadingForStates(state, addState, removeState);

  const [value, setValue] = useState('');
  
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, [setValue]);

  const handleAdd = useCallback((label) => {
    if (label) {
      add(label)
        .then(() => refetch())
        .then(() => setValue(''));
    }
  }, [add, refetch, setValue]);

  const handleRemove = useCallback((id) => {
    remove(id).then(() => refetch());
  }, [remove, refetch]);

  return (
    <React.Fragment>
      <List loading={loading}>
        {state.data.map((item) => (
          <List.Item
            key={item.id}
            actions={[
              <a href="/" onClick={(e) => { e.preventDefault(); handleRemove(item.id); }}>delete</a>,
            ]}
          >
            {item.label}
          </List.Item>
        ))}
      </List>
      {!loading && (
        <React.Fragment>
          <br />
          <Input
            value={value}
            onChange={handleChange}
            placeholder="new item label"
          />
          <Button onClick={() => handleAdd(value)}>Add</Button>
          <Button onClick={refetch}>Refetch</Button>
        </React.Fragment>
      )}
    </React.Fragment>
  )
};
```

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
| promise | Get promise to load data | ({...props, ...variables}, ...args): Promise | - |
| skip | If true then promise will not be called immediately | (props): Boolean | props => false |
| complete | Map data if Promise is fulfilled | (data): any | data => data |
| loading | Loader component when Promise is pending | ({...props, ...variables}): Component | null |
| error | Error component when Promise is rejected | ({...props, ...variables}): Component | null |
| variables | Refetch promise if variables are changed (shallow compare) | (props): Object or Object | null |
| name | Prop Name | String | data |
| defaultData | Default data if promise is not loaded | (props): any or any | null |

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
