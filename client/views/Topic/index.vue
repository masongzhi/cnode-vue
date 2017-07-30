<template>
  <el-row
    type="flex"
    justify="center"
    class="bgGrey"
  >
    <el-col :span="12" class="bgWhite marginTop20 marginBottom20">
      <StatusContainer :isLoading="isLoading">
        <el-row>
          <div class="block">
            <el-tag class="tab" :type="data && data.top && keyValue && keyValue.tab['top'].type || data && data.good && keyValue && keyValue.tab['good'].type || keyValue && keyValue.tab[data.tab] && keyValue.tab[data.tab].type">{{data.top && keyValue.tab['top'].text || data.good && keyValue.tab['good'].text || keyValue.tab[data.tab] && keyValue.tab[data.tab].text}}</el-tag>
            <span class="title">{{data.title}}</span>
          </div>
        </el-row>
        <el-row>
          <div class="block topic_content">
            <div v-html="data.content"></div>
          </div>
        </el-row>
      </StatusContainer>
    </el-col>
  </el-row>
</template>
<script>
  import StatusContainer from '../../components/StatusContainer'
  import { mapState, mapActions } from 'vuex'
  import convertApiQuery from '../../utils/convertApiQuery'
  import { getFormatTime } from '../../utils/dateUtils'

  export default {
    components: {
      StatusContainer,
    },
    methods: {
      ...mapActions([
        'getTopicById'
      ]),
      getFormatTime,
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
    mounted () {
//      console.log(this.$refs)
//      this.$refs.content.innerHTML = this.data && this.data.content
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
