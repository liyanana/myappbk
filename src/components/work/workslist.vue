<template>
  <basic-layout index="/workslist">
    <el-table :data="tableData" v-loading="loading">
      <el-table-column sortable prop="id" label="id值" width="80"></el-table-column>
      <el-table-column sortable prop="name" label="品类名称" width="180"></el-table-column>
      <!-- <el-table-column sortable prop="status" label="品类状态" width="180"></el-table-column> -->
      <el-table-column sortable prop="createdAt" label="发布时间" width="280"></el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="warning">
            <router-link :to="{path:'/updateNotice/'+scope.row.id}">修改</router-link>
          </el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top: 30px">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="2"
        @current-change="change"
        :current-page.sync="now"
      ></el-pagination>
    </el-row>
    <el-dialog title="审核" :visible.sync="dialogVisible" width="30%">
      <div>
        <a :href="obj.src" target="_blank">点击查看作品</a>
      </div>
      <div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeState">确 定</el-button>
      </span>
    </el-dialog>
  </basic-layout>
</template>

<script>
import Layout from "../basicLayout";
import ElRow from "element-ui/packages/row/src/row";

export default {
  name: "workslist",
  components: {
    "basic-layout": Layout
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      obj: {},
      style: "",
      options: [
        {
          value: "pass",
          label: "通过"
        },
        {
          value: "fail",
          label: "未通过"
        }
      ],
      form: {
        workName: "",
        type: ""
      },
      value: "",
      loading: true,
      total: 0,
      now: 1,
      rules: {
        workName: [
          { required: true, message: "请输入作品名称", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }]
      }
    };
  },
  methods: {
    auditwork: function(obj) {
      this.obj = obj;
      this.dialogVisible = true;
      console.log(obj.src);
    },
    changeState: function() {
      this.dialogVisible = false;
      if (this.value === "pass") {
        this.$http
          .get("/admin/auditingwork?id=" + this.obj.id + "&state=" + this.value)
          .then(res => {
            if (res.data.data.message === "ok") {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.obj.state = "通过";
            }
          });
      } else if (this.value === "fail") {
        this.$http
          .get("/admin/auditingwork?id=" + this.obj.id + "&state=" + this.value)
          .then(res => {
            if (res.data.data.message === "ok") {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.obj.state = "未通过";
            }
          });
      }
      this.value = "";
    },
    showwork(obj) {},
    change(p) {
      this.$http
        .get(
          `/admin/getWorks?p=${p}&workName=${this.form.workName}&type=${
            this.form.type
          }`
        )
        .then(res => {
          let data = res.data.data.map(v => {
            if (v.state === "pass") {
              v.state = "通过";
            } else if (v.state === "fail") {
              v.state = "未通过";
            } else if (v.state === "unauditing") {
              v.state = "未审核";
            }
            return v;
          });
          this.tableData = data;
          this.$message({
            message: "查询成功",
            type: "success"
          });
        });
    },
    del(id) {
      this.$http.delete(`/admin/sort/${id}`).then(res => {
        console.log(res);
        this.fetch();
      });
    },

    fetch() {
      this.$http.get("http://localhost:3000/admin/sort").then(res => {
        console.log(res);

        this.tableData = res.body;
        this.loading = false;

        this.$message({
          message: "查询成功",
          type: "success"
        });
      });
    },
    getData(p = 1) {
      this.$refs.search.validate(valid => {
        if (valid) {
          console.log(this.form.workName);
          this.$http
            .get(
              `/admin/getWorks?p=${p}&workName=${this.form.workName}&type=${
                this.form.type
              }`
            )
            .then(res => {
              console.log(res.data);
              this.total = res.body.total;
              let data = res.data.data.map(v => {
                if (v.state === "pass") {
                  v.state = "通过";
                } else if (v.state === "fail") {
                  v.state = "未通过";
                } else if (v.state === "unauditing") {
                  v.state = "未审核";
                }
                return v;
              });
              this.tableData = data;
              this.loading = false;

              this.$message({
                message: "查询成功",
                type: "success"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit() {
      /* this.$refs.search.validate((valid) => {
                    if (valid) {
                        console.log(this.form.workName);
                        this.$http.get(`/admin/getWorks?workName=${this.form.workName}&type=${this.form.type}`).then(res => {
                            console.log(res.data);
                            this.total=res.body.total;
                            let data = res.data.data.map(v => {
                                if (v.state === "pass") {
                                    v.state = '通过'
                                } else if (v.state === 'fail') {
                                    v.state = '未通过'
                                } else if(v.state==="unauditing"){
                                    v.state = '未审核'
                                }
                                return v;
                            })
                            this.tableData = data;
                            this.loading=false;

                            this.$message({
                                message: "查询成功",
                                type: "success",
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });*/
      this.getData();
    }
  },

  mounted: function() {
    this.$http.get("http://localhost:3000/admin/sort").then(res => {
      console.log(res);

      this.tableData = res.body;
      this.loading = false;

      this.$message({
        message: "查询成功",
        type: "success"
      });
    });
  }
};
</script>

<style scoped>
</style>