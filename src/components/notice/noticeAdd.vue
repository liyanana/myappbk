<template>
    <basic-layout>
        <template>
            <el-row>
                <el-col :span="12">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="公告名称" prop="content">
                            <el-input v-model="ruleForm.content" type="textarea" :rows="3"></el-input>
                        </el-form-item>
                        <el-form-item label="公告排序" prop="sort">
                            <el-input v-model.number="ruleForm.sort"></el-input>
                        </el-form-item>
                        <el-form-item label="公告时间" required >
                            <el-col :span="11">
                                <el-form-item prop="date">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" plain style="display:block;margin-left:100px" @click="submit()">添加公告
                    </el-button>
                </el-col>
            </el-row>
        </template>
    </basic-layout>
</template>

<script>
    import Layout from "../basicLayout"

    export default {
        name: "noticeAdd",
        components: {
            "basic-layout": Layout
        },
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                ruleForm: {
                    content: '',
                    sort: "",
                    date: '',
                },
                rules: {
                    content: [
                        {required: true, message: '请输入公告内容', trigger: 'blur'},
                        {min: 0, message: '输入不能为空', trigger: 'blur'}
                    ],
                    sort: [
                        {required: true, message: '请输入序号', trigger: 'blur'},
                        {min: 0, type: "number", message: '请输入数字', trigger: 'blur'}
                    ],
                    date: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                }

            }
        },
        methods: {
            submit() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$http.post("admin/notice", this.ruleForm).then(res => {
                            if (res.status === 200) {
                                if (res.body.data.message === "ok") {
                                    this.$message({
                                        message: "添加成功",
                                        type: "success",

                                    });
                                    this.$router.push({path: '/noticeList'})
                                }else{
                                    this.$message({
                                        message: "添加失败",
                                        type: "error",

                                    });
                                }
                            }
                        })
                    }else{
                        console.log("error submit!");
                        return false;
                    }
                })
            }
        },

    }
</script>

<style scoped>

</style>