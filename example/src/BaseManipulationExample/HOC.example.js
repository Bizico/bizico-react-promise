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
  error: () => <Alert message="ERROR" type="error" />,
})(Example);


ReactDOM.render(<Wrapper />, mountNode);
`;
