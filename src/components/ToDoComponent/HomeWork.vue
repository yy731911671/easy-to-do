<template>
  <section class="homework">
    <div class="homework-container">
      <van-button
        class="homework-add"
        icon="plus"
        type="primary"
        size="small"
        @click="handleCreate()"
      />
      <div class="data-list" v-for="item in homeworkList">
        <div class="homework-data">
          <div class="homework-content">
            <div class="homework-date">Date: {{ item.date }}</div>
            <div class="homework-coursename">
              Course name: {{ item.courseName }}
            </div>
            <div class="homework-duration">Content: {{ item.content }}</div>
            <div class="homework-deadline">Deadline: {{ item.deadline }}</div>
          </div>
          <div class="homework-operate">
            <van-button type="info" size="small" @click="handleUpdate(item)"
              >update</van-button
            >
            <van-button
              type="danger"
              size="small"
              @click="handleDelete(item.id)"
              >delete</van-button
            >
          </div>
        </div>
      </div>
      <van-overlay :show="show">
        <div class="wrapper">
          <div class="block">
            <van-form>
              <van-field
                v-model="formField.date"
                name="date"
                label="Date"
                placeholder="date"
              />
              <van-field
                v-model="formField.courseName"
                name="courseName"
                label="Course Name"
                placeholder="course name"
              />
              <van-field
                v-model="formField.content"
                name="content"
                label="Content"
                placeholder="content"
              />
              <van-field
                v-model="formField.deadline"
                name="deadline"
                label="Deadline"
                placeholder="deadline"
              />
              <div class="update-button">
                <van-button plain hairline type="primary" @click="onSubmit"
                  >Submit</van-button
                >
                <van-button plain hairline type="info" @click="onCancel"
                  >Cancel</van-button
                >
              </div>
            </van-form>
          </div>
        </div>
      </van-overlay>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { Button, Overlay, Form, Field, Notify } from "vant";
import { addHomework, updateHomework, getHomework, deleteHomework } from "@/api/index";
Vue.use(Button);
Vue.use(Overlay);
Vue.use(Form);
Vue.use(Field);
Vue.use(Notify);
export default {
  name: "Homework",
  data() {
    return {
      show: false,
      homeworkList: [],
      formField: {
        date: "",
        courseName: "",
        content: "",
        deadline: "",
      },
      submitType: 0, //1: create 2: update
      userId: "",
      id: "",
    };
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userId = userInfo.id;
    this.getList();
  },
  methods: {
    async getList() {
      const response = await getHomework({
        userId: this.userId
      });
      if (response.code === 0) {
        this.homeworkList = response.data;
      } else {
        Notify({ type: "danger", message: response.msg });
      }
    },
    handleCreate() {
      this.submitType = 1;
      this.show = true;
    },
    handleUpdate(item) {
      this.show = true;
      this.formField.date = item.date;
      this.formField.courseName = item.courseName;
      this.formField.content = item.content;
      this.formField.deadline = item.deadline;
      this.id = item.id;
      this.submitType = 2;
      this.show = true;
    },
    async handleDelete(id) {
      const response = await deleteHomework({
        id,
      });
      if (response.code === 0) {
        Notify({ type: "success", message: response.msg });
        this.getList();
      } else {
        Notify({ type: "danger", message: response.msg });
      }
    },
    async onSubmit() {
      let response = {};
      if (this.submitType === 1) {
         response = await addHomework({
          ...this.formField,
          userId: this.userId
        });
      } else {
          response = await updateHomework({
          ...this.formField,
          userId: this.userId,
          id: this.id
        });
      }

      if (response.code === 0) {
        Notify({ type: "success", message: response.msg });
        this.onCancel();
      } else {
        Notify({ type: "danger", message: response.msg });
      }     
    },
    onCancel() {
      this.show = false;
      this.formField = {
        date: "",
        courseName: "",
        content: "",
        deadline: "",
      };
      this.getList();
    },
  },
};
</script>

<style scoped>
.homework-data {
  border: 2px solid #00a7d0;
  border-radius: 5px;
  padding: 5px 5px;
  margin: 5px;
  color: chocolate;
  display: flex;
  justify-content: space-between;
}
.homework-operate {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.homework-add {
  width: 50px;
  margin: 5px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 300px;
  background-color: #fff;
}
.update-button {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
</style>
