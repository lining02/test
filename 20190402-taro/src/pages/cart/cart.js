import Taro, { Component } from '@tarojs/taro'
import { Swiper, Text, View, Image } from '@tarojs/components'
import './index.scss'
import { AtDivider, AtCard, AtButton, AtIcon } from 'taro-ui'
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
    }
  }
  cartSub(item) {
    const { cartStore } = this.props
    cartStore.subCart(item)
  }
  cartAdd(item) {
    const { cartStore } = this.props
    cartStore.addCart(item)
  }
  render() {
    const { cartStore } = this.props

    return (
      <View className='index'>


        {cartStore.list.length ?

          <View style="margin:10px 0;">
            {cartStore.list.map((item, idx) => {
              const thumb = item.solded > 200 ? global.url + 'fire.png' : ''
              return <AtCard
              title={`${idx+1} 苏醒的乐园  已有${item.solded}人购买 `}
              note={item.title}
              extra={`￥${item.price}`}
              thumb={item.image_url}
              >

                <View className='at-row'>
                  <View className='at-col at-col-10'>
                    <Image mode='aspectFit' className="card-img" src={item.image_url} ></Image>
                  </View>
                  <View className='at-col at-col-2'>
                    <AtIcon onClick={() => this.cartSub(item)} value="subtract" color="#e93b3d" size="30"></AtIcon>
                    <Text>{item.count}</Text>
                    <AtIcon onClick={() => this.cartAdd(item)} value="add" color="#e93b3d" size="30"></AtIcon>
                  </View>
                </View>


              </AtCard>
            })}
            <View style="margin:10px;" >
              <AtButton type='primary'> ￥{cartStore.totalPrice}下单</AtButton>
            </View>
          </View>

          : <AtDivider content='购物车空空如也' color="#e93b3d"></AtDivider>}




      </View>
    )
  }
}
export default About
