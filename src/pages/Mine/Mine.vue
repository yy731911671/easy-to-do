/* eslint-disable no-undef */
/* eslint-disable no-undef */
<template>
  <section class="mine">
    <HeaderTop title="Mine"></HeaderTop>
    <div class="mine-container">
      <van-cell value="Sign in / Sign Up" size="large" @click="goTo('/login')" v-if="!ifLogin"/>
      <van-cell value="Todo-List" />
      <van-cell value="Authorization" />
      <div style="margin: 16px">
          <van-button round block type="danger" v-if="ifLogin" @click="onLogOut"
            >Log Out</van-button
          >
        </div>
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
      ifLogin: true
    }
  },
  components: {
    HeaderTop
  },
  beforeMount() {
    const ifLogin = localStorage.getItem('ifLogin');
    if(ifLogin === 'true') {
      this.ifLogin = true;
    } else {
      this.ifLogin = false;
    }
  },
  methods: {
    goTo (path) {
      this.$router.replace(path)
    },
    onLogOut() {
      this.ifLogin = false;
      localStorage.setItem('ifLogin', 'false');
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
