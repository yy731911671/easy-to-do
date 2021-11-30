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
import { Button, Overlay, Form, Field } from "vant";

Vue.use(Button);
Vue.use(Overlay);
Vue.use(Form);
Vue.use(Field);
export default {
  name: "Homework",
  data() {
    return {
      show: false,
      homeworkList: [
        {
          id: 1,
          date: "2021-11-27 00:00",
          courseName: "SWEN",
          content: "HW7",
          deadline: "2021-12-1 00:00",
          studentId: 2,
        },
        {
          id: 1,
          date: "2021-11-27 00:00",
          courseName: "SWEN",
          content: "HW7",
          deadline: "2021-12-1 00:00",
          studentId: 2,
        },
      ],
      formField: {
        date: "",
        courseName: "",
        content: "",
        deadline: "",
      },
    };
  },
  created() {},
  methods: {
    handleCreate() {
      this.show = true;
    },
    handleUpdate(item) {
      this.show = true;
      this.formField.date = item.date;
      this.formField.courseName = item.courseName;
      this.formField.content = item.content;
      this.formField.deadline = item.deadline;
    },
    handleDelete(id) {},
    onSubmit() {
      this.onCancel();
    },
    onCancel() {
      this.show = false;
      this.formField = {
        date: "",
        courseName: "",
        content: "",
        deadline: "",
      };
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
