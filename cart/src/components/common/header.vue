<template>
  <!-- 公共组件header 头部 -->
  <header @click="goBack">
      <i class="cubeic-back" v-if="flag"></i>
      <div>{{title}}</div>
  </header>
</template>
<script>
export default {
  props: ["title"],
  methods: {
    // 点击返回
    goBack() {
      this.$router.goBack();
    }
  },
  computed: {
    // 是否显示返回按钮
    flag() {
      return this.$isCanBack.canBack();
    }
  }
};
</script>
<style lang="less" scoped>
header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  i {
    position: absolute;
    top: 3px;
    left: 10px;
  }
}
</style>
