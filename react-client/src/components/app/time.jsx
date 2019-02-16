// 及时更新当前时间
import React, { Component } from 'react';
class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new Date().toLocaleTimeString(),
            count: 0,
            test: 'init'
        }
    }
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState((oldState) => {
                return {
                    data: new Date().toLocaleTimeString(),
                    count: oldState.count + 1
                }
            })
        }, 1000)
        this.setState((oldState) => {
            return {
                test: '修改后的test'
            }
        }, () => {
            // 及时更新后的state
            console.log('更新', this.state)
        })
        // 不能及时更新的state
        console.log('没有更新', this.state)
    }
    // 组件将要卸载,清除定时器
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        const { data } = this.state
        return (
            <div className="Time">
                <p>当前时间是{data}</p>
            </div>
        );
    }
}

export default Time;
