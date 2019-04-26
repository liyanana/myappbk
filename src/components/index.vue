<template>
    <basic-layout>
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <el-col :span="16">
            <div id="main" style="width:600px;height:400px;"></div>
        </el-col>
        <el-col :span="8">
            <div class="box">
                <ul>
                    <li>待审核文章数量:&nbsp<span>{{todo.articles}}:&nbsp</span><router-link to="articleList">快速处理</router-link></li>
                    <li>待审核作品数量:&nbsp<span>{{todo.works}}:&nbsp</span><router-link to="worksList">快速处理</router-link></li>
                    <li>待审核用户数量:&nbsp<span>{{todo.users}}:&nbsp</span><router-link to="articleList">快速处理</router-link></li>
                    <li>待审核视频数量:&nbsp<span>{{todo.video}}:&nbsp</span><router-link to="videoList">快速处理</router-link></li>
                    <li>待审核招聘数量:&nbsp<span>{{todo.recruitment}}:&nbsp<router-link to="recruitmentList">快速处理</router-link></span></li>
                    <li>待审核简历数量:&nbsp<span>{{todo.resume}}:&nbsp</span><router-link to="resumeList">快速处理</router-link></li>
                </ul>
            </div>
        </el-col>
    </basic-layout>
</template>

<script>
    import Layout from "./basicLayout"
    import echarts from "echarts"

    export default {
        name: "index",
        components: {
            "basic-layout": Layout,
        },
        data() {
            return {
                count: {},
                data: {},
                todo:{},
            }
        },
        mounted: function () {
            // 基于准备好的dom，初始化echarts实例
            this.$http.get("https://www.easy-mock.com/mock/5b18ad9ec6b9b923a614ec23/project/count").then(res => {
                this.count = res.data.data.total;
                this.todo=res.data.data.todo;
                let todo=this.todo;
                console.log(todo);
                this.$message({
                    message: "查询成功",
                    type: "success",
                })
                var myChart = echarts.init(document.getElementById('main'));
                let data = this.count;
                console.log(data.users);
                var option = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量']
                    },
                    xAxis: {
                        data: ["文章数量", "作品数量", "用户", "视频数量", "招聘数量", "简历数量"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [data.articles, data.works, data.users, data.video, data.recruitment, data.resume]
                    }]
                };
                myChart.setOption(option);
            });

        }
    }
</script>

<style scoped>
ul li {
    height:30px;
    border-bottom:1px #ccc solid;
}
    span {
        color: #1c5b7e;
    }
    .box {
        height:auto;
        width:auto;
        margin:50px  auto;

    }
</style>