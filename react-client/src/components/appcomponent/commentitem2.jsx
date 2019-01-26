import React from "react";
// memo高阶函数，浅比较props是否改变，从而判断是否刷新
const Commentitem = React.memo(props => {
  let { message } = props;
  console.log(props);
  return <p>{message}</p>;
});

export default Commentitem;
