export default (state = false, action) => {
    switch (action.type) {
      case "login":
        return true;
      case "logout":
        return false;
      default:
        return state;
    }
  };
  
  const logout = () => {
    return { type: "logout" };
  };
  const login = () => {
    return { type: "login" };
  };
  const asyncLogin = () => {
    return (dispatch, state) => {
      setTimeout(() => {
        dispatch({ type: "login" });
      }, 1000);
    };
  };
  const asyncLogout = () => {
    return (dispatch, state) => {
      setTimeout(() => {
        dispatch({ type: "logout" });
      }, 1000);
    };
  };
  
  export { login, asyncLogin, logout, asyncLogout };
  