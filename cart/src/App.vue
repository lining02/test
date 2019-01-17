<template>
  <div id="app">
    <router-view class="view"/>
     <cube-tab-bar
    v-model="selectedLabelDefault"
    :data="tabs"
    class="bar"
    @click="clickHandler">
  </cube-tab-bar>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedLabelDefault: "Vip",
      tabs: [
        {
          label: "home",
          icon: "cubeic-home"
        },
        {
          label: this.label || "cart",
          icon: "cubeic-like"
        },
        {
          label: "vip",
          icon: "cubeic-vip"
        },
        {
          label: "about",
          icon: "cubeic-person"
        }
      ]
    };
  },
  methods: {
    clickHandler(name) {
      this.$router.push({ name });
    }
  },
  mounted() {},
  computed: {
    label() {
      return `cart${this.$store.getters.count}`;
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
}
</style>
