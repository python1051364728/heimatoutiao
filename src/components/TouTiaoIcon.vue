<template>
  <div>
    <i :class="['toutiao', `toutiao-${icon}`]"></i>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
  },
};
// eslint-disable-next-line prettier/prettier
</script>

<style></style>
