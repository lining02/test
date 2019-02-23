export default (state = 0, action) => {
    switch (action.type) {
      case "add":
        console.log(action.user)
        return state + 1;
      case "minus":
        console.log(action.user)
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
  const asyncAdd = (flag) => {
    return { type: "async_add", flag }
  };
  const asyncMinus = (flag) => {
    return { type: "async_minus" }
  };
  const asyncCount = (flag) => {
    return {type: 'async_count', flag}
  }
  export { add, minus, asyncAdd, asyncMinus, asyncCount };
  
  