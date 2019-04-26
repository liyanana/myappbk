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
            <el-form-item label="品类名称" prop="name">
              <el-input v-model="ruleForm.name" type="textarea" :rows="1"></el-input>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            plain
            style="display:block;margin-left:100px"
            @click="submit()"
          >增加</el-button>
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
      dialogVisible: false,
      ruleForm: {
        name: ""
      },
      rules: {
        content: [
          { required: true, message: "请输入品类内容", trigger: "blur" },
          { min: 0, message: "输入不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var url = this.HOST + `/sort`;
          console.log(this.ruleForm);
          this.$http.post(url, this.ruleForm).then(res => {
            console.log(res);
            if (res.status === 200) {
              if (res.ok) {
                this.$message({
                  message: "增加成功",
                  type: "success"
                });
                this.$router.push({ path: "/workslist" });
              } else {
                this.$message({
                  message: "增加失败",
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