<template>
  <el-form
    :model="userinfo"
    status-icon
    :rules="rules"
    ref="userinfo"
    label-width="100px"
    class="login-form"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="userinfo.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="userinfo.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="tokenLogin('userinfo')">token登陆</el-button>
      <el-button type="primary" @click="sessionLogin('userinfo')">session登陆</el-button>
      <el-button type="primary" @click="githubLogin('userinfo')">Github登录</el-button>
      <el-button @click="getUsers('token')">Token列表</el-button>
      <el-button @click="getUsers('session')">Session列表</el-button>
      <el-button @click="getUsers('github')">github列表</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      userinfo: {
        username: "",
        password: ""
      },
      rules: {
        username: { required: true, message: "请填用户名", trigger: "blur" },
        password: { required: true, message: "请填写密码", trigger: "blur" }
      }
    };
  },
  methods: {
    tokenLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
          .post("http://localhost:3000/api/public/token/login", this.userinfo)
          .then(response => {
            console.log(response.data.token);
            sessionStorage.setItem('token', response.data.token);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    sessionLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
          .post("http://localhost:3000/api/public/session/login", this.userinfo)
          .then(response => {
            console.log(response.data.token);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    githubLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
          .get("http://localhost:3000/api/login-github", this.userinfo)
          .then(response => {
            console.log(response.data.token);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getUsers(key) {
     this.$http
          .get(`http://localhost:3000/api/${key}/users`)
          .then(res => {
              console.log(res)
          })
    }
  }
};
</script>
<style lang="scss" scoped>
.login-form {
  width: 80%;
  margin: 20px 0;
}
</style>
