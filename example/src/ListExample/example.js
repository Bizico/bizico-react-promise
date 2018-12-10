export default `
// Antd design components

const ListData = {
  data: [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
  ],
  load: function() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.data]), 1000);
    });
  },
  add: function (label) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = Math.floor((Math.random() * 1000) + 1)
        this.data.push({ label, id });
        resolve(id);
      }, 1000);
    });
  },
  remove: function (id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data = this.data.filter((item) => item.id !== id);
        resolve(id);
      }, 1000);
    });
  },
};


class ListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  add(label) {
    if (label) {
      const { manipulation: { add }, data: { refetch } } = this.props;
      add.manipulate(label).then(refetch).then(() => this.setState({ value: '' }));
    }
  };

  remove(id) {
    const { manipulation: { remove }, data: { refetch } } = this.props;
    remove.manipulate(id).then(() => refetch());
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  };

  render() {
    const { data: { loading, data }, manipulation } = this.props;
    const { value } = this.state;
    const pageLoading = loading || manipulation.loading;
    return (
      <React.Fragment>
        <List loading={pageLoading}>
          {data.map((item) => (
            <List.Item
              key={item.id}
              actions={[
                <a href="" onClick={(e) => { e.preventDefault(); this.remove(item.id); }}>delete</a>,
              ]}
            >
              {item.label}
            </List.Item>
          ))}
        </List>
        {!pageLoading && (
          <React.Fragment>
            <br />
            <Input
              value={value}
              onChange={this.handleChange}
              placeholder="new item label"
            />
            <Button onClick={() => this.add(value)}>Add</Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const Component = compose(
  query({
    promise: () => ListData.load(),
    defaultData: [],
  }),
  manipulation({
    promises: {
      add: (props, data) => ListData.add(data),
      remove: (props, id) => ListData.remove(id),
    },
  }),
)(ListExample);

ReactDOM.render(<Component />, mountNode);
`;
