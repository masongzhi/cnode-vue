<template>
    <el-cascader
            :placeholder="placeholder"
            :size="size"
            expand-trigger="hover"
            :options="options"
            v-model="value"
            :clearable="clearable"
            :filterable="filterable"
            :loading="loading"
            :show-all-levels="false"
            :popper-class="popperClass"
            @change="handleSelectChange">
    </el-cascader>
</template>
<script>
  import omit from 'lodash/omit'
  export default {
    props: {
      defaultValue: {},
      filterKey: {
        type: String,
        require: true
      },
      size: {
        type: String
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      multiple: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: true
      },
      filterable: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array,
        default: []
      },
      popperClass: {
        type: String,
        default: ''
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

        // fix multiple
        if (this.multiple && !filterValue) {
          this.value = []
        }
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

    created () {
      const {
        [this.filterKey]: filterKey
      } = this.$route.query

      if (this.defaultValue && !filterKey) {
        this.handleSelectChange(this.defaultValue)
      } else {
        this.updateValueFromQuery()
      }
    }
  }

</script>