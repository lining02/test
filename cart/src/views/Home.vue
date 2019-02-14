<template>
  <div class="home">
    <KHeader title="主页"></KHeader>
    <cube-slide :data="slider" :interval="1000" class="slide"/>
    <cube-button @click="showDrawer">Show Drawer</cube-button>
<<<<<<< .mine
    <list :filterGoods="filterGoods" @addCart="addCart"></list>














=======
    <!-- ball 1. 组件 -->
    <!-- <ball :ball="ballObj"></ball> -->
    <cube-scroll>
      <div v-for="o in filterGoods" :key="o.title" class="item">
        <img :src="o.img" alt="">
       <div class="wrap">
          <span>{{o.title}}</span>
          <div>
            <i class="cubeic-add" @click.stop.prevent="(e)=>addCart(e, o)"></i>
            <span>¥{{o.price}}</span>
          </div>
          <div><span>{{o.count}} 人购买</span></div>
       </div>
      </div>
    </cube-scroll>
>>>>>>> .theirs
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
<<<<<<< .mine
import list from '@/components/common/list.vue';
import ball from '@/components/common/ball.vue';



=======
import ball from "@/components/common/ball";
import ball1 from "@/components/common/ball1";
import notice from "@/components/common/notice";
import notice1 from "@/components/common/notice1";
import create from "@/servers/create";
>>>>>>> .theirs
export default {
  name: "home",
  data() {
    return {
<<<<<<< .mine
      // 加入购物车的动画组件的值
      ball: {
        el: null,
        show: false
      },













=======
      ballObj: { show: false, el: null },
      items: [
        {
          url: "http://www.didichuxing.com/",
          image:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg"
        },
        {
          url: "http://www.didichuxing.com/",
          image:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=967395617,3601302195&fm=27&gp=0.jpg"
        },
        {
          url: "http://www.didichuxing.com/",
          image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2735633715,2749454924&fm=27&gp=0.jpg"
        }
      ],
>>>>>>> .theirs
      selectedIndex: [],
      goods: [],
      keys: [],
      slider: [],
      filterGoods: [] // 传给list组件的商品列表
    };
  },
<<<<<<< .mine
  components: { list, ball },
=======
  components: { ball },
>>>>>>> .theirs
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
<<<<<<< .mine
    // 添加购物车的回调， 显示动画
    addCart(e) {
      this.ball.show = true;
      this.ball.el = e




























=======
    addCart(e, o) {
      // 1. cube-ui createAPI的方法
      // this.cubeNotice(o.title);
      // 2. @/servers/notice.js的方法
      // this.$notice.info({
      //   content: o.title
      // });
      // 3.  @/servers/create.js的方法
      const noticeanim = create(notice1, {content: o.title});
      noticeanim.add({content: o.title});
      noticeanim.$on('end', ()=>{
        noticeanim.remove();
      }) 

      // 组件ball 传值
      this.ballObj = {
        show: true,
        el: e.target
      };
      // ball 2. @/servers/create.js的方法 create ball
       const ballanim = create(ball1, {el: e.target});
      ballanim.start();
      ballanim.$on('transitionend', ()=>{
        ballanim.remove();
      }) 
      
      this.$store.dispatch("increment", o);
      this.$createToast({
        time: 1000,
        type: "correct",
        txt: `${o.title}加入购物车`
      }).show();
>>>>>>> .theirs
    },
    cubeNotice(content = "lalal") {
      const notice = this.$createNotice();
      notice.add({ content, duration: 4 });
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
