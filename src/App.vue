<template>
  <div id="app" v-if="isLogin">
    <router-view/>
  </div>
  <div id="login" v-else>
    <el-row type="flex" align="middle" justify="center" class="my-row">
      <el-col :span="12" class="wrapper">
        <h1 style="margin:15px auto;text-align:center">外卖后台</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="my-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="submit()">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLogin: false,
      ruleForm: {
        password: "",
        username: ""
      },
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http
            .get("http://localhost:3000/admin", this.ruleForm)
            .then(res => {
              console.log(res);
              if (res.status === 10000) {
                this.$message({
                  message: "密码错误",
                  type: "error"
                });
              } else if (res.status === 10001) {
                this.$message({
                  message: "账号不存在",
                  type: "error"
                });
              } else if (res.status === 200) {
                this.$message({
                  message: "成功",
                  type: "success"
                });
                sessionStorage.login = true;
                sessionStorage.username = this.ruleForm.username;
                this.isLogin = true;
              }
            });
        }
      });
    }
  },
  beforeMount() {
    if (sessionStorage.login) {
      this.isLogin = true;
    }
  }
};
</script>

<style>
.my-form {
  width: auto;
  height: auto;
}

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

.my-row {
  background: #f4f4f4;
  height: 100%;
}

.wrapper {
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #d6d6d6;
  padding: 30px;
}

#login {
  width: 100%;
  height: 100%;
}
</style>
