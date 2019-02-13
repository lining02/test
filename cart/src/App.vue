<template>
  <div id="app">
    <router-view class="view"/>
     <!-- <cube-tab-bar
    v-model="selectedLabelDefault"
    :data="tabs"
    class="bar"
    @click="clickHandler"> -->
  <!-- </cube-tab-bar> -->
    <cube-tab-bar
    v-model="selectedLabelDefault"
    inline
    @click="clickHandler">
    <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.label">
      <i slot="icon" :class="item.icon"></i>
     <span>{{item.label}}</span>
     <span v-if="item.label==='cart'" class="label">{{label}}</span>
    </cube-tab>
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
      return `${this.$store.getters.count}`;
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
.label {
  width: 15px;
  height: 15px;
  line-height: 15px;
  color: #fff;
  border-radius: 50%;
  background: #f00;
  font-size: 12px;
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translate(-50%, -50%)
}
</style>
