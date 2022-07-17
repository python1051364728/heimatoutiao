<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
import { updateUserProfile } from "@/api/user";
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
    };
  },
  methods: {
    async onConfirm() {
      const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      await updateUserProfile({
        birthday: currentDate,
      });
      this.$emit("close");
      this.$emit("input", currentDate);
    },
  },
};
</script>

<style></style>
