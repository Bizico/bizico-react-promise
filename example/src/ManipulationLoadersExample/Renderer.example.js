export default `
const promises = {
  successPromise: () => (
    new Promise((resolve) => {
      setTimeout(() => resolve('Loaded: First Data'), 1000);
    })
  ),
  errorPromise: () => (
    new Promise((resolve, reject) => {
      setTimeout(() => reject('Error: Second Data'), 1000);
    })
  ),
};

const Example = () => (
  <Manipulation
    name="manipulation"
    promises={promises}
  >
    {({ manipulation: { successPromise, errorPromise } }) => (
      <div>
        <div>
          {successPromise.loading ? 'Loading First ...' : (
            successPromise.error || successPromise.data
          )}
        </div>
        <div>
          {errorPromise.loading ? 'Loading Second ...' : (
            errorPromise.error || errorPromise.data
          )}
        </div>
        <Button onClick={() => successPromise.manipulate('First action')}>Success</Button>
        <Button onClick={() => errorPromise.manipulate('Second action')}>Error</Button>
      </div>
    )}
  </Manipulation>
);
ReactDOM.render(<Example />, mountNode);
`;
