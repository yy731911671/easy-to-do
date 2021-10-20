<template>
  <div>
    <router-view />
<!--    <NavigateBar />-->
  </div>
</template>

<script>
import NavigateBar from './components/NavigateBar/NavigateBar.vue'
export default {
  components: {
    NavigateBar
  },
}
</script>

<style>
</style>
