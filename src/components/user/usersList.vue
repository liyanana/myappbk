<template>
  <basic-layout>
    <template>
      <el-row>
        <el-col :span="12">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="修改密码" prop="name">
              <el-input
                placeholder="请输入密码"
                v-model="ruleForm.password"
                :show-password="dialogVisible"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            plain
            style="display:block;margin-left:100px"
            @click="submit()"
          >修改</el-button>
        </el-col>
      </el-row>
    </template>
  </basic-layout>
</template>

<script>
import Layout from "../basicLayout";

export default {
  name: "noticeAdd",
  components: {
    "basic-layout": Layout
  },
  data() {
    return {
      data: [],
      dialogVisible: true,
      ruleForm: {
        password: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入您要修改的密码", trigger: "blur" },
          { min: 0, message: "输入不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var url =
            this.HOST + `/username/${sessionStorage.getItem("username")}`;
          console.log(url);
          this.$http.put(url, this.ruleForm).then(res => {
            console.log(res);

            if (res.status === 200) {
              if (res.ok) {
                this.$message({
                  message: "修改成功,请重新登录",
                  type: "success"
                });
                this.$router.push({ path: "/" });
              } else {
                this.$message({
                  message: "修改失败",
                  type: "fail"
                });
                return false;
              }
            }
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>