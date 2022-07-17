<template>
  <div>
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  components: { updateUserProfile },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["女", "男"],
    };
  },
  methods: {
    async onConfirm(...[, index]) {
      console.log(index);
      await updateUserProfile({
        gender: index,
      });
      // console.log(res);
      this.$emit("input", index);
      this.$emit("close");
    },
    onChange() {
      this.$emit("close");
    },
    onChange() {},
  },
};
</script>

<style></style>
