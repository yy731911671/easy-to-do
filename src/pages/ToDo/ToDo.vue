<template>
  <section class="todo">
    <HeaderTop title="ToDo"></HeaderTop>
    <div class="todo-container">
      <div v-if="ifLogin">
        <div class="todo-radio">
          <div><input type="radio" v-model="radioVal" :value=1 /> Course</div>
          <div><input type="radio" v-model="radioVal" :value=2 /> Activity</div>
          <div><input type="radio" v-model="radioVal" :value=3 /> Homework</div>
        </div>
        <div class="todo-content">
          <Course v-if="radioVal==1"></Course>
          <Activity v-if="radioVal==2"></Activity>
          <Homework v-if="radioVal==3"></Homework>  
        </div> 
      </div>
      <div class="todo-noLogin" v-if="!ifLogin">
        Please sign in first! 
      </div>
    </div>
  </section>
</template>

<script>
import HeaderTop from "@/components/HeaderTop/HeaderTop.vue";
import Activity from "@/components/ToDoComponent/Activity.vue";
import Course from "@/components/ToDoComponent/Course.vue";
import Homework from "@/components/ToDoComponent/Homework.vue";
import Vue from "vue";

export default {
  name: "ToDo",
  data() {
    return {
      radioVal: 1,
      ifLogin: false
    };
  },
  beforeMount() {
    const ifLogin = localStorage.getItem('ifLogin');
    if(ifLogin === 'true') {
      this.ifLogin = true;
    } else {
      this.ifLogin = false;
    }
  },
  components: {
    HeaderTop,
    Activity,
    Course,
    Homework
  },
  methods: {
    
  },
};
</script>

<style scoped>
.todo-container {
  margin-top: 45px;
  margin-bottom: 50px;
}
.todo-data {
  border: 1px solid #00a7d0;
  padding: 5px 5px;
}
.todo-radio {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 3px solid #00a7d0;
  padding: 10px;
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
