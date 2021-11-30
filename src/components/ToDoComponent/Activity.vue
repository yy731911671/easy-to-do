<template>
  <section class="activity">
    <div class="activity-container">
      <van-button
        class="activity-add"
        icon="plus"
        type="primary"
        size="small"
        @click="handleCreate()"
      />
      <div class="data-list" v-for="item in activityList">
        <div class="activity-data">
          <div class="activity-content">
            <div class="activity-date">Date: {{ item.date }}</div>
            <div class="activity-name">
              Activity Name: {{ item.activityName }}
            </div>
            <div class="activity-location">Location: {{ item.location }}</div>
            <div class="activity-content">Content: {{ item.content }}</div>
          </div>
          <div class="activity-operate">
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
                v-model="formField.activityName"
                name="activityName"
                label="Activity Name"
                placeholder="activity name"
              />
              <van-field
                v-model="formField.location"
                name="location"
                label="Location"
                placeholder="location"
              />
              <van-field
                v-model="formField.content"
                name="content"
                label="Content"
                placeholder="content"
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
import {
  addActivity,
  updateActivity,
  getActivity,
  deleteActivity,
} from "@/api/index";
Vue.use(Button);
Vue.use(Overlay);
Vue.use(Form);
Vue.use(Field);
Vue.use(Notify);
export default {
  name: "Activity",
  data() {
    return {
      show: false,
      activityList: [],
      formField: {
        date: "",
        activityName: "",
        location: "",
        content: "",
      },
      submitType: 0, //1: create 2: update
      userId: "",
      id: "",
    };
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = userInfo.id;
    this.getList();
  },
  methods: {
    async getList() {
      const response = await getActivity({
        userId: this.userId,
      });
      if (response.code === 0) {
        this.activityList = response.data;
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
      this.formField.activityName = item.activityName;
      this.formField.location = item.location;
      this.formField.content = item.content;
      this.id = item.id;
      this.submitType = 2;
      this.show = true;
    },
    async handleDelete(id) {
      const response = await deleteActivity({
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
        console.log('123')
         response = await addActivity({
          ...this.formField,
          userId: this.userId
        });
      } else {
          response = await updateActivity({
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
        activityName: "",
        location: "",
        content: "",
      };
      this.getList();
    },
  },
};
</script>

<style scoped>
.activity-data {
  border: 2px solid #00a7d0;
  border-radius: 5px;
  padding: 5px 5px;
  margin: 5px;
  color: chocolate;
  display: flex;
  justify-content: space-between;
}
.activity-operate {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.activity-add {
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
