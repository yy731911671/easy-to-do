<template>
  <div class="news-title">
    <HeaderTop title="News"></HeaderTop>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="data-list" v-for="item in newsData">
        <div class="detail" @click="getDataId(item)">
          <div class="title van-multi-ellipsis--l2">
            {{item.title}}
          </div>
          <div class="brief van-multi-ellipsis--l2">user:admin &nbsp;&nbsp;&nbsp;&nbsp;  {{item.time}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {fetchNewsIdList} from '../../api/index'
  import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
  import { Button, Cell,Row ,Col, List,Divider } from 'vant';
  Vue.use(Button);
  Vue.use(List);
  Vue.use(Cell);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Divider);
    export default {
      name: "News",
      components: {
        HeaderTop
      },
      data() {
        return {
          loading: false,
          finished: false,
          newsId:[],
          newsData:[]
        };
      },
      methods: {
        onLoad() {
          // 异步更新数据
          this.$http.get('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
            .then(res=>{
              let data = res.data
              for(let i = 0; i < 30; i++) {
                this.newsId.push(data[i])
              }
              this.newsId.forEach(item=>{
                this.$http.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
                  .then(res=>{
                    console.log(res.data)
                    let time = this.getTime(res.data.time)
                    console.log(time)
                    this.newsData.push({
                      title:res.data.title,
                      id:item,
                      text:res.data.text,
                      time:time
                    })
                  })
              })
            }).catch(err=>{
            console.log(err)
          })
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            this.finished = true;
        },
        getTime(time){
          let date = new Date(time)
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = date.getDate() + ' ';
          let h = date.getHours() + ':';
          let m = date.getMinutes() + ':';
          let s = date.getSeconds();
          return Y+M+D+h+m+s
        },
        getDataId(item){
          this.$router.push({
            name: 'NewsDetail',
            params: {
              item: item,
            }
          })
        }
      },
    }
</script>

<style scoped>
  .news-title{
    margin-top: 50px;
  }
  .data-list {
    display: flex;
    justify-content: left;
  }

  .data-list .detail {
    padding: 0 10px 10px 10px;
    line-height: 1.4;
    font-size: 5vw;
    flex: 1;
  }

  .data-list .detail .brief {
    font-size: 4vw;
    color: #999999;
    border-bottom: solid 1px #cbcaca;
    padding-bottom: 5px;
  }

</style>
