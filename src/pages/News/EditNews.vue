<template>
  <section class="postNewsContainer">
    <div class="postNewsInner">
      <van-form @submit="onSubmit" class="form">
        <div class="postNews">
          <van-field
            v-model="newsItem.title"
            name="title"
            label="title:"
            placeholder="title"
            :rules="[
              { required: true, message: 'Please fill in the title' },
            ]"
            style="border-bottom: solid 1px #cbcaca;"
          />
          <van-field
            v-model="newsItem.author"
            name="title"
            label="author:"
            placeholder="author"
            :rules="[
              { required: true, message: 'Please fill in the author' },
            ]"
            style="border-bottom: solid 1px #cbcaca;"
          />
          <van-field
            v-model="newsItem.content"
            rows="3"
            autosize
            label="content:"
            type="textarea"
            maxlength="255"
            placeholder="Please fill in the content"
            show-word-limit
            :rules="[
              { required: true, message: 'Please fill in the content' },
            ]"
          />
        </div>

        <div style="margin: 30px">
          <van-button round block type="info" native-type="submit">Update</van-button>
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
  import time from '../../util/DateFmt'
  import { newsDetail,editNews} from "@/api/index";
  import qs from 'qs'
  Vue.use(Icon);
  Vue.use(Form);
  Vue.use(Field);
  Vue.use(Button);
  Vue.use(Notify);
  Vue.use(Dialog);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  export default {
    name: "EditNews",
    data() {
      return {
        newsId:0,
        newsItem: {
          author: "",
          content: "",
          id: this.$route.params.id,
          publishTime: "",
          title: ""
        },
      };
    },
    created() {
      this.newsId = this.$route.params.id
      if(!this.newsId){
        this.newsId = localStorage.getItem('newsId')
      }
      newsDetail(this.newsId).then(res=>{
          let data = res.data
          this.newsItem = data
          console.log(data,this.newsItem)
        })
    },
    methods: {
      onSubmit() {
        this.updateNews();
      },
      async updateNews() {
        if (!this.newsItem.title) {
          Dialog.alert({
            title: "Fail",
            message: "Please fill in the title",
          }).then(() => {
            return;
          });
        } else if (!this.newsItem.content) {
          Dialog.alert({
            title: "Fail",
            message: "Please fill in the content",
          }).then(() => {
            return;
          });
        } else {
          //send request
          console.log(this.newsItem.title,this.newsItem.content)
          // Integer id;
          // String title;
          // String publishTime;//格式：yyyy-MM-dd HH:mm:ss
          // String author;
          // String content;
          let params = {'id':this.newsItem.id,'title':this.newsItem.title,
            'publishTime':time,
            'author':this.newsItem.author,
            'content':this.newsItem.content
          }
          console.log(params)
          editNews(params).then(res=>{
            console.log(res)
            if (res.code === 0) {
              Notify({ type: 'success', message: 'Successfully modified' });
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
  .van-cell {
    font-size: 16px;
  }
  .van-field__label {
    font-weight: 600;
    width: 2.2em;
  }
  .postNewsInner {
    padding-top: 60px;
  }
  .postNews{

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
