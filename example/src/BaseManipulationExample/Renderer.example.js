export default `
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

const Example = () => (
  <Manipulation
    name="manipulation"
    promises={promises}
    loading={(props) => <Loader {...props} />}
    error={() => <Alert message="ERROR" type="error" />}
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
ReactDOM.render(<Example />, mountNode);
`;
