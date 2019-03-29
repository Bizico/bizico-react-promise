import React from "react";
import { Query } from "bizico-react-promise";

const getData = (props) => {
  return new Promise(resolve => {
    setTimeout(() => resolve("getData: DATA"), 1000);
  });
};

const getUser = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve("getUser: DATA"), 1000);
  });
};

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state;
    return (
      <div>
        <div>
          <input value={search} onChange={this.handleChange} />
        </div>
        {search ? (
          <Query key="1" name="data" promise={getData} defaultData={"getData: NO DATA"} search={search} variables={{ search }}>
            {({ data: { loading, data } }) => {
              return loading ? 'LOADING' : data;
            }}
          </Query>
        ) : (
          <Query key="2" name="user" promise={getUser} defaultData={"getUser: NO DATA"}>
            {({ user: { data } }) => {
              console.log(1111111);
              return data;
            }}
          </Query>
        )}
      </div>
    );
  }
}

export default Example;
