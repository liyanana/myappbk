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
              <el-input
                v-model="ruleForm.name"
                type="textarea"
                :rows="1"
                :placeholder="data.name"
                :value="data.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="品类标题" prop="name">
              <el-input
                v-model="ruleForm.title"
                type="textarea"
                :rows="1"
                :placeholder="data.title"
              ></el-input>
            </el-form-item>
            <el-form-item label="品类描述" prop="name">
              <el-input v-model="ruleForm.desc" type="textarea" :rows="1" :placeholder="data.desc"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="name">
              <el-input
                v-model="ruleForm.price"
                type="textarea"
                :rows="1"
                :placeholder="data.price"
              ></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="num">
              <el-input v-model="ruleForm.num" type="textarea" :rows="1" :placeholder="data.num"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
      dialogVisible: false,
      ruleForm: {
        name: "",
        price: "",
        title: "",
        title: "",
        desc: "",
        num: "",
        desc: ""
      },
      rules: {
        // name: [
        //   { required: true, message: "请输入品类内容", trigger: "blur" },
        //   { min: 0, message: "输入不能为空", trigger: "blur" }
        // ]
      },
      options: [
        {
          value: "null",
          label: "下架"
        },
        {
          value: "full",
          label: "充足"
        }
      ],
      value: ""
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const id = this.$route.params.id;
          let keys = Object.keys(this.ruleForm);
          for (const key in this.ruleForm) {
            // 去除对象内多余的空值key
            if (this.ruleForm[key] === "" || key === "id") {
              delete this.ruleForm[key];
            }
          }

          console.log(this.ruleForm);
          var url = this.HOST + `/goods/${id}`;
          this.$http.put(url, this.ruleForm).then(res => {
            console.log(res);
            if (res.status === 200) {
              if (res.ok) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$router.push({ path: "/interviewlist" });
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
  mounted() {
    let id = this.$route.params.id;
    console.log(id);
    this.$http.get(`http://localhost:3000/api/goods/${id}`).then(res => {
      console.log(res);
      let data = res.body;
      this.data = data;
    });
  }
};
</script>

<style scoped>
</style>