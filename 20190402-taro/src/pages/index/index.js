import Taro, { Component } from '@tarojs/taro'
import './index.scss'
import { AtButton, AtInput, AtList, AtListItem  } from 'taro-ui'
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super()
    this.state = {
      list: [],
      val: ''
    }
  }
  handleChange(val) {
    this.setState({val})
  }
  addList = () => {
    const {list, val} = this.state
    list.push(val)
    this.setState({list, val: ''})
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <div>
        <AtInput
          clear
          title='验证码'
          type='text'
          maxLength='4'
          placeholder='验证码'
          value={this.state.val}
          onChange={this.handleChange.bind(this)}
        >
        </AtInput>
        <AtButton type='primary' onClick={this.addList.bind(this)}  >按钮文案</AtButton>
        <AtList>
          {this.state.list.map(item => {
            return (<AtListItem title={item} key={item} />)
          })}
        </AtList>
      </div>
    )
  }
}
