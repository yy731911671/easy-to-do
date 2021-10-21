/* eslint-disable no-undef */
/* eslint-disable no-undef */
<template>
  <section class="mine">
    <HeaderTop title="Mine"></HeaderTop>
    <div class="mine-container">
      <van-cell value="Sign in / Sign Up" size="large" @click="goTo('/login')"/>
      <van-cell value="Todo-List" />
      <van-cell value="Authorization" />
    </div>
  </section>

</template>

<script>
import Vue from 'vue'
import {Cell, CellGroup} from 'vant'
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'

Vue.use(Cell);
Vue.use(CellGroup);

export default {
  name: 'Mine',
  data () {
    return {

    }
  },
  components: {
    HeaderTop
  },
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped>
.mine {
  overflow: hidden;
}
.mine-container {
  background-color: rgb(247, 248, 250);
  margin-top: 45px;
}
</style>
