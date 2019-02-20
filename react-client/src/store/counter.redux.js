export default (state = 0, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
};

const add = () => {
  return { type: "add" };
};
const minus = () => {
  return { type: "minus" };
};
const asyncAdd = () => {
  return (dispatch, state) => {
    setTimeout(() => {
      dispatch({ type: "add" });
    }, 1000);
  };
};

export { add, minus, asyncAdd };
