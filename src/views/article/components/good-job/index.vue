<template>
  <van-icon
    @click="changeGoodJob"
    :loading="loading"
    :color="value1.attitude === 1 ? 'red' : ''"
    :name="value1.attitude === 1 ? 'good-job' : 'good-job-o'"
  />
</template>

<script>
import { addLike, deleteLike } from "@/api/article";
export default {
  data() {
    return {
      loading: false,
    };
  },
  // model: {
  //   prop: "value",
  //   event: "changeGoodJob",
  // },
  props: {
    value1: {
      type: [Object],
    },
    artId: {
      type: [String, Number],
    },
  },

  created() {},

  methods: {
    async changeGoodJob() {
      try {
        this.loading = true;
        if (this.value1.attitude === 1) {
          // 已点赞,取消点赞
          await deleteLike(this.artId);
          this.$toast.success("取消点赞");
          this.value1.attitude = -1;
          // this.$emit("changeGoodJob", (this.value1 = -1));
        } else if (this.value1.attitude === -1) {
          // 未点赞,去点赞
          await addLike(this.artId);
          this.$toast.success("点赞成功");
          this.value1.attitude = 1;
          // this.$emit("changeGoodJob", (this.value1 = 1));
        }
      } catch (error) {
        console.log(error);
      }
      
      // this.$emit("changeGoodJob", this.value !== 1);
      // this.$toast(this.value === -1 ? "取消点赞" : "点赞成功");
    },
  },
};
</script>

<style scoped lang="less"></style>
