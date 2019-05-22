import React, { useState } from "react";
import { useQuery } from "bizico-react-promise";

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

const useAaa = () => {
  const [aaa, updateState] = useState(10);
  return aaa;
}

const Example = () => {
  // const data = usePromise([getData, getUser]);
  const val = useQuery();
  console.log(111111);
  return (
    <div>
      <h3>Query hook</h3>
    </div>
  )
};

export default Example;
