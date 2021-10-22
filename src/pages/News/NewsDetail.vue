<template>
  <div class="news-detail">
    <div>
      <div class="data-title">
        {{newsItem.title}}
      </div>
      <div class="data-text">
        {{newsItem.text}}
      </div>
      <div class="description">user:admin {{newsItem.time}}</div>
    </div>
    <div class="fixedComment">
      <van-row type="flex" justify="center" align="center">
        <van-col >
          <van-row type="flex" align="center">
            <van-col>
              <form action="/">
                <van-search
                  @focus="enableComment"
                  :clearable="false"
                  shape="round"
                  v-model="comment.content"
                  placeholder="请输入评论"
                  @search="commentEnter"
                >
                  <template v-slot:left-icon>
                    <span></span>
                  </template>
                </van-search>
              </form>
            </van-col>
          </van-row>
        </van-col>
        <van-col >
          <span>reply</span>
        </van-col>
      </van-row>
<!--        <van-popover-->
<!--          placement="bottom"-->
<!--          title="标题"-->
<!--          width="500"-->
<!--          height="700"-->
<!--          trigger="click"-->
<!--          v-model="emojiShow"-->
<!--          @select="onSelect"-->
<!--        >-->
<!--          <template #reference>-->
<!--            <van-button slot="reference">😀</van-button>-->
<!--            <div class="browBox">-->
<!--              <ul>-->
<!--                <li-->
<!--                  v-for="(item, index) in faceList"-->
<!--                  :key="index"-->
<!--                  @click="getBrow(index)"-->
<!--                >-->
<!--                  {{ item }}-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </template>-->
<!--        </van-popover>-->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Card, Col, Row,Grid, Search, Popover} from 'vant';

  const packData = require("../../assets/packData.json");
  Vue.use(Card);
  Vue.use(Col);
  Vue.use(Row);
  Vue.use(Search);
  Vue.use(Popover);
  Vue.use(Grid);
  export default {
    name: "NewsDetail",
    components: {
    },
    data() {
      return {
        newsItem: this.$route.params.item,
        detail: '',
        comment: {
          content: ''
        },
        emojiShow: false,
        faceList: [],
        getBrowString: "",
        pack: packData,
        showPopover: false,
      }
    },
    created() {
      this.loadEmojis();
      console.log(this.newsItem)
      // this.$http.get(`https://hacker-news.firebaseio.com/v0/item/${this.id}.json?print=pretty`)
      //   .then(res=>{
      //     console.log(res.data)
      //     this.newsData.push({
      //       title:res.data.title,
      //       id:item
      //     })
      //   })
    },
    methods: {
      loadEmojis() {
        for (let i in packData) {
          this.faceList.push(packData[i].char);
        }
      },
      // 获取用户点击之后的标签 ，存放到输入框内
      onSelect(){
        this.emojiShow = false;
      },
      getBrow(index) {
        for (let i in this.faceList) {
          if (index == i) {
            this.getBrowString = this.faceList[index];
            this.comment.content += this.getBrowString;
          }
        }
        this.onSelect()
        console.log(this.emojiShow)
      },
      submitMessage() {
      },
      commentEnter () {

      },
      enableComment() {

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

  .fixedComment {
    position: fixed;
    bottom: 0;
    padding: 0px 0px 0px 8px;
    background-color: rgb(255, 255, 255);
    width: 100%;
    display: block;
    color: #ED6A0C;
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
</style>
