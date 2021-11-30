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
            <div class="course-classname">
              Course name: {{ item.courseName }}
            </div>
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
            <van-form>
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
import { addCourse, updateCourse, getCourse, deleteCourse } from "@/api/index";
Vue.use(Button);
Vue.use(Overlay);
Vue.use(Form);
Vue.use(Field);
Vue.use(Notify);
export default {
  name: "Course",
  data() {
    return {
      show: false,
      courseList: [],
      formField: {
        date: "",
        classroom: "",
        courseName: "",
        duration: "",
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
      const response = await getCourse({
        userId: this.userId
      });
      if (response.code === 0) {
        this.courseList = response.data;
      } else {
        Notify({ type: "danger", message: response.msg });
      }
    },
    handleCreate() {
      this.submitType = 1;
      this.show = true;
    },
    handleUpdate(item) {
      this.formField.date = item.date;
      this.formField.classroom = item.classroom;
      this.formField.courseName = item.courseName;
      this.formField.duration = item.duration;
      this.id = item.id;
      this.submitType = 2;
      this.show = true;
    },
    async handleDelete(id) {
      const response = await deleteCourse({
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
         response = await addCourse({
          ...this.formField,
          userId: this.userId
        });
      } else {
          response = await updateCourse({
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
        classroom: "",
        courseName: "",
        duration: "",
      };
      this.getList();
    },
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
