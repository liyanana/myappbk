<template>
    <basic-layout>
        <template>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    v-loading="loading"
            >
                <el-table-column
                        prop="cid"
                        label="编号"
                        sortable
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="企业"
                        width="100">
                        <template slot-scope="scope">
                            <img :src="scope.row.logo" alt="" style="width:100%;height:50px">
                        </template>
                </el-table-column>
                <el-table-column
                        prop="industry"
                        sortable
                        label="行业"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="location"
                        label="地址"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button type="warning"><router-link :to="{path:'/companyShow/'+scope.row.cid}">查看详情</router-link></el-button>
                        <el-button type="danger" @click="del(scope.row.cid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </basic-layout>
</template>

<script>
    import Layout from "../basicLayout"
    export default {
        name: "companiesList",
        components: {
            "basic-layout": Layout
        },
        data(){
           return{
               tableData:[],
               loading:true
           }
        },
        methods: {
            del(id) {
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get("https://www.easy-mock.com/mock/5b18ad9ec6b9b923a614ec23/project/delUser?id="+id).then(res => {
                        if(res.data.data.state==="success"){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.tableData=this.tableData.filter(ele=>ele.cid!==id);

                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除删除失败!'
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
        },
        mounted(){
            this.$http.get("https://www.easy-mock.com/mock/5b18ad9ec6b9b923a614ec23/project/getCompanys").then(res => {
                let data = res.data.data;
                console.log(data);
                this.tableData = data;
                this.$message({
                    message: "查询成功",
                    type: "success",
                })
                this.loading=false;

            })
        }
    }
</script>

<style scoped>

</style>