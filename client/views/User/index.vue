<template>
  <StatusContainer :isLoading="isLoading">
    <el-row
      type="flex"
      justify="center"
      class="bgGrey"
    >
      <el-col :lg="12" :md="18" :xs="24">
        <el-row class="marginTop20 marginBottom20">
          <div class="header">
            <el-breadcrumb>
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{data.loginname}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-col class="userInfo bgWhite" style="padding: 10px">
            <div>
              <img :src="data.avatar_url" alt="用户头像" height="40px">
              <span>{{data.loginname}}</span>
            </div>
            <div>{{data.score}}积分</div>
            <div>
              <a :href="`https://github.com/${data.githubUsername}`" target="_blank">
                github: @{{data.githubUsername}}
              </a>
            </div>
            <div>注册时间{{getFormatTime(data.create_at)}}</div>
          </el-col>
        </el-row>
        <el-row class="marginTop20 marginBottom20">
          <el-col class="bgWhite">
            <div class="header">最近创建的话题</div>
            <TopicList
              :data="data && data.recent_topics"
              :showReply="false"
              :showTag="false"
              :renderLimit="5"
            />
          </el-col>
        </el-row>
        <el-row class="marginBottom20">
          <el-col class="bgWhite">
            <div class="header">最近参与的话题</div>
            <TopicList
              :data="data && data.recent_replies"
              :showReply="false"
              :showTag="false"
              :renderLimit="5"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </StatusContainer>
</template>
<script>
  import StatusContainer from '../../components/StatusContainer'
  import {mapState, mapActions} from 'vuex'
  import convertApiQuery from '../../utils/convertApiQuery'
  import TopicList from '../../components/TopicList/index.vue'
  import getFormatTime from '../../utils/dateUtils'

  export default {
    components: {
      StatusContainer,
      TopicList
    },
    methods: {
      ...mapActions([
        'getUserById'
      ]),
      getFormatTime,
      getData () {
        const loginname = this.$route.params.loginname
        this.getUserById(loginname, {
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
      ...mapState('user', {
        data: state => {
          console.log(state);
          return state.data && state.data.data || {}
        },
        error: state => state.error,
        isLoading: state => state.isLoading,
        options: state => state.options
      })
    }
  }
</script>
<style rel="stylesheet/less" scoped>
  .header {
    padding: 10px;
    background-color: #F9FAFC;
    border-radius: 3px 3px 0 0;
  }

  span {
  @extend . fontSize--small
  }
  .userInfo {
    >div {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
