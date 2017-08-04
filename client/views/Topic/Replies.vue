<template>
  <div>
    <div class="count">
      {{data.length}} 回复
    </div>
    <el-row
      class="replies"
      v-for="(item, index) in data"
      :key="item.id"
      type="flex"
      align="top"
      style="border-bottom: 1px solid #e1e1e1"
    >
      <div class="replies-avatar">
        <router-link :to="{ path: '/user/' + (item.author && item.author.loginname)}">
          <img :src="item.author && item.author.avatar_url" alt="头像" width="30px">
        </router-link>
      </div>
      <div class="replies-content">
        <p class="replies-content-title">
          <span class="bold">{{item.author && item.author.loginname}}</span>
          <span>{{index + 1}}楼</span>
          <span>回复于{{formatStringTime(item.create_at)}}</span>
        </p>
        <p class="replies-content-text" v-html="item.content"></p>
      </div>
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
      }
    },
    methods: {
      formatStringTime (string) {
        return getFormatTime(new Date(string))
      },
    }
  }
</script>
<style rel="stylesheet/less" scoped>
  .count {
    padding: 10px;
    background-color: #F9FAFC;
    border-radius: 3px 3px 0 0;
  }

  .replies {
    padding: 10px;
    &-content {
      &-title {
        padding-left: 10px;
      }
      &-text {
        padding-left: 20px;
      }
    }
  }
</style>
