/* eslint-disable no-undef */
/* eslint-disable no-undef */
<template>
  <section class="mine">
    <HeaderTop title="Mine"></HeaderTop>

  </section>

</template>

<script>
import Vue from 'vue'
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'

Vue.use(vant.Button)

export default {
  name: 'Mine',
  data () {
    return {

    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style scoped>
.mine {
  overflow: hidden;
}
</style>
