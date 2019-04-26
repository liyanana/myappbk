<template>
  <el-container class="container">
    <el-header class="header" style="text-align: center;line-height: 60px;">大学生就业招聘网管理平台</el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#ccc"
          :router="true"
          height="100%"
        >
          <el-menu-item index="/" :route="{path:'/'}">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>品类管理</span>
            </template>
            <el-menu-item index="/workslist" :route="{path:'/workslist'}">品类查看</el-menu-item>
            <el-menu-item index="/articleList" :route="{path:'/articleList'}">增加品类</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/usersList" :route="{path:'/usersList'}">密码</el-menu-item>
            <el-menu-item index="/companiesList" :route="{path:'/companiesList'}">企业资质认证</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/interviewList" :route="{path:'/interviewList'}">商品信息管理</el-menu-item>
            <el-menu-item index="/interQuestionList" :route="{path:'/interQuestionList'}">商品增加</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>公告管理</span>
            </template>
            <el-menu-item index="/noticeList" :route="{path:'/noticeList'}">公告查看</el-menu-item>
            <el-menu-item index="/noticeAdd" :route="{path:'/noticeAdd'}">公告添加</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "basicLayout",
  props: ["index"]
};
</script>

<style scoped>
.container {
  height: 100%;
  background: #cfcfcf;
}

.header {
  height: 20px;
  background: #9f9f9f;
}

.aside {
  background: #ccc;
}

.main {
  background: #f3f3f3;
}
</style>