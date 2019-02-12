<template>
  <div class="alert">
    <div class="alert-container" v-for="item in alerts" :key="item.id">
      <div class="alert-content">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noticeAnim",
  props: ["el"], // 点击加购按钮
  data() {
    return {
      alerts: [],
      content: ''
    };
  },
  methods: {
    // 增加一个alert
    add({ duration = 2, content = "" }) {
        console.log(this.alerts)
      let id = this.id;
      this.alerts.push({ duration, content, id });
      this.id = id + 1;
      setTimeout(() => {
        this.del(id);
         this.$emit('end')
      }, duration * 1000);
    },
    // duration后,删掉该alert
    del(id) {
      let idx = this.alerts.findIndex(o => {
        return o.id === id;
      });
      console.log(this.alerts)
      this.$emit('end')
      this.alerts.splice(idx, 1);
    }
  }
};
</script>

<style scoped lang="stylus">
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