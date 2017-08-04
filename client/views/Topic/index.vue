<template>
  <StatusContainer :isLoading="isLoading" class="bgGrey">
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :lg="12" :md="18" :xs="24" class="bgWhite marginTop20 marginBottom20">
        <el-row class="block head_content">
          <el-row
            class="head_content-title"
            type="flex"
            align="middle"
          >
            <el-tag class="tab"
                    :type="data && data.top && keyValue && keyValue.tab['top'].type || data && data.good && keyValue && keyValue.tab['good'].type || keyValue && keyValue.tab[data.tab] && keyValue.tab[data.tab].type">
              {{data.top && keyValue.tab['top'].text || data.good && keyValue.tab['good'].text || keyValue.tab[data.tab]
              && keyValue.tab[data.tab].text}}
            </el-tag>
            <span class="title fontSize--large bold">{{data.title}}</span>
          </el-row>
          <el-row class="head_content-details">
            <span>发布于{{formatStringTime(data.create_at)}}</span>
            <span>作者{{data.author && data.author.loginname}}</span>
            <span>{{data.visit_count}}访问</span>
            <span>最后编辑于{{formatStringTime(data.last_reply_at)}}</span>
            <span>来自{{data.tab}}</span>
          </el-row>
        </el-row>
        <el-row class="block topic_content">
          <div v-html="data.content"></div>
        </el-row>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :lg="12" :md="18" :xs="24" class="bgWhite marginBottom20">
        <Replies :data="data.replies"/>
      </el-col>
    </el-row>
  </StatusContainer>
</template>
<script>
  import StatusContainer from '../../components/StatusContainer'
  import Replies from './Replies.vue'
  import { mapState, mapActions } from 'vuex'
  import convertApiQuery from '../../utils/convertApiQuery'
  import getFormatTime from '../../utils/dateUtils'

  export default {
    components: {
      StatusContainer,
      Replies
    },
    methods: {
      ...mapActions([
        'getTopicById'
      ]),
      getFormatTime,
      formatStringTime (string) {
        return getFormatTime(new Date(string))
      },
      getData () {
        const topicId = this.$route.params.topicId
        this.getTopicById(topicId, {
          query: {
            ...convertApiQuery(this.$route.query)
          }
        })
      }
    },
    created() {
      this.getData()
    },
    computed: {
      ...mapState('topic', {
        data: state => {console.log(state); return state.data && state.data.data},
        error: state => state.error,
        isLoading: state => state.isLoading,
        keyValue: state => state.keyValue,
      })
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .head_content {
    padding: 0 0 30px 10px;
    &-title {
      padding: 20px 0;
    }
    &-details {
      > span {
        &:before {
          content: " • ";
        }
      }
    }
  }

  .topic_content {
    padding: 20px 0;
  }
</style>
