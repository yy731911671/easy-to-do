<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Easy-To-Do</h2>
        <div class="login_header_title">
          <span :class="{ on: loginWay }" @click="changeLogin">Sign In</span>
          <span :class="{ on: !loginWay }" @click="changeLogin">Sign Up</span>
        </div>
      </div>
      <van-form @submit="onSubmit" class="form">
        <div class="signIn" v-if="loginWay">
          <van-field
            v-model="username"
            name="username"
            label="User name"
            placeholder="User name"
            :rules="[
              { required: true, message: 'Please fill in the user name' },
            ]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            :rules="[
              { required: true, message: 'Please fill in the password' },
            ]"
          />
        </div>
        <div class="signUp" v-if="!loginWay">
          <van-field
            v-model="username"
            name="username"
            label="User Name"
            placeholder="User name"
            :rules="[
              { required: true, message: 'Please fill in the user name' },
            ]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            :rules="[
              { required: true, message: 'Please fill in the password' },
            ]"
          />
          <van-field
            v-model="nickname"
            name="nickname"
            label="Nickname"
            placeholder="Nickname"
            :rules="[
              { required: true, message: 'Please fill in the nickname' },
            ]"
          />
          <van-field
            v-model="email"
            name="email"
            label="Email"
            placeholder="Email"
            :rules="[{ required: true, message: 'Please fill in the Email' }]"
          />
          <van-field
            v-model="phoneNumber"
            type="tel"
            name="phoneNumber"
            label="Phone"
            placeholder="Phone number"
            :rules="[
              { required: true, message: 'Please fill in the phone number' },
            ]"
          />
        </div>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >Submit</van-button
          >
        </div>
      </van-form>
      <span class="go_back" @click="$router.back()">
        <van-icon name="arrow-left" />
      </span>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { Form, Icon, Field, Button, Notify, Dialog } from "vant";
import { signIn, signUp } from "@/api/index";
Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Notify);
Vue.use(Dialog);

export default {
  name: "Login",
  data() {
    return {
      loginWay: true,
      username: "",
      password: "",
      nickname: "",
      email: "",
      phoneNumber: "",
    };
  },
  methods: {
    changeLogin() {
      this.loginWay = !this.loginWay;
      this.clearData();
    },
    clearData() {
      this.username = "";
      this.password = "";
      this.nickname = "";
      this.email = "";
      this.phoneNumber = "";
    },
    onSubmit() {
      if (this.loginWay) {
        this.onHandleSignIn();
      } else {
        this.onHandleSignUp();
      }
    },
    async onHandleSignIn() {
      if (this.username === "") {
        Dialog.alert({
          title: "Fail",
          message: "Please fill in the user name",
        }).then(() => {
          return;
        });
      } else if (this.password === "") {
        Dialog.alert({
          title: "Fail",
          message: "Please fill in the password",
        }).then(() => {
          return;
        });
      } else {
        const response = await signIn({
          username: this.username,
          password: this.password,
        });
        if (response.code === 0) {
          localStorage.setItem("ifLogin", "true");
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          this.$router.replace("/news");
        } else {
          Notify({ type: "danger", message: response.msg });
        }
      }
    },
    async onHandleSignUp() {
      if (this.username === "") {
        Dialog.alert({
          title: "Fail",
          message: "Please fill in the user name",
        }).then(() => {
          return;
        });
      } else if (this.password === "") {
        Dialog.alert({
          title: "Fail",
          message: "Please fill in the password",
        }).then(() => {
          return;
        });
      } else if (this.nickname === "") {
        Dialog.alert({
          title: "Fail",
          message: "Please fill in the nickname",
        }).then(() => {
          return;
        });
      } else if (this.email === "") {
        Dialog.alert({
          title: "Fail",
          message: "Please fill in the email",
        }).then(() => {
          return;
        });
      } else if (this.phoneNumber === "") {
        Dialog.alert({
          title: "Fail",
          message: "Please fill in the phone number",
        }).then(() => {
          return;
        });
      } else {
        const response = await signUp({
          username: this.username,
          password: this.password,
          nickname: this.nickname,
          roleid: 1,
          email: this.email,
          phoneNumber: this.phoneNumber,
        });
        if (response.code === 0) {
          Dialog.alert({
            title: "Success",
            message: "Congratulations on your successful registration",
          }).then(() => {
            this.changeLogin();
          });
        } else {
          Notify({ type: "danger", message: response.msg });
        }
      }
    },
  },
};
</script>

<style scoped>
.loginContainer {
  width: 100%;
  height: 100%;
}
.loginInner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}
.login_logo {
  font-size: 40px;
  font-weight: blod;
  color: #00a7d0;
  text-align: center;
}
.login_header_title {
  text-align: center;
}
.login_header_title > span {
  font-size: 16px;
  padding-bottom: 6px;
  margin: 30px;
}
.on {
  color: #00a7d0;
  font-weight: 700;
  border-bottom: 2px solid #00a7d0;
}
.form {
  margin-top: 15px;
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
}
</style>
