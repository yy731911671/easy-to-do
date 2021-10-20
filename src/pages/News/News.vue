<template>
  <div class="news-title">
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
          <div class="brief van-multi-ellipsis--l2">user:admin  {{item.time}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Button, Cell,Row ,Col, List,Divider } from 'vant';
  Vue.use(Button);
  Vue.use(List);
  Vue.use(Cell);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Divider);
    export default {
      name: "News",
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
          // setTimeout 仅做示例，真实场景中一般为 ajax 请求
          // this.$http.get('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
          //   .then(res=>{
          //     let data = res.data
          //     for(let i = 0; i < 30; i++) {
          //       this.newsId.push(data[i])
          //     }
          //     this.newsId.forEach(item=>{
          //       this.$http.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
          //         .then(res=>{
          //           console.log(res.data,)
          //           let time = this.getTime(res.data.time)
          //           this.newsData.push({
          //             title:res.data.title,
          //             id:item,
          //             text:res.data.text,
          //             data:time
          //           })
          //         })
          //     })
          //   }).catch(err=>{
          //   console.log(err)
          // })

            this.newsData.push({
              title:"Ask HN: What are some of the best kits for kids to learn Arduino/electronics?",
              id:1,
              text:"Can the HN community recommend their solutions&#x2F;kits&#x2F;toys&#x2F;teaching methods for 8 yo kids to learn basics of electronics and Arduino programming? My 8yo son is quite into soldering and Arduino programming and I would like to support him the way he wants with the optimum amount of tools and the right exposure. Currently he can solder, can build DIY electronics kits purchased from AliExpress, code in Arduino IDE and build simple circuits on breadboard.",
              time:this.getTime(1634526579)
            })
          this.newsData.push({
            title:"Ask HN: How to Calculate?",
            id:2,
            text:"Can the HN community recommend their solutions&#x2F;kits&#x2F;toys&#x2F;teaching methods for 8 yo kids to learn basics of electronics and Arduino programming? My 8yo son is quite into soldering and Arduino programming and I would like to support him the way he wants with the optimum amount of tools and the right exposure. Currently he can solder, can build DIY electronics kits purchased from AliExpress, code in Arduino IDE and build simple circuits on breadboard.",
            time:this.getTime(1634537944)
          })
          this.newsData.push({
            title:"I am compiling short sci-fi stories to read for the next 4 months. Any recommendation?",
            id:3,
            text:"Can the HN community recommend their solutions&#x2F;kits&#x2F;toys&#x2F;teaching methods for 8 yo kids to learn basics of electronics and Arduino programming? My 8yo son is quite into soldering and Arduino programming and I would like to support him the way he wants with the optimum amount of tools and the right exposure. Currently he can solder, can build DIY electronics kits purchased from AliExpress, code in Arduino IDE and build simple circuits on breadboard.",
            time:this.getTime(1634505312)
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
    font-size: 20px;
  }
  .data-list {
    padding: 10px;
    display: flex;
    justify-content: left;
    border-bottom: solid 1px #cbcaca;
  }

  .data-list .detail {
    line-height: 1.4;
    font-size: 4vw;
    flex: 1;
  }

  .data-list .detail .brief {
    font-size: 3vw;
    color: #999999;
  }

</style>
