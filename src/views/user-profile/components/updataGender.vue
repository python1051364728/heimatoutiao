<template>
  <div>
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  components: { updateUserProfile },
  props: {
    value: {
      type: [String, Number],
    },
  },
  data() {
    return {
      columns: ["女", "男"],
    };
  },
  methods: {
    async onConfirm(...[, index]) {
      await updateUserProfile({
        gender: index,
      });
      this.$emit("close");
      this.$emit("input", index);
    },
    onChange() {
      this.$emit("close");
    },
    onCancel() {},
  },
};
</script>

<style></style>
