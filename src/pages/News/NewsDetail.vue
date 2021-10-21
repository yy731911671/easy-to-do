<template>
<div class="news-detail">
    <div class="data-title">
      {{newsItem.title}}
    </div>
      <div class="data-text">
        {{newsItem.text}}
      </div>
      <div class="description">user:admin    {{newsItem.time}}</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Card } from 'vant';

  Vue.use(Card );
    export default {
        name: "NewsDetail",
      data(){
          return {
            newsItem: this.$route.params.item,
            detail:'',
          }
      },
      created() {
          console.log(this.newsItem)
        // this.$http.get(`https://hacker-news.firebaseio.com/v0/item/${this.id}.json?print=pretty`)
        //   .then(res=>{
        //     console.log(res.data)
        //     this.newsData.push({
        //       title:res.data.title,
        //       id:item
        //     })
        //   })
      }
    }
</script>

<style scoped>
.news-detail{
  padding: 10px;
  overflow-x: hidden;
}
.news-detail .data-title {
  font-weight: 600;
  line-height: 1.4;
  font-size: 6.5vw;
  flex: 1;
  padding-bottom: 2vh;
}
.news-detail .data-text {
  line-height: 1.4;
  font-size: 5vw;
  flex: 1;
}
.news-detail .description {
  font-size: 5vw;
  color: #999999;
  border-bottom: solid 1px #cbcaca;
  padding: 2vh;
}
</style>
