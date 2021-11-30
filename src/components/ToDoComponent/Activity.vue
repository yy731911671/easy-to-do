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
import { Button, Overlay, Form, Field } from "vant";

Vue.use(Button);
Vue.use(Overlay);
Vue.use(Form);
Vue.use(Field);
export default {
  name: "Activity",
  data() {
    return {
      show: false,
      activityList: [
        {
          id: 1,
          date: "2021-11-28",
          activityName: "ping-pang",
          location: "gym",
          content: "play ping pang",
          studentId: 2,
        },
        {
          id: 1,
          date: "2021-11-28",
          activityName: "ping-pang",
          location: "gym",
          content: "play ping pang",
          studentId: 2,
        },
      ],
      formField: {
        date: "",
        activityName: "",
        location: "",
        content: "",
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
      this.formField.activityName = item.activityName;
      this.formField.location = item.location;
      this.formField.content = item.content;
    },
    handleDelete(id) {},
    onSubmit() {
      this.onCancel();
    },
    onCancel() {
      this.show = false;
      this.formField = {
        date: "",
        activityName: "",
        location: "",
        content: "",
      };
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
