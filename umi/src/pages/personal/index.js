import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva'

@connect(({ loading, app }) => ({ loading, app }))
class Permission extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'app/getData' })
  }
  render() {
    const {columns, list} = this.props.app
    return <Table columns={columns} dataSource={list} scroll={{ x: 1500, y: 300 }} />
  }
}

export default Permission
