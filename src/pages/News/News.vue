<template>
  <div class="news-title">
    <HeaderTop title="News">
      <div v-if="roleId == 3 || roleId == 2" slot="right" class="right_slot" @click="postNews"><van-icon name="add-o" size="40" color="#ED6A0C" /></div>
    </HeaderTop>
    <van-list
      v-if="ifLogin"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="data-list" v-for="item in newsData">
        <div class="detail" @click="getDataId(item.id)">
          <div class="title van-multi-ellipsis--l2">
            {{item.title}}
          </div>
          <div class="brief van-multi-ellipsis--l2">user:{{item.author}}
          <span>
             {{item.publishTime}}
          </span></div>
        </div>
      </div>
    </van-list>
    <div class="todo-noLogin" v-if="!ifLogin">
      Please sign in first!
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {fetchNewsIdList} from '../../api/index'
  import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
  import { Button, Cell,Row ,Col, List,Divider,Icon} from 'vant';
  import { newsList} from "@/api/index";

  Vue.use(Button);
  Vue.use(List);
  Vue.use(Cell);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Divider);
  Vue.use(Icon);
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
          newsData:[],
          userInfo:{},
          roleId: 0,
          ifLogin: localStorage.getItem('ifLogin')
        };
      },
      beforeMount() {
        const ifLogin = localStorage.getItem('ifLogin');
        if(ifLogin === 'true') {
          this.ifLogin = true;
        } else {
          this.ifLogin = false;
        }
        this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || null
        if (this.userInfo){
           this.roleId = this.userInfo.roleid
        }
      },
      methods: {
        onLoad() {
          // 异步更新数据
          newsList().then(res=>{
            console.log(res)
              let data = res.data
              let records = data.records
              console.log(records)
              // author: "lheng"
              // content: "aaa"
              // id: 3
              // publishTime: "2021-10-31 23:59:00"
              // title: "1"
              records.forEach(item=>{
                this.newsData.push({
                  id:item.id,
                  title:item.title,
                  author:item.author,
                  content:item.content,
                  publishTime:item.publishTime
                })
              })
              console.log(this.newsData)
            }).catch(err=>{
            console.log(err)
          })
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            this.finished = true;
        },
        getDataId(id){
          this.$router.push({
            name: 'NewsDetail',
            params: {
              id: id,
            }
          })
        },
        postNews() {
          this.$router.push({
            name: 'PostNews',
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
    display: flex;
    justify-content: space-between;
    font-size: 4vw;
    color: #999999;
    border-bottom: solid 1px #cbcaca;
    padding-bottom: 5px;
  }
  .right_slot{
    position: absolute;
    left: 88%;
  }
  .todo-noLogin {
    width: 100%;
    margin-top: 200px;
    text-align: center;
    color: #00a7d0;
    font-weight:bolder;
    font-size: 30px;
  }
</style>
