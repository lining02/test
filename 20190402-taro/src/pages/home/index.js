import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtCard, AtBadge, AtIcon, AtLoadMore   } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import "@tarojs/async-await";
import { log } from 'util';


@inject('cartStore')
@observer
class About extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      val: '',
      status: 'more',
      start: 0
    }
  }
  addCart(item) {
    const { cartStore } = this.props
    cartStore.addCart(item)
  }
  componentWillMount() {
    this.getList()
  }
  async handleClick () {
    const start = this.state.start + 10
    this.setState({
      start
    })
    await this.setState({
      status: 'loading'
    })
    await this.getList(start)
    const { total } = this.state
    this.setState({
      status: total > start + 10 ? 'more' : 'noMore'
    })
  }
  getList(start) {
    start = start || this.state.start
    Taro.request({
      url: `http://localhost:3000/api/goods?start=${start}`  
    }).then(response => {
      const {list, total}= response.data
      this.setState({
        list: [...this.state.list, ...list],
        total
      })
    })
  }

  onReachBottom() {
    console.log(1111)
  }
  render () {
    const { list } = this.state
    
    return (
      <div>
        <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        interval="1000"
        indicatorDots
        autoplay>
        {[1, 2, 3].map((item, idx) => {
          return (
            <SwiperItem>
              <Image mode='aspectFit' className="card-img" src={`http://localhost:3000/images/${idx+1}.jpg`} ></Image>
            </SwiperItem>
          )
        })}
      </Swiper>

        <AtList>
          {list.map((item, idx) => {
         
          return <AtCard
            title={`${idx+1} 苏醒的乐园  已有${item.solded}人购买 `}
            note={item.title}
            extra={`￥${item.price}`}
            thumb={item.image_url}
          >

            <View className='at-row'>
              <View className='at-col at-col-11'>
                <Image mode='aspectFit' className="card-img" src={item.image_url} ></Image>
              </View>
              <View className='at-col at-col-1'>
              <AtIcon onClick={()=>this.addCart(item)} value="add" color="#e93b3d" size="30"></AtIcon>
              </View>
            </View>
          </AtCard>
        })}
        </AtList>
      
        {global.env === 'h5' ? <AtLoadMore
        onClick={this.handleClick.bind(this, true)}
        status={this.state.status}
      /> : null}
      </div>
    )
  }
}
export default About
