import Taro, { Component } from '@tarojs/taro'
import './about.scss'
import { AtButton, AtInput, AtList, AtListItem  } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'


@inject('counterStore')
@observer
class About extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      val: ''
    }
  }
  handleChange(val) {
    this.setState({val})
  }
  addList() {
    const { counterStore } = this.props
    const {val} = this.state
    const idx = Math.random()
    if(idx > 0.5) {
      counterStore.addItemAsync(val)
    } else {
      counterStore.addItem(val)
    }
    this.setState({ val: '' })
  }
  deleteItem = (idx) => {
    const { counterStore } = this.props
    if(idx %2 === 0) {
      counterStore.deleteItemAsync(idx)
    } else {
      counterStore.deleteItem(idx)
    }
  }
  render () {
    const { counterStore } = this.props
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
        <AtButton type='primary' onClick={() =>this.addList()}  >按钮文案</AtButton>
        <AtList>
          {counterStore.list.map((item, idx) => {
            return (<AtListItem title={item} key={item} isSwitch onSwitchChange={()=>this.deleteItem(idx)} />)
          })}
        </AtList>
      </div>
    )
  }
}
export default About
