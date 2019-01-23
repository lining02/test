import React, { Component } from 'react';
class Lifecycle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // componentWillMount() { console.log('componentWillMount'); }
    componentDidMount() { console.log('componentDidMount'); }
    // componentWillUpdate() { console.log('componentWillUpdate'); }
    componentDidUpdate() { console.log('componentDidUpdate'); }
    // componentWillReceiveProps() { console.log('componentWillReceiveProps'); }
    componentWillUnmount() { console.log('componentWillUnmount'); }
    shouldComponentUpdate() { console.log('shouldComponentUpdate'); return true }
    componentDidCatch() { console.log('componentDidCatch'); }
    getSnapshotBeforeUpdate() { console.log('getSnapshotBeforeUpdate'); return null }
    // getDerivedStateFromProps() {console.log('getDerivedStateFromProps');}
    // getSnapshotBeforeUpdate包含了下面的三个
    // componentWillMount
    // componentWillReceiveProps
    // componentWillUpdate
    render() {
        let { data } = this.props
        console.log('render')
        return (
            <div className="Lifecycle">
                {data}
            </div>
        );
    }
}

export default Lifecycle;
