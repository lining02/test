<template>
  <div class="login">
    <KHeader title="登陆"></KHeader>
    <cube-form
  :model="model"
  :schema="schema"
  :immediate-validate="false"
  :options="options"
  @validate="validateHandler"
  @submit="submitHandler"></cube-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: "input",
                modelKey: "username",
                label: "用户名",
                props: {
                  placeholder: "请输入用户名",
                  autocomplete: false
                },
                rules: {
                  required: true
                },
                trigger: "blur"
              },
              {
                type: "input",
                modelKey: "password",
                label: "密码",
                props: {
                  type: "password",
                  placeholder: "请输入密码",
                  autocomplete: false
                },
                rules: {
                  required: true
                },
                trigger: "blur"
              }
            ]
          },
          {
            fields: [
              {
                type: "submit",
                label: "登陆"
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      }
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
    },
    validateHandler(result) {
      this.axios.post("/api/login", this.model).then(res => {
        if (res.data.code !== 0) return;
        const { token } = res.data;
        this.$store.dispatch("setToken", token);
        window.sessionStorage.setItem("token", token);
        this.$router.push({ name: "home" });
      });
    }
  },
  components: {}
};
</script>
<style lang="less">
</style>
