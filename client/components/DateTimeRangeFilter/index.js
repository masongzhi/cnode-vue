import omit from 'lodash/omit'

const defaultDateValue = [null, null]
export default {
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    placeholder: {
      type: String,
      default: '选择时间范围'
    },
    defaultValue: Array,
    startTimeKey: {
      type: String,
      default: 'startTime'
    },
    endTimeKey: {
      type: String,
      default: 'endTime'
    }
  },

  data () {
    return {
      value: defaultDateValue
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
        [this.startTimeKey]: startTime,
        [this.endTimeKey]: endTime
      } = query

      if (startTime && endTime) {
        this.value = [new Date(+startTime), new Date(+endTime)]
      } else {
        this.value = defaultDateValue
      }
    },
    handleDateChange (value) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...omit(this.$route.query, 'l'),
          ...{
            [this.startTimeKey]: value && value[0] && value[0].getTime(),
            [this.endTimeKey]: value && value[1] && value[1].getTime()
          }
        }
      })
    }
  },

  created () {
    const {
      [this.startTimeKey]: startTime,
      [this.endTimeKey]: endTime
    } = this.$route.query

    if (this.defaultValue && !startTime && !endTime) {
      this.handleDateChange(this.defaultValue)
    } else {
      this.updateValueFromQuery()
    }
  },

  render (h) {
    return (
      <el-date-picker
        type={this.type}
        value={this.value}
        onInput={this.handleDateChange}
        placeholder={this.placeholder}
      />
    )
  }
}
