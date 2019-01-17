<template>
  <div class="about">
    <cube-scroll>
      <cube-swipe
          @item-click="onItemClick"
          :data="swipeData">
      </cube-swipe>
    </cube-scroll>
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
      swipeData: [
        {
          item: {
            text: "登陆",
            value: "login"
          }
        },
        {
          item: {
            text: "退出",
            value: "logout"
          }
        }
      ]
    };
  },
  methods: {
    onItemClick(item) {
      let value = item.value;
      switch (value) {
        case "login":
          this.$router.push({ name: "login" });
          break;
        case "logout":
          this.$createActionSheet({
            title: "确认要退出登陆吗",
            active: 0,
            data: [{ content: "退出登陆" }],
            onSelect: () => {
              this.axios("/api/logout").then(res => {});
            }
          }).show();

          break;
      }
    }
  }
};
</script>
<style lang="less">
</style>
