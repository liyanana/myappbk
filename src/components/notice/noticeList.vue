<template>
    <basic-layout>
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                v-loading="loading"
        >
            <el-table-column
                    prop="id"
                    label="公告内容"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="公告内容"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="date"
                    sortable
                    label="时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="sort"
                    label="排序"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button type="warning">
                        <router-link :to="{path:'/updateNotice/'+scope.row.id}">修改</router-link>
                    </el-button>
                    <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
    </basic-layout>
</template>

<script>
    import Layout from "../basicLayout"

    export default {
        name: "noticeList",
        components: {
            "basic-layout": Layout
        },
        data() {
            return {
                tableData: [],
                total:0,
                now:0,
            }
        },
        methods: {
            del(id) {
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$http.delete("admin/notice/"+id).then(res => {
                        console.log(res.body);
                        if (res.body==="ok") {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.tableData = this.tableData.filter(ele => ele.id !== id);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }


                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getData(p = 1) {
                this.$http.get("/admin/notice?p="+p).then(res => {
                    this.total=res.body.total;
                    console.log(res);
                    if (res.status === 200) {
                        let data = res.data.data;
                        this.tableData = data;
                    } else {
                        return false;
                    }

                })
            },
            change:function(page){
                this.getData(page);

            },
        },
        mounted() {
           this.getData();

        }
    }
</script>

<style scoped>

</style>