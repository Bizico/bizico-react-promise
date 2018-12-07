export default `
const promise = () => new Promise((resolve) => {
  setTimeout(() => resolve('Loaded Data'), 2000);
});

const Example = () => (
  <Query
    name="data"
    defaultData="Loading ..."
    promise={promise}
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
ReactDOM.render(<Example />, document.getElementById("example"));
`;
