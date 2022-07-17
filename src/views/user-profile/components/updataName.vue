<template>
  <div>
    <van-nav-bar
      color="white"
      title="设置昵称"
      left-text="取消"
      @click-left="$emit('close')"
      right-text="完成"
      @click-right="submit"
    ></van-nav-bar>

    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="15"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  components: { updateUserProfile },
  data() {
    return {
      message: this.value,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async submit() {
      await updateUserProfile({
        name: this.message,
      });
      this.$emit("close");
      this.$emit("input", this.message);
    },
  },
};
</script>

<style></style>
