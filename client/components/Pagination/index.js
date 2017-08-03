import omit from 'lodash/omit'

export default {
  props: {
    'current-page': {
      type: Number,
      default: 1
    },
    'page-size': {
      type: Number,
      default: 10
    },
    'page-sizes': {
      type: Array,
      default () {
        return [10, 20, 30, 40, 50, 60]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    total: Number
  },
  methods: {
    handleSizeChange (size) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...omit(this.$route.query, 'l'),
          ...{ c: size }
        }
      })
    },
    handleCurrentChange (currentPage) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          ...{ l: currentPage }
        }
      })
    }
  },
  render (h) {
    const { c, l } = this.$route.query
    const finalCurrentPage = +l || this.currentPage
    const finalPageSize = +c || this.pageSize
    const finalPageSizes = this.pageSizes.filter(value => +value !== +finalPageSize)
    finalPageSizes.unshift(finalPageSize)

    return (
      <div class='klg-pagination-wrapper'>
        <el-pagination
          on-size-change={this.handleSizeChange}
          on-current-change={this.handleCurrentChange}
          current-page={finalCurrentPage}
          page-size={finalPageSize}
          page-sizes={finalPageSizes}
          layout={this.layout}
          total={this.total}>
        </el-pagination>
      </div>
    )
  }
}
