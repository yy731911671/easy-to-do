/* eslint-disable no-undef */
/* eslint-disable no-undef */
<template>
  <section class="mine">
    <HeaderTop title="Mine"></HeaderTop>
    <div class="mine-container">
      <van-cell v-if="ifLogin">
        <van-icon name="user-o" />
        Nickname: {{nickname}}
      </van-cell>
      <van-cell value="Sign In / Sign Up" size="large" @click="goTo('/login')" v-if="!ifLogin"/>
      <van-cell value="Todo-List" @click="goTo('/todo')"/>
      <van-cell value="Authorization" @click="goTo('/authorization')" v-if="roleId===3"/>
      <van-cell value="Change Password" @click="goTo('/changePassword')" />
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
      ifLogin: true,
      nickname: '',
      roleId: 1,
    }
  },
  components: {
    HeaderTop
  },
  beforeMount() {
    const ifLogin = localStorage.getItem('ifLogin');
    if(ifLogin === 'true') {
      this.ifLogin = true;
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.nickname = userInfo.nickname;
      this.roleId = userInfo.roleid;
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
