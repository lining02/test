<template>
    <header @click="goBack">
        <i class="cubeic-back" v-if="flag"></i>
        <div>{{title}}</div>
    </header>
</template>
<script>
export default {
  props: ["title"],
  methods: {
    goBack() {
      console.log(this);
      this.$router.goBack();
    }
  },
  computed: {
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
