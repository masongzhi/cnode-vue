<template>
  <div>
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      v-for="item in renderList"
      :key="item.id"
      style="font-size: 14px; padding: 10px; border-bottom: 1px solid #e1e1e1"
    >
      <el-col :span="20">
        <el-row type="flex" align="middle" class="topicLeft" :gutter="20">
          <el-col :span="2">
            <router-link :to="{ path: '/user/' + (item.author && item.author.loginname)}">
              <img height="30px" :src="item.author && item.author.avatar_url" alt="作者头像" class="authorPic">
            </router-link>
          </el-col>

          <el-col :span="4" v-if="showReply">
            <span style="min-width: 80px; text-align: center; font-size: 13px">{{item.reply_count + '/' + item.visit_count}}</span>
          </el-col>

          <el-col :span="2" v-if="showTag">
            <el-tag :type="item.top && keyValue.tab['top'].type || item.good && keyValue.tab['good'].type || keyValue.tab[item.tab] && keyValue.tab[item.tab].type">{{item.top && keyValue.tab['top'].text || item.good && keyValue.tab['good'].text || keyValue.tab[item.tab] && keyValue.tab[item.tab].text}}</el-tag>
          </el-col>

          <el-col>
            <router-link :to="{ path: '/topic/' + item.id}">{{item.title}}</router-link>
          </el-col>
          <!--<span class="title">{{item.title}}</span>-->
        </el-row>
      </el-col>
      <el-col :span="4">
        <div class="topicRight">
          <span class="lastReplyTime">{{getFormatTime(item.last_reply_at)}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
      align="middle"
      v-if="renderLimit && data.length > renderLimit"
    >
      <el-button style="padding: 10px 0" type="text" @click="changeRenderList">
        <i :class="{ 'el-icon-caret-bottom': showStretch, 'el-icon-caret-top': showShrink }">
          {{showStretch ? '查看更多' : '收起'}}
        </i>
      </el-button>
    </el-row>
  </div>
</template>
<script>
  import getFormatTime from '../../utils/dateUtils'

  export default {
    props: {
      data: {
        type: Array,
        require: true
      },
      showReply: {
        type: Boolean,
        require: true,
        default: true
      },
      showTag: {
        type: Boolean,
        require: true,
        default: true
      },
      renderLimit: {
        type: Number
      }
    },
    data () {
      return {
        renderList: null,
        showShrink: false,
        showStretch: true,
        keyValue: {
          tab: {
            top: {
              type: 'primary',
              text: '置顶'
            },
            ask: {
              type: 'gray',
              text: '问答'
            },
            good: {
              type: 'success',
              text: '精华'
            },
            share: {
              type: 'gray',
              text: '分享'
            },
            job: {
              type: 'warning',
              text: '招聘'
            }
          }
        },
      }
    },
    created () {
      this.renderList =  this.renderLimit ? this.data.slice(0, this.renderLimit) : this.data
    },
    methods: {
      getFormatTime,
      changeRenderList () {
        this.renderList =  this.showShrink ? this.data.slice(0, this.renderLimit) : this.data
        this.showShrink = !this.showShrink
        this.showStretch = !this.showStretch
      }
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
