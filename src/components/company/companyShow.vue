
<template>
    <basic-layout>
        <div class="box" style="width:100%;height:100%;background:#f4f4f4">
            <table style="width: 100%;
        border:1px #000 solid;
        border-collapse: collapse;">
                <tr style="width: 100%;height: auto;border:1px">
                    <td>编号:&nbsp&nbsp{{data.cid}}</td>
                    <td>企业名:&nbsp&nbsp{{data.realName}}</td>
                    <td style="align-items: center;">&nbsp&nbsp<img :src="data.logo" alt="" style="display: block;float: left"></td>
                </tr>
                <tr>
                    <td colspan="3">企业形式：{{data.typeOfEntenterprise}}</td>
                </tr>
                <tr>
                    <td colspan="3">公司规模：{{data.size}}</td>
                </tr>
                <tr><td colspan="3">公司地址：{{data.location}}</td></tr>
                <tr>
                    <td>面试官名字:&nbsp&nbsp{{data.linkman.name}}</td>
                    <td>面试官职位:&nbsp&nbsp{{data.linkman.position}}</td>
                    <td>面试官头像:&nbsp&nbsp<img :src="data.linkman.avatar" alt="" style="width: 50px;height:50px"></td>
                </tr>
                <tr><td colspan="3">企业简介：{{data.introduction}}</td></tr>
                <tr><td colspan="3">企业介绍：{{data.description}}</td></tr>
                <tr><td colspan="3">企业开办地点：{{str}}</td></tr>
            </table>
        </div>
        <el-button type="success" @click="$router.back()" style="display:block;margin:10px auto">返回</el-button>

    </basic-layout>
</template>

<script>
    import Layout from "../basicLayout"

    export default {
        name: "companyShow",
        components: {
            "basic-layout": Layout,
        },
        data(){
            return{
                data:{},
                loading:true,
                str:[],
            }
        },
        mounted() {
            let id=this.$route.params.id;
            console.log(id);
            this.$http.get("https://www.easy-mock.com/mock/5b18ad9ec6b9b923a614ec23/project/getCompany?cid="+id).then(res => {
                let data = res.data.data;
                let location=data.workingplace;
                console.log(location[0].location);
                let str="";
                for(let i=0;i<location.length;i++){
                    str=str+location[i].city+location[i].location+" ";

                }
                console.log(str);

                this.str=str;
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