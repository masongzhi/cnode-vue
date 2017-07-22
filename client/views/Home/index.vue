<template>
  <StatusContainer :isLoading="isLoading">
    <el-row
        type="flex"
        justify="center"
        class="bgGrey"
    >
      <el-col :span="18" class="bgWhite marginTop20 marginBottom20">
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
            <span class="title">{{item.title}}</span>
          </el-row>
          <div class="topicRight">
            <span class="lastReplyTime">{{getFormatTime(item.last_reply_at)}}</span>
          </div>
        </el-row>
        <el-col :span="23"><Pagination :page-size="20" /></el-col>
      </el-col>
    </el-row>
  </StatusContainer>
</template>
<script>
  import StatusContainer from '../../components/StatusContainer'
  import { mapState, mapActions } from 'vuex'
  import convertApiQuery from '../../utils/convertApiQuery'
  import { getFormatTime } from '../../utils/dateUtils'
  import Pagination from '../../components/Pagination'

  export default {
    components: {
      StatusContainer,
      Pagination
    },
    methods: {
      ...mapActions([
        'getTopics'
      ]),
      getFormatTime,
      getData () {
        this.getTopics({
          query: convertApiQuery({
            ...this.$route.query
          })
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
      ...mapState('home', {
        data: state => {console.log(state.data && state.data.data); return state.data && state.data.data},
        error: state => state.error,
        isLoading: state => state.isLoading,
      })
    }
  }
</script>
<style scoped>
  .authorPic {
    border-radius: 3px;
  }
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
  span {
    @extend .fontSize--small
  }
</style>
