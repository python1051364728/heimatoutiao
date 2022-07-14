<template>
  <div>
    <!-- 搜索建议 -->
    <van-cell
      @click="hancleClick(item)"
      v-for="(item, index) in list"
      :key="index"
      icon="search"
    >
      <template #title>
        <div v-html="hightLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      list: [],
    };
  },
  props: {
    searchText: String,
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        // console.log(value);
        this.getSearchSuggestion(value);
      }, 500),
    },
  },
  methods: {
    hightLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      );
    },
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q);
      this.list = res.data.data.options;
      // console.log(res);
      // this.list = res.data.data.options.map((item) => {
      //   const reg = new RegExp(this.searchText, "gi");
      //   return item.replace(
      //     reg,
      //     `<span style="color:red">${this.searchText}</span>`
      //   );
      // });
    },
    hancleClick(value) {
      console.log(value);
      this.$emit("onSearch", value);
    },
  },
};
</script>

<style></style>
