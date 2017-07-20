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
<style scoped>

</style>
