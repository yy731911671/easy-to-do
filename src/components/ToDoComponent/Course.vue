<template>
  <section class="course">
    <div class="course-container">
      <van-button
        class="course-add"
        icon="plus"
        type="primary"
        size="small"
        @click="handleCreate()"
      />
      <div class="data-list" v-for="item in courseList">
        <div class="course-data">
          <div class="course-content">
            <div class="course-date">Date: {{ item.date }}</div>
            <div class="course-classroom">Classroom: {{ item.classroom }}</div>
            <div class="course-classname">Course name: {{ item.courseName }}</div>
            <div class="course-duration">Duration: {{ item.duration }}</div>
          </div>
          <div class="course-operate">
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
            <van-form >
              <van-field
                v-model="formField.date"
                name="date"
                label="Date"
                placeholder="date"
              />
              <van-field
                v-model="formField.classroom"
                name="classroom"
                label="Classroom"
                placeholder="classroom"
              />
              <van-field
                v-model="formField.courseName"
                name="courseName"
                label="Course name"
                placeholder="course name"
              />
              <van-field
                v-model="formField.duration"
                name="duration"
                label="Duration"
                placeholder="duration"
              />
              <div class="update-button">
                <van-button plain hairline type="primary" @click="onSubmit">Submit</van-button>
                <van-button plain hairline type="info" @click="onCancel">Cancel</van-button>
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
  name: "Course",
  data() {
    return {
      show: false,
      courseList: [
        {
          id: 1,
          date: "2022-11-28",
          classroom: "room1",
          courseName: "SWEN",
          duration: 1.5,
          studentId: 2,
        },
        {
          id: 1,
          date: "2022-11-28",
          classroom: "room1",
          courseName: "SWEN",
          duration: 1.5,
          studentId: 2,
        },
      ],
      formField: {
        date: "",
        classroom: "",
        courseName: "",
        duration: ""
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
      this.formField.classroom = item.classroom;
      this.formField.courseName = item.courseName;
      this.formField.duration = item.duration;
    },
    handleDelete(id) {},
    onSubmit() {
      this.onCancel();
    },
    onCancel() {
      this.show = false;
      this.formField = {
        date: "",
        classroom: "",
        courseName: "",
        duration: ""
      }
    }
  },
};
</script>

<style scoped>
.course-data {
  border: 2px solid #00a7d0;
  border-radius: 5px;
  padding: 5px 5px;
  margin: 5px;
  color: chocolate;
  display: flex;
  justify-content: space-between;
}
.course-operate {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.course-add {
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
