import React, { useState, useMemo } from "react";
import { PROMISE_NAME } from "./constants";
import { ConfigPropTypes } from "./prop-types";
import shallowDiffers from "./shallow-differs";
import PromiseSwitch from "./PromiseSwitch";
import { getDefaultData } from './utils';


const defaultConfig = {
  skip: false,
  defaultData: null,
};

const useQuery = (promise, config = defaultConfig) => {
  const [aaa, updateState] = useState(10);
  return aaa;


  // console.log(promise, config);
  // // const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), []);
  // const [state, updateState] = useState({
  //   // loading: !skip,
  //   error: null,
  //   // data: getDefaultData(props),
  // });

  // // const refetch = () => {};

  // // return {
  // //   ...state,
  // //   refetch,
  // // };
  // return state;
};

export default useQuery;
