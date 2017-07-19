<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuItems: [
          { route: '/invest/directlyInvest', label: '直投管理' },
          { route: '/invest/dfg', label: '账户概况' },
          { route: '/invest/directfgdlyInvest', label: '回款管理' },
          { route: '/invest/direcdfgdtlyInvest', label: '标的管理' },
          { route: '/invest/directdfgdlyInvest', label: '投资汇总' }
        ]
      }
    },
    computed: {
      defaultActive() {
        const parentRoutePrefix = this.$route.path.split('/')[1]
        const activeItem = this.menuItems.filter(item => item.route.split('/')[1] === parentRoutePrefix)[0]
        return activeItem ? activeItem.route : this.$route.path
      }
    }
  }
</script>
<style>
@import "style.less";
body {
  margin: 0;
  font-size: 2rem;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}
.page {
  text-align: center;
  /* nesting for the need to test postcss */
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0
}
</style>
