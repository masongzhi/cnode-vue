<template>
  <el-menu :default-active="menuDefaultActive" mode="horizontal" @select="handleSelect">
    <el-menu-item  v-for="(item, index) in options.tab" :key="item.value" :index="String(index)">{{item.label}}</el-menu-item>
  </el-menu>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      filterKey: {
        type: String
      }
    },
    watch: {
      '$route'(to, from) {
        this.updateValueFromQuery(to.query)
      }
    },
    computed: mapState('home', {
      options: state => state.options,
      menuDefaultActive: state => state.menuDefaultActive
    }),
    methods: {
      ...mapActions('home', [
        'changeMenuDefaultActive'
      ]),
      handleSelect(key, keyPath) {
        const tab = this.options.tab[key].value
        this.search(tab)
      },
      search(key) {
        this.$router.push({
          path: this.$route.path,
          query: {
            [this.filterKey]: key || undefined
          }
        })
      },
      updateValueFromQuery(query = this.$route.query) {
        const {
          [this.filterKey]: filterKey
        } = query

        const mIndex = this.options.tab.findIndex((item) => item.value === filterKey)
        this.changeMenuDefaultActive(String(mIndex))
      },
    },
    created() {
      this.updateValueFromQuery()
    }
  }
</script>
