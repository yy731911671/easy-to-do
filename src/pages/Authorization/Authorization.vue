<template>
  <section class="authorization">
    <span class="go_back" @click="goTo('/mine')">
      <van-icon name="arrow-left" />
    </span>
    <div class="authorization-title">Authorization</div>
    <div class="authorization-container">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="User Name"
          placeholder="User Name"
        />
        <div class="role_type">Role Type</div>
        <div class="radio">
          <label v-for="(item, index) in radioData" :key="index">
            <input type="radio" v-model="roleid" :value="item.value" />
            {{ item.name }}
          </label>
        </div>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >Submit</van-button
          >
        </div>
      </van-form>
    </div>
  </section>
</template>

<script>
import HeaderTop from "@/components/HeaderTop/HeaderTop.vue";
import { updateAuthority } from "@/api/index";
import Vue from "vue";
import {
  Form,
  Icon,
  Field,
  Button,
  Notify,
  Dialog,
  RadioGroup,
  Radio,
} from "vant";
Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Notify);
Vue.use(Dialog);
export default {
  name: "Authorization",
  data() {
    return {
      username: "",
      radioData: [
        {
          name: "common user",
          value: 1,
        },
        {
          name: "publisher",
          value: 2,
        },
        {
          name: "administrator",
          value: 3,
        },
      ],
      roleid: 1,
    };
  },
  methods: {
    async onSubmit() {
      const response = await updateAuthority({
        username: this.username,
        roleId: this.roleid,
      });
      if (response.code === 0) {
        Notify({ type: "success", message: response.msg });
      } else {
        Notify({ type: "danger", message: response.msg });
      }
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
  components: {
    HeaderTop,
  },
};
</script>

<style scoped>
.authorization {
  position: relative;
}
.go_back {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: #999;
  text-align: center;
  z-index: 100;
}
.role_type {
  margin: 10px;
}
.authorization-container {
  padding-top: 10px;
}
.authorization-title {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 40px;
  color: #00a7d0;
}
.radio {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
