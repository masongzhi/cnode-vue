<template>
  <div id="page">
    <el-row>
      <el-col :span="4">
        <div class="nav">
          <img src="./logo.png" width="60%"/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        </el-menu>
        <el-menu
                :default-active="this.defaultActive"
                :router=true
        >
          <el-submenu v-for="item in navigates" :index="item.route" :key="item.label">
            <template slot="title"><i class="el-icon-message"></i>{{item.label}}</template>
            <el-menu-item v-for="it in item.menuItems" :key="it.label" :index="it.route">{{it.label}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        navigates: [
          {
            label: "投资管理",
            route: '/invest',
            menuItems: [
              // { route: '/invest/directlyInvest', label: '直投管理' }
            ]
          }
        ]
      }
    },
    computed: {
      defaultActive() {
        return this.$route.matched[2].path
      },
      ...mapState({
        data: state => state.navigate.data
      })
    }
  }
</script>
<style scoped>
  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0
  }
</style>
