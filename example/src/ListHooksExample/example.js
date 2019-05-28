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

ReactDOM.render(<ListExample />, mountNode);
`;
