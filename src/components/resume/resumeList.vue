<template>
    <basic-layout>
        <el-table
                :data="tableData"
                :stripe="true"
                :border="true"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="简历信息id"
                    width="100"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="80"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="position"
                    label="职位"
                    width="100"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="exp"
                    label="工作经验"
                    width="80"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="record"
                    label="学历"
                    width="80"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="nowposition"
                    label="现任职位"
                    width="100"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="publicDate"
                    label="发布日期"
                    width="160"
                    align="center"
                    :sortable="true"
            >
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态"
                    width="80"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="120"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button type="primary" plain v-if="scope.row.state==='未审核'" @click="audit(scope.row)">点击审核
                    </el-button>
                    <el-button type="success" plain v-else-if="scope.row.state==='通过'"><a href="">点击查看</a></el-button>
                    <el-button type="warning" plain v-else @click="audit(scope.row)">重新审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" style="margin-top:30px;">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="4"
                    :current-page.sync="now"
                    :total="total"
                    @current-change="change"
            >
            </el-pagination>
        </el-row>
        <el-dialog
                title="审核信息"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <div>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
        </el-dialog>
    </basic-layout>
</template>

<script>
    import Layout from "../basicLayout"

    export default {
        name: "resumelist",
        components: {
            "basic-layout": Layout
        },
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                obj: [],
                total: 0,
                now: 1,
                options: [{
                    value: 'pass',
                    label: '通过'
                }, {
                    value: 'fail',
                    label: '未通过'
                }],
                value: ''
            }
        },
        methods: {
            audit(obj) {
                this.obj = obj;
                this.dialogVisible = true;
            },
            getData(page = 1) {
                this.$http.get(`admin/getResumes?p=${page}`).then(res => {
                    if (res.status === 200) {
                        this.total = res.body.total;
                        let data = res.body.data.map(obj => {
                            if (obj.state === "pass") {
                                obj.state = "通过";
                            } else if (obj.state === "fail") {
                                obj.state = "未通过";
                            } else if (obj.state === "unauditing") {
                                obj.state = "未审核";
                            }
                            return obj;
                        });
                        this.tableData = data;
                        this.$message({
                            message: "查询成功",
                            type: "success"
                        })
                    }
                })

            },
            change: function (page) {
                this.getData(page);

            },
            submit() {
                this.dialogVisible = false;
                if (this.value === 'pass') {
                    this.$http.get(`/admin/auditingResume?id=${this.obj.id}&state=${"pass"}`).then(res => {
                        if (res.data.data.message === "ok") {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.obj.state = "通过"
                        }
                    });
                } else if (this.value === "fail") {
                    this.$http.get(`/admin/auditingResume?id=${this.obj.id}&state=${"fail"}`).then(res => {
                        if (res.data.data.message === "ok") {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.obj.state = "未通过"
                        }
                    });
                }
                this.value = "";
            },
        },
            mounted() {
                this.getData();
            }
        }
</script>

<style scoped>

</style>