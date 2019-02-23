export default (state = false, action) => {
    switch (action.type) {
      case "logout":
        return false;
      case "login_sucess":
        console.log('登陆成功', action.user)
        return true;
      case "login_error":
        console.log('登陆失败', action.message)
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
  const errorLogin = () => {
    return {type:'login_error'}
  };
  const successLogin = () => {
    return {type:'login'}
  };
  const asyncLogin = () => {
    return {type:'async_login'}
  };
  const asyncLogout = () => {
    return {type:'async_logout'}
  };
  export { login, errorLogin, logout, asyncLogin, asyncLogout, successLogin };
  