<template>
  <div class="user-profile">
    <van-nav-bar color="white" left-arrow title="个人信息"> </van-nav-bar>
    <van-cell title="头像" center>
      <template #default>
        <van-image class="avatar" round :src="userInfo.photo"></van-image>
      </template>
    </van-cell>

    <van-cell
      @click="nicheng"
      title="昵称"
      :value="userInfo.name"
      is-link
    ></van-cell>
    <van-cell
      @click="gender"
      title="性别"
      :value="userInfo.gender === '1' ? '男' : '女'"
      is-link
    ></van-cell>
    <van-cell
      @click="birthday"
      title="生日"
      :value="userInfo.birthday"
      is-link
    ></van-cell>

    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <updataName v-model="userInfo.name" @close="show = false"></updataName>
    </van-popup>

    <van-popup v-model="show1" position="bottom" :style="{ height: '40%' }">
      <updataGender
        v-model="userInfo.gender"
        @close="show1 = false"
      ></updataGender>
    </van-popup>

    <van-popup v-model="show2" position="bottom" :style="{ height: '40%' }">
      <UpdateBirthday
        @close="show2 = false"
        v-model="user.birthday"
      ></UpdateBirthday>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
// import UpdateBirthday from "./components/updateBirthday.vue";
import updataName from "./components/updataName.vue";
import updataGender from "./components/updataGender.vue";
export default {
  name: "UserProfile",
  components: { updataName, updataGender, UpdateBirthday },
  data() {
    return {
      userInfo: {},
      show: false,
      show1: false,
      show2: false,
      message: "",
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      const res = await getUserProfile();
      console.log(res);
      this.userInfo = res.data.data;
    },
    nicheng() {
      this.show = true;
      this.message = this.userInfo.name;
    },
    gender() {
      this.show1 = true;
    },
    birthday() {
      this.show2 = true;
    },
  },
};
</script>
<style lang="less" scoped>
.van-cell__value {
  .avatar {
    width: 80px;
  }
}
/deep/.van-nav-bar__content {
  .van-nav-bar__title {
    color: white;
  }
  .van-nav-bar__text {
    color: white;
  }
}
</style>
