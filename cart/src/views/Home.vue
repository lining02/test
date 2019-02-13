<template>
  <div class="home">
    <KHeader title="主页"></KHeader>
    <cube-slide :data="slider" :interval="1000" class="slide"/>
    <cube-button @click="showDrawer">Show Drawer</cube-button>
    <list :filterGoods="filterGoods" @addCart="addCart"></list>
    <cube-drawer
    ref="drawer"
    title="请选择"
    :data="keys"
    :selected-index="selectedIndex"
    @select="selectHandler"></cube-drawer>
    <ball :ball="ball"></ball>
  </div>
</template>

<script>
import list from '@/components/common/list.vue';
import ball from '@/components/common/ball.vue';
export default {
  name: "home",
  data() {
    return {
      // 加入购物车的动画组件的值
      ball: {
        el: null,
        show: false
      },
      selectedIndex: [],
      goods: [],
      keys: [],
      slider: [],
      filterGoods: [] // 传给list组件的商品列表
    };
  },
  components: { list, ball },
  methods: {
    // 请求shuju
    getDate() {
      this.axios("/api/goods").then(res => {
        let { data: goods, data, slider, keys } = res.data;
        this.goods = goods; // 商品列表
        this.slider = slider.map(o => { // 轮播图
          return {
            url: 'http://192.168.1.3:8080/',
            image: o.img
          }
        });
        this.keys = [keys]; // drawer 的数据
        for (let o in goods) { // 默认显示所有的商品
          this.filterGoods = [...this.goods[o], ...this.filterGoods];
        }
      });
    },
    // 显示drawer
    showDrawer() {
      this.$refs.drawer.show();
    },
    // 选择一个drawer
    selectHandler(selectedVal, selectedIndex, selectedText) {
      for (let o in this.goods) {
        if (o === selectedVal[0]) {
          this.filterGoods = this.goods[o];
          break;
        }
      }
    },
    // 添加购物车的回调， 显示动画
    addCart(e) {
      this.ball.show = true;
      this.ball.el = e
    }
  },
  mounted() {
    this.getDate();
  }
};
</script>
<style lang="less" scoped>
.slide {
  width: 100vw;
  height: 42vh;
  .cube-slide-item > a > img {
    width: 100vw;
    height: 100%;
  }
}


</style>
