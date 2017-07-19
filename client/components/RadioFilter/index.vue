<template>
    <el-radio-group v-model="value" @change="handleSelectChange">
        <el-radio
                v-if="type === 'radio'"
                v-for="item in options"
                :key="item.value"
                :label="item.value">
            {{item.label}}
        </el-radio>
        <el-radio-button
                v-if="type === 'button'"
                v-for="item in options"
                :key="item.value"
                :label="item.value">
            {{item.label}}
        </el-radio-button>
    </el-radio-group>
</template>
<script>
  import omit from 'lodash/omit';
  export default {
    props: {
      type: {
        type: String,
        default: 'radio'
      },
      size: {
        type: String,
        require: false
      },
      options: {
        type: Array,
        default: []
      },
      filterKey: {
        type: String,
        require: true
      },
    },

    created () {
      const {
        [this.filterKey]: filterKey
      } = this.$route.query

      if (this.defaultValue && !filterKey) {
        this.handleSelectChange(this.defaultValue)
      } else {
        this.updateValueFromQuery()
      }
    },

    data () {
      return {
        value: undefined
      }
    },

    watch: {
      '$route' (to, from) {
        this.updateValueFromQuery(to.query)
      }
    },

    methods: {
      updateValueFromQuery (query = this.$route.query) {
        const {
          [this.filterKey]: filterValue
        } = query

        this.value = filterValue
      },
      handleSelectChange (value) {
        if (!this.filterKey) {
          throw new Error('filterKey required')
        }

        this.$router.push({
          path: this.$route.path,
          query: {
            ...omit(this.$route.query, 'l'),
            ...{
              [this.filterKey]: value || undefined
            }
          }
        })
      }
    },
  }
</script>