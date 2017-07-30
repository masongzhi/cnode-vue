<template>
  <div id="page">
    <NavMenu />
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import NavMenu from './NavMenu.vue'

  export default {
    components: {
      NavMenu
    },
    computed: {
      defaultActive() {
        return this.$route.matched[2].path
      }
    }
  }
</script>
<style>
  .bgGrey {
    background-color: #e1e1e1;
  }
  .bgWhite {
    background-color: white;
  }
  .marginBottom20 {
    margin-bottom: 20px;
  }
  .marginTop20 {
    margin-top: 20px;
  }
  .tab {
    margin-right: 10px;
  }
  .block {
    border-bottom: 1px solid #e1e1e1
  }
</style>
