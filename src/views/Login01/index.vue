<template>
  <div class="login-container">
    <van-nav-bar title="登录" />

    <!-- 手机号输入框 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.shouji"
        name="用户名"
        placeholder="请输入手机号"
        :rules="rules.shouji"
        required
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <tou-tiao-icon icon="shouji"></tou-tiao-icon>
        </template>
      </van-field>

      <!--验证码输入框-->
      <van-field
        v-model="user.yanzhengma"
        name="密码"
        placeholder="请输入验证码"
        :rules="rules.yanzhengma"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <tou-tiao-icon icon="yanzhengma"></tou-tiao-icon>
        </template>
        <template #button>
          <van-button class="send-sms-btn" size="small" type="primary"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import TouTiaoIcon from "@/components/TouTiaoIcon.vue";
export default {
  name: "LoginPage",
  components: { TouTiaoIcon },
  props: {},
  data() {
    return {
      user: {
        shouji: "",
        yanzhengma: "",
      },
      rules: {
        shouji: [
          {
            required: true,
            message: "请输入手机号",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
          },
        ],
        yanzhengma: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
          },
        ],
      },
      // username: "",
      // password: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      
    },
  },
};
</script>
<style scoped lang="less">
/deep/.van-nav-bar__title {
  color: #fff;
}
/deep/.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 160px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
