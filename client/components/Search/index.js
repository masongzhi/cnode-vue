export default {
  props: {
    searchKey: {
      type: String
    },
    placeholder: {
      type: String,
      default: '搜索'
    }
  },

  data() {
    return {
      value: null
    }
  },

  watch: {
    '$route'(to, from) {
      this.updateValueFromQuery(to.query)
    }
  },
  
  methods: {
    updateValueFromQuery(query = this.$route.query) {
      const {
        [this.searchKey]: searchKey
      } = query

      this.value = searchKey || null
    },
    handleInput(value) {
      this.value = value
    },
    search() {
      this.$router.push({
        path: this.$route.path,
        query: {
          [this.searchKey]: this.value || undefined
        }
      })
    },
    handleKeyup(event) {
      if (event.keyCode === 13) {
        this.search()
      }
    },
    handleIconClick(e) {
      this.search()
    }
  },

  created() {
    this.updateValueFromQuery()
  },

  render(h) {
    return (
      <el-input
        icon="search"
        value={this.value}
        placeholder={this.placeholder}
        onClick={this.handleIconClick}
        onInput={this.handleInput}
        nativeOnKeyup={this.handleKeyup}
      />
    )
  }
}