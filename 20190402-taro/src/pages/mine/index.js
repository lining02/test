import Taro, { Component } from '@tarojs/taro'
import './index.scss'
import { AtForm, AtInput, AtButton } from 'taro-ui'


class About extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  onSubmit() {

  }
  onReset() {

  }
  handleChange() {
    
  }
  render () {
    return (
      <div>
        {global.env === 'h5' ?  <AtForm
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
      >
        <AtInput
          name='value'
          title='文本'
          type='text'
          placeholder='单行文本'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <AtButton formType='submit'>提交</AtButton>
        <AtButton formType='reset'>重置</AtButton>
      </AtForm> : 
      <AtButton formType='reset'>微信点击登录</AtButton>}
      </div>
    )
  }
}
export default About
