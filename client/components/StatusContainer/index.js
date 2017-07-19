export default {
  functional: true,
  props: ['isLoading', 'error'],
  render(h, context) {
    const {
      isLoading,
      error
    } = context.props

    if (isLoading) {
      // 嵌套 div 解决 v-loading 不更新 Bug -_-
      return (
        <div style={{marginTop: '4rem'}}>
          <div v-loading={isLoading}></div>
        </div>
      )
    }

    // Todo Error Component
    if (error) {
      return (
        <div style={{marginTop: '4rem'}}>
          <div v-loading={isLoading}></div>
        </div>
      )
    }

    return (
      <div class="klg-status-container">
        {context.children}
      </div>
    )
  }
}