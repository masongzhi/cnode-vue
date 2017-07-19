<template>
    <el-select
            v-model="value"
            :multiple="multiple"
            filterable
            remote
            :clearable="clearable"
            :placeholder="placeholder"
            :remote-method="querySearchAsync"
            @input="handleSelectChange"
            :loading="loading">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>
<script>
  import convertApiQuery from 'utils/convertApiQuery'
  import { mapState, mapActions } from 'vuex'
  import omit from 'lodash/omit'


  export default {
    props: {
      defaultValue: {},
      filterKey: {
        type: String,
        require: true
      },
      nameKey: {
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
      disabled: {
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
      popperClass: {
        type: String,
        default: ''
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
      if (!filterKey) {
        this.querySearchAsync()
      }
    },
    watch: {
      '$route' (to, from) {
        this.updateValueFromQuery(to.query)
      }
    },
    computed: mapState('components/smoteSelectFilter', {
      total: state => state.data && state.data.total,
      value: state => state.value,
      list: state => state.list,
      options: state => state.options,
    }),

    methods: {
      ...mapActions('components/smoteSelectFilter', [
        'fetchNoteOptions',
        'pushNoteOptions',
        'updateNoteValue'
      ]),
      updateValueFromQuery (query = this.$route.query) {
        const {
          [this.filterKey]: filterValue,
          [this.nameKey]: nameValue
        } = query

        this.updateNoteValue(filterValue)

        // fix multiple
        if (this.multiple && !filterValue) {
          this.value = []
        }
        this.pushNoteOptions({[this.filterKey]: filterValue, [this.nameKey]: nameValue})
      },
      handleSelectChange (value) {
        let label;
        const option = this.options.find((it) => {
          return it.value === value
        })
        if (option) label = option.label
        if (!this.filterKey) {
          throw new Error('filterKey required')
        }

        this.$router.push({
          path: this.$route.path,
          query: {
            ...omit(this.$route.query, 'l'),
            ...{
              [this.filterKey]: value || undefined,
              [this.nameKey]: label
            }
          }
        })
      },
      async querySearchAsync(queryString) {
        await this.fetchNoteOptions(queryString)
        this.options = this.result
      }
    }
  }
</script>
