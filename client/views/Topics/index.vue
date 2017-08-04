<template>
  <el-row
      type="flex"
      justify="center"
      class="bgGrey"
  >
    <el-col :lg="12" :md="18" :xs="24" class="bgWhite marginTop20 marginBottom20">
      <NavMenu filterKey="tab"/>
      <StatusContainer :isLoading="isLoading">
        <TopicList
          :data="data"
        />
      </StatusContainer>
      <el-col :span="23"><Pagination :page-size="20" /></el-col>
    </el-col>
  </el-row>
</template>
<script>
  import StatusContainer from '../../components/StatusContainer'
  import { mapState, mapActions } from 'vuex'
  import convertApiQuery from '../../utils/convertApiQuery'
  import Pagination from '../../components/Pagination'
  import NavMenu from './NavMenu.vue'
  import TopicList from '../../components/TopicList/index.vue'

  export default {
    components: {
      StatusContainer,
      Pagination,
      NavMenu,
      TopicList
    },
    methods: {
      ...mapActions([
        'getTopics'
      ]),
      getData () {
        this.getTopics({
          query: {
            ...convertApiQuery(this.$route.query)
          }
        })
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.fullPath !== from.fullPath) {
          this.getData()
        }
      }
    },
    created() {
      this.getData()
    },
    computed: {
      ...mapState('topics', {
        data: state => {console.log(state); return state.data && state.data.data},
        error: state => state.error,
        isLoading: state => state.isLoading,
        options: state => state.options
      })
    }
  }
</script>
<style scoped>
  span {
    @extend .fontSize--small
  }
</style>
