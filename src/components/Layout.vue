<template>
    <div class="demo">
        <el-row>
            <el-col :span="16" class="document1">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="8" class="document2">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <div  class="document1"></div>
            </el-col>
            <el-col :span="6">
                <div  class="document2"></div>
            </el-col>
            <el-col :span="6">
                <div class="document1"></div>
            </el-col>
            <el-col :span="6">
                <div class="document2"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Layout"
    }
</script>

<style scoped>
    .demo {
        width: 100%;
        height: 100px;
        background: pink;
    }

    .document1 {
        background: yellow;
        height: 100px;
    }

    .document2 {
        background: #0fbfe6;
        height: 100px;
    }
</style>