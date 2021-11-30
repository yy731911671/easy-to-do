<template>
  <header class="header">
    <span class="header_title">{{title}}</span>
    <slot name="right" ></slot>
    <slot name="left" ></slot>
  </header>
</template>

<script>
export default {
  name: "HeaderTop",
  data() {
    return {};
  },
  props: {
    title: String
  }
};
</script>

<style scoped>
.header {
  background-color: #00a7d0;
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  height: 45px;
}
.header_title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
</style>
