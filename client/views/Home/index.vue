<template>
  <StatusContainer :isLoading="isLoading">

  </StatusContainer>
</template>
<script>
  import StatusContainer from '../../components/StatusContainer'
  import { mapState, mapActions } from 'vuex'
  import convertApiQuery from '../../utils/convertApiQuery'

  export default {
    components: {
      StatusContainer
    },
    methods: {
      ...mapActions([
        'getTopics'
      ]),
      getData () {
        this.getTopics({
          query: convertApiQuery({
            ...this.$route.query
          })
        })
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.fullPath !== from.fullPath) {
          this.getData()
        }
      }
    },
    created() {
      this.getData()
    },
    computed: {
      ...mapState('home', {
        data: state => state.data && state.data.orders,
        error: state => state.error,
        isLoading: state => state.isLoading,
      })
    }
  }
</script>
