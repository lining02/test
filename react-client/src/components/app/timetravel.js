// 时间-时光机
import React, { Component } from 'react';
class Timetravel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { timelist, toHis } = this.props
        return (
            <div className="Timetravel">
                {timelist.map(o => {
                    return (<span onClick={() => toHis(o)} key={o.id} className="items">{o.id}</span>)
                })}
            </div>
        );
    }
}

export default Timetravel;
