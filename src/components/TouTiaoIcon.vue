<template>
  <i :class="['toutiao', `toutiao-${icon}`]"></i>
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
