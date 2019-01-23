import React, { Component } from 'react';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { goods, title, addCart } = this.props
    return (
      <div className="list">
        <p>{title}</p>
        {goods.map(o => {
          return (<div key={o.id}>
            <span>{o.name}</span>
            <span>${o.price}</span>
            <button onClick={() => addCart(o)}>加入购物车</button>
          </div>)
        })}
      </div>
    );
  }
}

export default List;
