<template>
    <basic-layout>
        <el-table
                :data="tableData"
                :stripe="true"
                :border="true"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="招聘信息id"
                    width="100"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="cid"
                    label="企业id"
                    width="80"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    width="180"
                    :show-overflow-tooltip="true"
                    header-align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="location"
                    label="地址"
                    width="150"
                    header-align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="招聘人数"
                    width="120"
                    align="center"
                    :sortable="true"
            >
            </el-table-column>
            <el-table-column
                    prop="publicdate"
                    label="发布日期"
                    width="180"
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
                    <el-button type="primary" plain v-if="scope.row.state==='未审核'" @click="audit(scope.row)">点击审核</el-button>
                    <el-button type="success" plain v-else-if="scope.row.state==='通过'"><a href="">点击查看</a></el-button>
                    <el-button type="warning" plain v-else @click="audit(scope.row)">重新审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" style="margin-top:30px;">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="2"
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
                {{obj.description}}
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
        name: "recruitmentlist",
        components: {
            "basic-layout": Layout
        },
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                obj:[],
                now:1,
                total:0,
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
                this.obj=obj;
                this.dialogVisible = true;
            },
            getData(p=1){
                this.$http.get(`/admin/getRecruitments?p=${p}`).then(res => {
                    this.total=res.body.total;
                    if(res.body.state="ok"){
                        let data = res.data.data.map(v => {
                            if (v.state === "pass") {
                                v.state = '通过'
                            } else if (v.state === 'fail') {
                                v.state = '未通过'
                            } else if(v.state==='unauditing'){
                                v.state = '未审核'
                            }
                            return v;
                        })
                        this.tableData = data;
                        this.$message({
                            message: "查询成功",
                            type: "success",
                        })
                    }else{
                        this.$message({
                            message: "查询失败",
                            type: "fail",
                        });
                        return false;
                    }

                })
            },
            change:function(page){
                this.getData(page);

            },
            submit(){
                this.dialogVisible = false;
                if (this.value === "pass") {
                    this.$http.get("/admin/auditingRecruitment?id=" + this.obj.id+"&state="+this.value).then(res => {
                        if (res.data.data.message === "ok") {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.obj.state = "通过"
                        }
                    })

                }else if (this.value === "fail") {
                    this.$http.get("/admin/auditingRecruitment?id=" + this.obj.id+"&state="+this.value).then(res => {
                        if (res.body.data.message === "ok") {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.obj.state = "未通过";
                        }
                    })
                }
                this.value=""
            }
        },
        mounted() {
            this.getData();
        }

    }
</script>

<style scoped>

</style>