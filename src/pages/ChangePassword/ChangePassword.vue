<template>
  <section class="changePassword">
    <span class="go_back" @click="goTo('/mine')">
      <van-icon name="arrow-left" />
    </span>
    <div class="changePassword-title">Change Password</div>
    <div class="changePassword-container">
      <van-form @submit="onSubmit">
        <van-field
          v-model="oldPassword"
          name="oldPassword"
          label="Old Password"
          placeholder="old password"
        />
        <van-field
          v-model="newPassword"
          name="newPassword"
          label="New Password"
          placeholder="new password"
        />
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
import { updatePassword } from "@/api/index";
Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Notify);
Vue.use(Dialog);
export default {
  name: "ChangePassword",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      username:"",
    };
  },
  beforeMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.username = userInfo.username;
  },
  methods: {
    async onSubmit() {
      const response = await updatePassword({
        username: this.username,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      });
      if (response.code === 0) {
          Notify({ type: "success", message: response.msg });
          this.oldPassword = "";
          this.newPassword = "";  
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
.changePassword {
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
.changePassword-container {
  padding-top: 10px;
}
.changePassword-title {
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
