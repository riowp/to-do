<script>
import {mapActions} from 'pinia'
import {useIndexStore} from '@/stores/index'

export default {
  methods: {
    ...mapActions(useIndexStore,['fetchTodos'])
  },
  created() {
    this.fetchTodos()
  }
}
</script>

<template>
<router-view/>
</template>
