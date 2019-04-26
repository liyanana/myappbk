<template>
  <basic-layout>
    <template>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading" height="750">
        <el-table-column prop="id" label="编号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" width="100"></el-table-column>
        <el-table-column prop="title" sortable label="标题" width="100"></el-table-column>
        <el-table-column prop="desc" label="描述" width="180" text-align="center"></el-table-column>
        <el-table-column prop="price" label="价格" width="80" text-align="center"></el-table-column>
        <el-table-column prop="num" label="库存" width="80" text-align="center"></el-table-column>
        <el-table-column prop="status" label="状态" width="80" text-align="center"></el-table-column>
        <el-table-column prop="img" label="图片" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="warning">
              <router-link :to="{path:'/interviewShow/'+scope.row.id}">修改</router-link>
            </el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </basic-layout>
</template>

<script>
import Layout from "../basicLayout";

export default {
  name: "interviewList",
  components: {
    "basic-layout": Layout
  },
  data() {
    return {
      tableData: [],
      loading: true
    };
  },
  del(id) {
    this.$confirm("确定删除吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.$http.delete(`/admin/goods/${id}`).then(res => {
          console.log(res.body);
          if (res.body === "ok") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetch();
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  },
  fetch() {
    this.$http.get("http://localhost:3000/api/goods").then(res => {
      this.tableData = res.body;
      this.$message({
        message: "查询成功",
        type: "success"
      });
    });
    this.loading = false;
  },
  mounted() {
    this.$http.get("http://localhost:3000/api/goods").then(res => {
      this.tableData = res.body;
      this.$message({
        message: "查询成功",
        type: "success"
      });
    });
    this.loading = false;
  }
};
</script>

<style scoped>
</style>