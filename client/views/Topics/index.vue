<template>
  <el-row
      type="flex"
      justify="center"
      class="bgGrey"
  >
    <el-col :span="12" class="bgWhite marginTop20 marginBottom20">
      <NavMenu filterKey="tab"/>
      <StatusContainer :isLoading="isLoading">
        <el-row
            type="flex"
            justify="space-between"
            align="middle"
            v-for="item in data"
            :key="item.id"
            style="font-size: 14px; padding: 10px; border-bottom: 1px solid #e1e1e1"
        >
          <el-row type="flex" align="middle" class="topicLeft">
            <img height="30px" :src="item.author && item.author.avatar_url" alt="作者头像" class="authorPic">
            <span style="min-width: 80px; text-align: center; font-size: 13px">{{item.reply_count + '/' + item.visit_count}}</span>
            <el-tag class="tab" :type="item.top && keyValue.tab['top'].type || item.good && keyValue.tab['good'].type || keyValue.tab[item.tab] && keyValue.tab[item.tab].type">{{item.top && keyValue.tab['top'].text || item.good && keyValue.tab['good'].text || keyValue.tab[item.tab] && keyValue.tab[item.tab].text}}</el-tag>
            <router-link :to="{ path: '/topic/' + item.id}">{{item.title}}</router-link>
            <!--<span class="title">{{item.title}}</span>-->
          </el-row>
          <div class="topicRight">
            <span class="lastReplyTime">{{getFormatTime(item.last_reply_at)}}</span>
          </div>
        </el-row>
      </StatusContainer>
      <el-col :span="23"><Pagination :page-size="20" /></el-col>
    </el-col>
  </el-row>
</template>
<script>
  import StatusContainer from '../../components/StatusContainer'
  import { mapState, mapActions } from 'vuex'
  import convertApiQuery from '../../utils/convertApiQuery'
  import { getFormatTime } from '../../utils/dateUtils'
  import Pagination from '../../components/Pagination'
  import NavMenu from './NavMenu.vue'

  export default {
    components: {
      StatusContainer,
      Pagination,
      NavMenu
    },
    methods: {
      ...mapActions([
        'getTopics'
      ]),
      getFormatTime,
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
        options: state => state.options,
        keyValue: state => state.keyValue,
      })
    }
  }
</script>
<style scoped>
  .authorPic {
    border-radius: 3px;
  }
  span {
    @extend .fontSize--small
  }
</style>
