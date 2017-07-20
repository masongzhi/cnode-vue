<template>

  <el-menu theme="dark" :default-active="defaultActive" mode="horizontal">
    <el-col :offset="2">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-col>
  </el-menu>
</template>
<script>
  export default {
    computed: {
      defaultActive() {
        return this.$route.matched[1].path
      }
    }
  }
</script>
<style scoped>

</style>
