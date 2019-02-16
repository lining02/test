import React, { Component } from 'react';
class Lifecycle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static getDerivedStateFromProps() { console.log('getDerivedStateFromProps');return null}
    // componentWillMount() { console.log('componentWillMount: 组件将要挂载'); } // 可以访问属性和状态了，可以进行api调用，但没办法做dom相关操作
    componentDidMount() { console.log('componentDidMount： 组件已经挂载'); }
    // componentWillUpdate() { console.log('componentWillUpdate： 组件将要更新'); }
    componentDidUpdate() { console.log('componentDidUpdate: 组件已经更新'); }
    // componentWillReceiveProps() { console.log('componentWillReceiveProps： 组件的props属性将要更新'); }
    componentWillUnmount() { console.log('componentWillUnmount： 组件将要销毁'); }
    shouldComponentUpdate() { console.log('shouldComponentUpdate： return true则要更新，return false 则不更新'); return true }
    componentDidCatch() { console.log('componentDidCatch'); }
    getSnapshotBeforeUpdate() { console.log('getSnapshotBeforeUpdate: render之前调用' ); }
   
    // 下面的三个组件 由该组件替代 getDerivedStateFromProps
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
