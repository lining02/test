<template>
  <div class="alert">
    <div class="alert-container" v-for="item in alerts" :key="item.id">
      <div class="alert-content">{{item.content}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  // name,必写, cube-ui 的createAPI需要
  name: "notice",
  data() {
    return {
      alerts: [] // 弹出的alert的列表
    };
  },
  methods: {
    // 增加一个alert
    add(options) {
      let { duration, content } = options;
      let id = this.id;
      this.alerts.push({ duration, content, id });
      this.id = id + 1;
      setTimeout(() => {
        this.del(id);
      }, options.duration * 1000);
    },
    // duration后,删掉该alert
    del(id) {
      console.log(id, this.alerts, Array.from(this.alerts));
      let idx = this.alerts.findIndex(o => {
        return o.id === id;
      });
      this.alerts.splice(idx, 1);
    }
  },
  // id不会双向绑定
  created() {
    this.id = 0;
  }
};
</script>
<style lang="less">
.alert {
  position: fixed;
  width: 100%;
  top: 30px;
  left: 0;
  text-align: center;
  .alert-content {
    display: inline-block;
    padding: 8px;
    background: #fff;
    margin-bottom: 10px;
  }
}
</style>
