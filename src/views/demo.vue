<template>
  <div>
    <h1>demo</h1>
    <hr />
    <h2>{{ count }}</h2>
    <h3>{{ name }}</h3>
    <van-field v-model.number="num"></van-field>

    <van-button @click="count">count++</van-button>
    <van-button @click="changeName">修改name</van-button>
    <van-button @click="count2">点击后添加特定的值</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      num: 0,
    };
  },
  computed: {
    ...mapState(["count", "userInfo"]),
  },
  methods: {
    count() {
      this.$store.commit("changeCount");
    },
    changeName() {
      this.$store.commit("changeName");
    },
    count2() {
      this.$store.commit("changeCount2", this.num);
    },
  },
};
</script>

<style></style>
