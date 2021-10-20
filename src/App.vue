<template>
  <div>
    <router-view />
    <NavigateBar v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import NavigateBar from './components/NavigateBar/NavigateBar.vue'
export default {
  components: {
    NavigateBar
  }
}
</script>

<style>
</style>
