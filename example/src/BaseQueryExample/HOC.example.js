export default `
const promise = () => new Promise((resolve) => {
  setTimeout(() => resolve('Loaded Data'), 1000);
});

const Example = ({ data: { data, refetch } }) => (
  <div>
    <div>{data}</div>
    <Button onClick={refetch}>Refresh</Button>
  </div>
);

const Wrapper = query({
  name: 'data',
  defaultData: 'Loading ...',
  promise,
  loading: (props) => <Loader {...props} />,
  error: () => <Alert message="ERROR" type="error" />,
})(Example);


ReactDOM.render(<Wrapper />, mountNode);
`;
