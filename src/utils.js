export const isFunction = (fn) => (
  fn && {}.toString.call(fn) === '[object Function]'
)

export const isObject = (ob) => (
  ob && {}.toString.call(ob) === '[object Object]'
)

export const reservedProps = [
  "name",
  "defaultData",
  "skip",
  "promise",
  "loading",
  "error",
  "complete",
  "variables",
  "children"
];

export const excludeReservedProps = props => {
  const newProps = {};
  for (const prop in props) {
    if (!reservedProps.includes(prop)) {
      newProps[prop] = props[prop];
    }
  }
  return newProps;
};

export const getVariables = ({ variables, ...props }) => {
  let newProps = null;
  if (isFunction(variables)) {
    newProps = variables(excludeReservedProps(props));
  } else if (isObject(variables)) {
    newProps = variables;
  }
  return newProps;
};

export const getDefaultData = ({ defaultData, ...props }) => {
  if (isFunction(defaultData)) {
    return defaultData(excludeReservedProps(props));
  }
  return defaultData || null;
};
