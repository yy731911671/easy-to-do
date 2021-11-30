<template>
  <section class="postNewsContainer">
    <div class="postNewsInner">
      <van-form @submit="onSubmit" class="form">
        <div class="postNews">
          <van-field
            v-model="title"
            name="title"
            label="title:"
            label-width="60px"
            placeholder="title"
            :rules="[
              { required: true, message: 'Please fill in the title' },
            ]"
            style="border-bottom: solid 1px #cbcaca;"
          />
          <van-field
            v-model="author"
            name="title"
            label="author:"
            placeholder="author"
            label-width="60px"
            :rules="[
              { required: true, message: 'Please fill in the author' },
            ]"
            style="border-bottom: solid 1px #cbcaca;"
          />
          <van-field
            v-model="content"
            rows="3"
            autosize
            label="content:"
            type="textarea"
            maxlength="255"
            label-width="60px"
            placeholder="Please fill in the content"
            show-word-limit
            :rules="[
              { required: true, message: 'Please fill in the content' },
            ]"
          />
        </div>

        <div style="margin: 30px">
          <van-button round block type="info" native-type="submit">Submit</van-button>
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
  import { Form, Icon, Field, Button, Notify, Dialog,RadioGroup, Radio } from "vant";
  import { editNews } from "@/api/index";
  import time from "../../util/DateFmt";

  Vue.use(Icon);
  Vue.use(Form);
  Vue.use(Field);
  Vue.use(Button);
  Vue.use(Notify);
  Vue.use(Dialog);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  export default {
    name: "PostNews",
    data() {
      return {
        title: "",
        author:"",
        content: "",
      };
    },
    methods: {

      clearData() {
        this.title = "";
        this.content = "";
      },
      onSubmit() {
        this.postNews();
      },
      async postNews() {
        if (this.title === "") {
          Dialog.alert({
            title: "Fail",
            message: "Please fill in the title",
          }).then(() => {
            return;
          });
        } else if (this.content === "") {
          Dialog.alert({
            title: "Fail",
            message: "Please fill in the content",
          }).then(() => {
            return;
          });
        } else {
          //send request
          console.log(this.title,this.content)
          let params = {'title':this.title,
            'publishTime':time,
            'author':this.author,
            'content':this.content
          }
          console.log(params)
          editNews(params).then(res=>{
            console.log(res)
            if (res.code === 0) {
              Notify({ type: 'success', message: 'Successfully post news' });
              this.$router.replace("/news");
            } else {
              Notify({ type: "danger", message: res.message });
            }
          })
        }
      },
    },
  };
</script>

<style scoped>
  .postNewsContainer {
    width: 100%;
    height: 100%;
    font-size: 5vw;
  }
  .postNewsInner {
    padding-top: 60px;
  }
  .postNews{

  }
  .form {
    margin-top: 15px;
  }
  .van-cell {
    font-size: 16px;
  }
  .van-field__label {
    font-weight: 600;
    width: 5.2em;
    margin-right: -25px;
  }
  .van-button--block {
    display: inline-block;
    width: 38%;
    left: 33%;
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
