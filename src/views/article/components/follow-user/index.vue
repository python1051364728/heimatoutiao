<template>
  <div>
    <van-button
      v-if="!isFollowed"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="follow"
      :loading="isFollowLoading"
      >关注</van-button
    >
    <van-button @click="follow" v-else class="follow-btn" round size="small"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { deleteFollow, addFollow } from "@/api/user";
export default {
  model: {
    prop: 'isFollowed',
    event: 'changeFollowed',
  },
  props: {
    autId: {
      type: [String, Number],
      required: true,
    },
    isFollowed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isFollowLoading: false,
    };
  },
  methods: {
    async follow() {
      // 请求数据前开启loading加载转圈
      this.isFollowLoading = true;
      try {
        if (this.isFollowed) {
          // 已关注就取消关注
          await deleteFollow(this.autId);
        } else {
          // 未关注就去关注

          await addFollow(this.autId);
        }

        // this.value = !this.value;
        this.$emit("changeFollowed", !this.isFollowed);
        this.$notify({
          type: "success",
          message: this.value ? "关注成功" : "取消关注",
        });
        // 数据请求完成后关闭loading加载转圈
        this.isFollowLoading = false;
      } catch (e) {
        this.$notify({
          type: "danger",
          message: "操作错误",
        });
        // 数据失败也关闭loading加载转圈
        this.isFollowLoading = false;
      }
    },
  },
};
</script>

<style></style>
