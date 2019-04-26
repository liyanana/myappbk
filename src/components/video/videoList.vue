<template>
    <basic-layout index="/workslist">
        <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="search">
            <el-form-item label="作品" prop="name">
                <el-input  placeholder="请输入作品名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="种类" prop="type">
                <el-select v-model="form.type" placeholder="请输入类型">
                    <el-option label="UI" value="UI" ></el-option>
                    <el-option label="全栈" value="FullStack"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
        >
            <el-table-column
                    sortable
                    prop="name"
                    label="视频名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="author"
                    label="作者姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="publicDate"
                    label="发布时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="type"
                    label="发布类型"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="state"
                    label="审核状态"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button type="primary" plain v-if="scope.row.state==='未审核'" @click="auditwork(scope.row)">点击审核
                    </el-button>
                    <el-button type="success" plain v-else-if="scope.row.state==='通过'" ><a :href="scope.row.src" style="color:#294c26" target="_blank">查看作品</a></el-button>
                    <el-button type="waning" plain v-else-if="scope.row.state==='未通过'" @click="auditwork(scope.row)">重新审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" style="margin-top: 30px">
            <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="2"
                    @current-change="change"
                    :current-page.sync="now">
            </el-pagination>
        </el-row>
        <el-dialog
                title="审核"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <div><a :href="obj.src" target="_blank">点击查看作品</a></div>
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
    <el-button type="primary" @click="changeState">确 定</el-button>
  </span>
        </el-dialog>
    </basic-layout>
</template>

<script>
    import Layout from "../basicLayout"
    export default {
        name: "videoList",
        components: {
            "basic-layout": Layout,
        },
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                obj: {},
                style:"",
                options: [
                    {
                        value: 'pass',
                        label: '通过'
                    }, {
                        value: 'fail',
                        label: '未通过'
                    }
                ],
                value: '',
                form: {
                    name: '',
                    type: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入作品名称', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'blur'}
                    ],
                },
                total:0,
                now:1,
            }
        },
        methods: {
            auditwork: function (obj) {
                this.obj = obj;
                this.dialogVisible = true;
                console.log(obj.src)
            },
            onSubmit: function () {
                this.$refs.search.validate((valid) => {
                    if (valid) {
                        this.now = 1;
                        this.getData()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    this.value=""
                });
            },
            showwork(obj){

            },
            change(p){
                this.getData(p)
            },
            changeState: function () {
                this.dialogVisible = false;
                if (this.value === 'pass') {
                    this.$http.get(`/admin/auditingVideos?id=${this.obj.id}&state=${"pass"}`).then(res => {
                        if (res.data.data.message === "ok") {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.obj.state = "通过"
                        }
                    });
                } else if (this.value === "fail") {
                    this.$http.get(`/admin/auditingVideos?id=${this.obj.id}&state=${"fail"}`).then(res => {
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
            getData(p=1){
                this.$http.get(`/admin/getVideos?p=${p}&name=${this.form.name}&type=${this.form.type}`).then(res => {
                        this.total=res.body.total;
                        if(res.body.state="ok"){
                        let data = res.data.data.map(v => {
                            if (v.state === "pass") {
                                v.state = '通过'
                            } else if (v.state === 'fail') {
                                v.state = '未通过'
                            } else {
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
            }
        },
        mounted: function () {
            this.getData();
        }
    }
</script>

<style scoped>
    [v-clock] {
        display: none;
    }
</style>