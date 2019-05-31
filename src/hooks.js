import { useState, useMemo, useCallback, useEffect } from "react";
import PromiseSwitch from "./PromiseSwitch";

/**
 * Query configuration.
 * @typedef {Object} QueryConfig
 * @property {boolean} [skip=false] - The name of the employee.
 * @property {*} [variables=null] - The value, it will refetch the promise
 * if it's not equal with previous value.
 * @property {*} [defaultData=null] -The start data for the state.
 */

/**
 * State object.
 * @typedef {Object} State
 * @property {boolean} loading - Loading for promise.
 * @property {*} data - Current data for promise.
 * @property {Object} [error=null] -The error object.
 */


/**
 * Loading hook to get loading status for all states.
 * @param {State[]} states - The states.
 * @returns {boolean} Loading status (true or false)
 */
const useLoadingForStates = (...states) => {
  const loading = useMemo(() => {
    return states.some((s) => s.loading);
  }, states);
  return loading;
}

const usePromise = (promise, updateState, variables, useVariables = false) => {
  const promiseSwitch = useMemo(() => new PromiseSwitch(), []);
  const action = useCallback((...args) => {
    updateState((prev) => {
      if (prev.loading) {
        return prev;
      }
      return { ...prev, loading: true };
    });
    const allArgs = [...args];
    if (useVariables) {
      allArgs.unshift(variables);
    }
    return promiseSwitch.call(promise(...allArgs)).then((response) => {
      updateState((prev) => ({ ...prev, loading: false, data: response, error: null }));
      return response;
    }).catch((error) => {
      updateState((prev) => ({ ...prev, loading: false, error }));
      throw error;
    });
  }, [updateState, promiseSwitch, variables]);
  return [action, promiseSwitch];
}

/**
 * Manipulation hook to update data.
 * @param {Promise} promise - The promise.
 * @returns {Array} Array with current state and a manipulate function
 */
const useManipulate = (promise) => {
  const [state, updateState] = useState({
    loading: false,
    error: null,
    data: null,
  });
  const [action, subscriber] = usePromise(promise, updateState);
  useEffect(() => {
    return function cleanup() {
      subscriber.cancel();
    };
  }, []);
  return [state, action];
};

/**
 * Query hook to fetch data from promise.
 * @param {Promise} promise - The promise.
 * @param {QueryConfig} [config={}] - The config to initialize the state.
 * @returns {Array} Array with current state and a refetch function
 */
const useQuery = (promise, config = {}) => {
  const mergedConfig = useMemo(() => ({ ...useQuery.config, ...config }), []);
  const [state, updateState] = useState({
    loading: !mergedConfig.skip,
    error: null,
    data: mergedConfig.defaultData,
  });
  const [refetch, subscriber] = usePromise(promise, updateState, config.variables, true);
  useEffect(() => {
    !mergedConfig.skip && refetch();
    return function cleanup() {
      subscriber.cancel();
    };
  }, [config.variables, refetch]);

  return [state, refetch];
};

/**
 * @constant
 * @type {QueryConfig}
 * @default
 */
const defaultConfig = {
  skip: false,
  defaultData: null,
  variables: null,
};

Object.defineProperty(useQuery, 'config', {
  configurable: true,
  get() { return defaultConfig },
});

/**
 * Update global Query config.
 * @param {QueryConfig} [config={}] - The config to update.
 * @returns {QueryConfig} Updated config
 */
useQuery.updateConfig = function(config = {}) {
  Object.assign(defaultConfig, config);
  return defaultConfig;
}

export { useQuery, useManipulate, useLoadingForStates };
