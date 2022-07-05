<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <TouTiaoIcon icon="shouji"></TouTiaoIcon>
        </template>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <TouTiaoIcon icon="yanzhengma"></TouTiaoIcon>
        </template>

        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            time="5000"
            format="ss s"
          />
          <van-button
            v-else
            @click="sendSmsCode"
            class="send-sms-btn"
            native-type="button"
            size="small"
            type="primary"
            :loading="isDisabled"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import TouTiaoIcon from "@/components/TouTiaoIcon.vue";
import { login, getCode } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: { TouTiaoIcon },
  props: {},
  data() {
    return {
      isDisabled: false,
      isShowCountDown: false,
      user: {
        mobile: "13771731174",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式不正确",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // console.log(values);
      // value自动从表单里面获取的值
      //获取到的值是对象:key >>表单的name值 value >>用户输入的值l/await后面写的是promise
      //只有promise成功了的情况下才会继续执行

      try {
        const res = await login(this.user);
        // console.log(res);
        Toast.success("登录成功");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "登录失败");
      }
    },

    async sendSmsCode() {
      try {
        await this.$refs.form.validate["mobile"];
        // console.log("发送验证码");
      } catch (e) {
        console.log(e);
        return;
      }

      // l/ 2、校验通过
      // l/ 2-1:按钮禁用>发送请求
      // 1/发送成功>>倒计时>>成功的提示1/发送失败>错误的提示
      // //拿到结果>>解除禁用
      //

      try {
        this.isDisabled = true;
        await getCode(this.user.mobile);

        this.isShowCountDown = true;

        this.$toast.success("发送验证码成功");
      } catch (e) {
        // console.log(e);
        this.$toast.fail(e?.response?.data?.message || "获取验证码失败");
        this.isShowCountDown = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
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
}
</style>
