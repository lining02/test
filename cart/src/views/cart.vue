<template>
  <div class="about">
    <KHeader title="购物车"></KHeader>
    <div v-for="o in cart" :key="o.id" class="item">
      <!-- <img :src="o.img" alt="">
      <div>
        <div>{{o.title}}</div>
        <div>{{o.price}}</div>
        <div>{{o.c}}</div>
      </div> -->
      <img :src="o.img" alt="">
       <div class="wrap">
          <span>{{o.title}}</span>
          <div>
            <span>¥{{o.price}}</span>
          </div>
           <div>
             <i class="cubeic-add" @click.stop.prevent="add(o)"></i>
             <span>{{o.c}}</span>
             <i class="cubeic-add" @click.stop.prevent="minus(o)"></i></div>
       </div>
    </div>
    <div>总价¥{{sum}}</div>
  </div>
</template>
<script>
export default {
  name: "cart",
  data() {
    return {};
  },
  components: {},
  methods: {
    minus(o) {
      this.$store.dispatch("increment", o);
    },
    add(o) {
      this.$store.dispatch("decrease", o);
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart || [];
    },
    sum() {
      let s = this.cart.reduce((sum, o) => {
        return sum + o.price * o.c;
      }, 0);
      return s || 0;
    }
  },
  mounted() {}
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
