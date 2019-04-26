<template>
    <basic-layout>
       <ul >
           <li>昵称：{{data.nickName}}</li>
           <li>姓名：{{data.realName}}</li>
           <li>年龄：{{data.age}}</li>
           <li>头像：<img :src="data.avatar" alt=""></li>
           <li>工作经验：{{data.experience}}</li>
           <li>学历：{{data.record}}</li>
           <li>目标薪资：{{data.targetPosition}}</li>
       </ul>
        <el-button type="success" @click="$router.back()">返回</el-button>
    </basic-layout>
</template>

<script>
    import Layout from "../basicLayout"
    export default {
        name: "userShow",
        components: {
            "basic-layout": Layout,
        },
        data(){
            return{
                data:{},
                loading:true,
            }
        },
        mounted() {
            let id=this.$route.params.id;
            console.log(id);
            this.$http.get("/admin/users/"+id).then(res => {
                let data = res.data.data;
                console.log(res);
                this.data = data;
                this.$message({
                    message: "查询成功",
                    type: "success",
                })
                this.loading=false;

            })

        },
    }
</script>

<style scoped>

</style>