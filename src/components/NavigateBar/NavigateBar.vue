<template>
  <div class="footer_guide">
    <span
      class="guide_item"
      :class="{ on: '/home' === $route.path }"
      @click="goTo('/home')"
    >
      <span class="item_icon">
        <van-icon name="new-o" />
      </span>
      <span @click="goTo('/news')">News</span>
    </span>
    <span
      class="guide_item"
      :class="{ on: '/todo' === $route.path }"
      @click="goTo('/todo')"
    >
      <span class="item_icon">
        <van-icon name="orders-o" />
      </span>
      <span>ToDo</span>
    </span>
    <span
      class="guide_item"
      :class="{ on: '/mine' === $route.path }"
      @click="goTo('/mine')"
    >
      <span class="item_icon">
        <van-icon name="manager-o" />
      </span>
      <span>Mine</span>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.use(vant.Icon)
export default {
  name: 'NavigateBar',
  data () {
    return {}
  },
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>
<style scoped>
.footer_guide {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px #e4e4e4 solid;
}
.guide_item {
  display: flex;
  flex: 1;
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  color: #999999;
}
.on {
  color: #00a7d0;
}

</style>
