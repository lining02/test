<template>
  <!-- home主页的商品列表 -->
  <cube-scroll>
    <div v-for="o in filterGoods" :key="o.title" class="item">
      <img :src="o.img" alt>
      <div class="wrap">
        <span>{{o.title}}</span>
        <div>
          <i class="cubeic-add" @click.stop.prevent="(e) =>addCart(e,o)"></i>
          <span>¥{{o.price}}</span>
        </div>
        <div>
          <span>{{o.count}} 人购买</span>
        </div>
      </div>
    </div>
  </cube-scroll>
</template>
<script>
export default {
  // 列表数据
  props: ["filterGoods"],
  methods: {
    // 点击加入购物车
    addCart(e,o) {
      // 更新state
      this.$store.dispatch("increment", o);
      // 弹窗（cubeUI）
      this.$createToast({
        time: 1000,
        type: "correct",
        txt: `${o.title}加入购物车`
      }).show();
      // 给父组件home 传值
      this.$emit('addCart', e.target)

      this.$createNotice().add({
        context: `${o.title}加入购物车`,
        time: 2
      })
    }
  }
};
</script>
<style lang="less">
.item {
  height: 15vh;
  display: flex;
  padding: 1vh 1vw;
  img {
    height: 10vh;
    margin: 1.5vh 3vw 1.5vh 0;
  }
  .wrap {
    color: #7e8c8d;
    padding: 1.5vh 0;
    line-height: 24px;
    i.cubeic-add {
      font-size: 22px;
    }
  }
}
</style>