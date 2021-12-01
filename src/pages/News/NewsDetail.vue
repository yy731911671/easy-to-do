<template>
  <div>
    <HeaderTop title="News">
      <div slot="right" class="right_slot" v-if="roleId == 3 || roleId == 2" @click="getMore">
        <van-icon name="more-o" size="40" color="#ED6A0C" />
      </div>
      <div slot="left" class="go_back" @click="$router.back()">
        <van-icon name="arrow-left" />
      </div>
    </HeaderTop>
    <div class="news-detail">
      <div>
        <div class="data-title">
          {{newsItem.title}}
        </div>
        <div class="data-text">
          {{newsItem.content}}
        </div>
        <div class="description">{{newsItem.author}} &nbsp;&nbsp; {{newsItem.publishTime}}</div>
      </div>
      <div class="comments-title">
        Comments:
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="data-list" v-for="item in comment">
          <div class="detail">
            <div class="title">
              {{item.comment}}
            </div>
            <div class="brief">{{item.nickname}} &nbsp;&nbsp;&nbsp;&nbsp;  {{item.createTime}}
              <span class="delete-comment" v-if="roleId == 3 || roleId == 2" @click="deleteComment(item.id)">
                delete
              </span>
            </div>
          </div>
        </div>
      </van-list>
      <div class="fixedComment">
        <van-row type="flex" justify="left" align="center">
                <van-search
                  :clearable="false"
                  shape="round"
                  v-model="myComment"
                  placeholder="请输入评论">
                  <template v-slot:left-icon>
                    <span></span>
                  </template>
                </van-search>
            <span @click="postComment">reply</span>
        </van-row>
      </div>
    </div>
    <van-share-sheet v-model="showShare" :options="options" @select="getSelectMore"/>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {Card, Col, Row, Grid, Search, Popover, ShareSheet, Notify,Dialog } from 'vant';
  import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
  import time from '../../util/DateFmt'
  import { newsDetail,editComment,commentList} from "@/api/index";

  Vue.use(Card);
  Vue.use(Col);
  Vue.use(Row);
  Vue.use(Search);
  Vue.use(Popover);
  Vue.use(Grid);
  Vue.use(ShareSheet);
  Vue.use(Notify);
  Vue.use(Dialog);

  export default {
    name: "NewsDetail",
    components: {
      HeaderTop
    },
    data() {
      return {
        loading: false,
        finished: false,
        newsItem: {
          author: "",
          content: "",
          id: this.$route.params.id,
          publishTime: "",
          title: ""
        },
        newsId:0,
        detail: '',
        myComment:'',
        comment:[],
        showShare: false,
        options: [
          {
            name: 'Update',
            icon: 'https://img01.yzcdn.cn/vant/custom-icon-light.png',
          },
          {
            name: 'Delete',
            icon: 'https://img01.yzcdn.cn/vant/custom-icon-water.png',
          },
        ],
        userInfo:JSON.parse(localStorage.getItem('userInfo')),
        roleId:0,
      }
    },
    created() {
      this.roleId = this.userInfo.roleid
      this.newsId = this.$route.params.id
      if(this.newsId){
        localStorage.setItem('newsId',this.newsId);
      } else {
        this.newsId = localStorage.getItem('newsId')
      }
      newsDetail(this.newsId).then(res=>{
          let data = res.data
          this.newsItem = data
          console.log(data,this.newsItem)
        })
    },
    methods: {
      deleteComment(id){
        Dialog.confirm({
          title: 'Delete prompt',
          message: 'Confirm to delete this comment',
        }).then(() => {
          console.log(id)
          this.$http.delete(`api/comment/delete/${id}`, {body: id})
            .then(res=>{
              console.log(res)
              if(res.data.code == 0){
                Notify({ type: 'success', message: 'delete successfully' });
                this.$router.go(0)
              }
            })
        }).catch(() => {
          Notify({ type: "danger", message: "cancel" });
          });

      },
      postComment(){
        if(this.myComment) {
          let params = {
            nid:this.newsItem.id,
            nickname:this.newsItem.author,
            createTime:time,
            comment:this.myComment
          }
          // String nickname;//用户的nickname
          // String createTime;//格式：yyyy-MM-dd HH:mm:ss
          // String comment;
          // Integer nid;//某条新闻的id
          console.log(params)
          editComment(params).then(res=>{
            console.log('res',res)
            if (res.code === 0) {
              Notify({ type: 'success', message: 'reply successfully' });
              this.$router.go(0)
            } else {
              Notify({ type: "danger", message: res.message });
            }
          })
        }
      },
      onLoad() {
        // 异步更新数据
        commentList(this.newsId).then(res=>{
            let records = res.data.records
            records.forEach(item=>{
              this.comment.push({
                id:item.id,
                comment:item.comment,
                createTime:item.createTime,
                nickname:item.nickname
              })
            })
            this.comment.sort(this.compareArr('id'))
            console.log(this.comment)
            }).catch(err=>{
          console.log(err)
        })
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        this.finished = true;
      },
      getMore(){
        this.showShare = true
      },
      getSelectMore(v){
        console.log(v)
        if(this.userInfo.roleid !== 3 || this.userInfo.roleid !== 2) {
          this.showShare = false
        }
        if(v.name=="Update") {
          this.$router.push({
            name: 'EditNews',
            params: {
              id: this.newsId,
            }
          })
        } else if(v.name=="Delete") {
          console.log("----")
          this.$http.delete(`api/news/delete/${this.newsId}`, {body: this.newsId})
            .then(res=>{
              console.log(res)
              if(res.data.code == 0){
                this.$router.push({
                  name: 'News',
                })
              }
            })
        }
        this.showShare = false
      },
      compareArr(property){
        return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      }
    }
  }
</script>

<style scoped>
  .news-detail {
    padding: 10px;
    overflow-x: hidden;
  }

  .news-detail .data-title {
    font-weight: 600;
    line-height: 1.4;
    font-size: 6.5vw;
    flex: 1;
    padding-bottom: 2vh;
    padding-top: 6vh;
  }

  .news-detail .data-text {
    line-height: 1.4;
    font-size: 5vw;
    flex: 1;
  }

  .news-detail .description {
    font-size: 4vw;
    color: #999999;
    border-bottom: solid 1px #cbcaca;
    padding: 2vh 2vh 0 2vh
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
    font-size: 3vw;
    color: #999999;
    border-bottom: solid 1px #cbcaca;
    padding-bottom: 5px;
    display: flex;
    justify-content: flex-end;
  }
  .fixedComment {
    position: fixed;
    bottom: 0;
    padding: 0px 0px 0px 8px;
    background-color: rgb(255, 255, 255);
    width: 100%;
    display: block;
    color: #d8af3b;
  }
  .comments-title{
    padding:10px;
    margin-left: -18px;
    color: #d8af3b;
  }
  .browBox {
    width: 100%;
    height: 200px;
    background: #e6e6e6;
    position: absolute;
    z-index: 100;
    bottom: 0px;
    overflow: scroll;
  }
  .browBox ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }
  .browBox ul li {
    cursor: pointer;
    width: 10%;
    font-size: 26px;
    list-style: none;
    text-align: center;
  }
  .delete-comment{
    margin-left: 5%;
    text-decoration: underline;
    color: #16a4e4;
  }
  .right_slot{
    position: absolute;
    left: 88%;
  }
  .go_back {
    position: absolute;
    top: 6px;
    left: 3px;
    font-size: 30px;
    color: #999;
    text-align: center;
  }
</style>
