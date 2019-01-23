import React, { Component } from 'react';
class Cartlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { cartlist, cartHander } = this.props
    return (
      <div className="Cartlist">
        {cartlist.map(o => {
          return (<div key={o.id}>
            <span>{o.name}</span>
            <span>${o.price}</span>
            <span>{o.count}</span>
            <button onClick={() => cartHander('-', o)}>-</button>
            <button onClick={() => cartHander('+', o)}>+</button>
          </div>)
        })}
      </div>
    );
  }
}

export default Cartlist;
